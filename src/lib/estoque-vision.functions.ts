import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  mimeType: z.string().default("image/jpeg"),
  base64: z.string(),
});

const Extracted = z.object({
  codigo: z.string().nullable().optional().default(""),
  codigoBarras: z.string().nullable().optional().default(""),
  descricao: z.string().nullable().optional().default(""),
  marca: z.string().nullable().optional().default(""),
  modelosAplicados: z.array(z.string()).nullable().optional().default([]),
  observacoes: z.string().nullable().optional().default(""),
});

const SYSTEM = `Você identifica peças de reposição de eletrodomésticos a partir de fotos (etiquetas, embalagens, códigos de barras, adesivos).

Analise a imagem e extraia TUDO que estiver visível:
- codigo: código da peça (ex.: W10820038, A08529801, 326073104), sem espaços.
- codigoBarras: número do código de barras (EAN/GTIN), somente dígitos.
- descricao: descrição textual da peça (ex.: "PLACA DE POTÊNCIA LAVADORA").
- marca: fabricante (Electrolux, Whirlpool, Consul, Brastemp, Bosch, etc.).
- modelosAplicados: lista de modelos citados na etiqueta/embalagem.
- observacoes: qualquer outro dado útil (voltagem, cor, série).

Se um campo não estiver visível, retorne string vazia "" (ou array vazio []). NUNCA use null.

Retorne APENAS um objeto JSON, sem markdown.`;

export const identificarPecaFoto = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY ausente");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: [
              { type: "text", text: "Identifique a peça na foto e retorne o JSON solicitado." },
              {
                type: "image_url",
                image_url: { url: `data:${data.mimeType};base64,${data.base64}` },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`AI Gateway ${response.status}: ${body}`);
    }

    const result = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = result.choices?.[0]?.message?.content ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    const parsed = Extracted.parse(JSON.parse(match ? match[0] : text));
    const clean = (v: string | null | undefined) => (v == null ? "" : v.trim());
    return {
      codigo: clean(parsed.codigo).toUpperCase(),
      codigoBarras: clean(parsed.codigoBarras),
      descricao: clean(parsed.descricao),
      marca: clean(parsed.marca),
      modelosAplicados: (parsed.modelosAplicados ?? []).map((m) => clean(m)).filter(Boolean),
      precoSugerido: clean(parsed.precoSugerido),
      observacoes: clean(parsed.observacoes),
    };
  });

const EnrichInput = z.object({
  codigo: z.string().min(1),
  descricao: z.string().optional().default(""),
});

export const enriquecerPecaEletrolux = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EnrichInput.parse(input))
  .handler(async ({ data }) => {
    // Consulta pública ao site de parceiros da Electrolux.
    // A página de busca (?map=ft&_q=CODIGO) é acessível sem login e
    // expõe os "Produtos Aplicados" desta peça no bloco de filtros.
    const codigo = data.codigo.trim();
    if (!codigo) {
      return { descricao: "", precoSugerido: "", modelosAplicados: [], categoria: "", fonte: "", observacao: "" };
    }
    const pageUrl = `https://compraparceiros.electrolux.com.br/${encodeURIComponent(codigo)}?map=ft&_q=${encodeURIComponent(codigo)}`;
    const searchUrl = `https://compraparceiros.electrolux.com.br/${encodeURIComponent(codigo)}?_q=${encodeURIComponent(codigo)}&map=ft`;
    const apiUrl = `https://compraparceiros.electrolux.com.br/api/catalog_system/pub/products/search/?ft=${encodeURIComponent(codigo)}`;
    const empty = { descricao: "", precoSugerido: "", modelosAplicados: [] as string[], categoria: "", fonte: pageUrl, observacao: "" };

    let list: Array<Record<string, unknown>> = [];
    try {
      const res = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 VoxWeb/1.0",
          "Accept": "application/json",
          "Accept-Language": "pt-BR,pt;q=0.9",
        },
      });
      if (!res.ok) return { ...empty, observacao: `HTTP ${res.status} ao consultar Electrolux` };
      list = (await res.json()) as Array<Record<string, unknown>>;
    } catch (err) {
      return { ...empty, observacao: `Falha de rede: ${(err as Error).message}` };
    }
    if (!Array.isArray(list) || list.length === 0) {
      return { ...empty, observacao: "Código não encontrado no catálogo público da Electrolux." };
    }

    const p = list[0];
    const descricao = String(p.productName ?? "");
    // Link canônico do produto (ex.: .../placa-de-interface-41046753/p)
    const produtoUrl = String(p.link ?? "") ||
      (p.linkText ? `https://compraparceiros.electrolux.com.br/${String(p.linkText)}/p` : searchUrl);
    const categorias = Array.isArray(p.categories) ? (p.categories as string[]) : [];
    // Ex.: "/Peças/Linha Branca/Placas de Potência/" → "Linha Branca / Placas de Potência"
    const categoria = categorias
      .map((c) => c.replace(/^\/|\/$/g, "").split("/").slice(1).join(" / "))
      .find((c) => c.length > 0) ?? "";

    // Especificações do produto ficam em campos com o próprio nome da spec
    const specVal = (name: string): string[] => {
      const v = (p as Record<string, unknown>)[name];
      return Array.isArray(v) ? (v as unknown[]).map((x) => String(x)) : [];
    };

    // Produtos Aplicados (lista de códigos de produto final)
    const produtosAplicados = specVal("Produtos Aplicados");

    // Modelos Aplicados vem como JSON string: { models:[{ code, products:[...] }] }
    const modelosSpec = specVal("Modelos Aplicados");
    const modelosDetalhados: string[] = [];
    for (const raw of modelosSpec) {
      try {
        const parsed = JSON.parse(raw) as { models?: Array<{ code?: string }> };
        for (const m of parsed.models ?? []) {
          if (m.code) modelosDetalhados.push(String(m.code));
        }
      } catch {
        // texto solto — ignora
      }
    }

    const modelosAplicados = Array.from(
      new Set([...produtosAplicados, ...modelosDetalhados].map((s) => s.trim()).filter(Boolean)),
    );

    // Preço sugerido: preferir spec "Preço Sugerido"; senão usar melhor preço do SKU
    let precoSugerido = "";
    const precoSpec = specVal("Preço Sugerido")[0];
    if (precoSpec) {
      const num = Number(String(precoSpec).replace(/\./g, "").replace(",", "."));
      if (isFinite(num) && num > 0) {
        precoSugerido = num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      } else {
        precoSugerido = `R$ ${precoSpec}`;
      }
    } else {
      const items = (p.items as Array<Record<string, unknown>> | undefined) ?? [];
      const sellers = items[0]?.sellers as Array<Record<string, unknown>> | undefined;
      const offer = sellers?.[0]?.commertialOffer as Record<string, unknown> | undefined;
      const price = offer && (offer.Price as number | undefined);
      if (typeof price === "number" && price > 0) {
        precoSugerido = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      }
    }

    return {
      descricao,
      precoSugerido,
      modelosAplicados,
      categoria,
      fonte: produtoUrl,
      observacao: modelosAplicados.length ? "" : "Sem 'Produtos Aplicados' cadastrados para este código.",
    };
  });