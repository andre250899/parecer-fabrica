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
  precoSugerido: z.string().nullable().optional().default(""),
  observacoes: z.string().nullable().optional().default(""),
});

const SYSTEM = `Você identifica peças de reposição de eletrodomésticos a partir de fotos (etiquetas, embalagens, códigos de barras, adesivos).

Analise a imagem e extraia TUDO que estiver visível:
- codigo: código da peça (ex.: W10820038, A08529801, 326073104), sem espaços.
- codigoBarras: número do código de barras (EAN/GTIN), somente dígitos.
- descricao: descrição textual da peça (ex.: "PLACA DE POTÊNCIA LAVADORA").
- marca: fabricante (Electrolux, Whirlpool, Consul, Brastemp, Bosch, etc.).
- modelosAplicados: lista de modelos citados na etiqueta/embalagem.
- precoSugerido: se aparecer preço, formate como "R$ 000,00".
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
    const url = `https://compraparceiros.electrolux.com.br/${encodeURIComponent(codigo)}?map=ft&_q=${encodeURIComponent(codigo)}`;
    const empty = { descricao: "", precoSugerido: "", modelosAplicados: [] as string[], categoria: "", fonte: url, observacao: "" };

    let html = "";
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml",
          "Accept-Language": "pt-BR,pt;q=0.9",
        },
      });
      if (!res.ok) {
        return { ...empty, observacao: `HTTP ${res.status} ao consultar compraparceiros` };
      }
      html = await res.text();
    } catch (err) {
      return { ...empty, observacao: `Falha de rede: ${(err as Error).message}` };
    }

    // Converte HTML em texto limpo (mantém quebras entre blocos)
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<\/(div|li|ul|p|section|article|h[1-6]|button|span|a|label)>/gi, "\n")
      .replace(/<br\s*\/?>(?=)/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{2,}/g, "\n")
      .trim();

    // Extrai o bloco após "Produtos Aplicados" até o próximo rótulo de filtro
    const filterLabels = [
      "Subcategoria",
      "Categoria",
      "Marca",
      "Departamento",
      "Produtos Aplicados",
      "Faixa de preço",
      "Faixa de Preço",
      "Preço",
      "Ordenar por",
      "Produto encontrado",
      "Produtos encontrados",
    ];
    const extractBlock = (label: string): string => {
      const idx = text.indexOf(label);
      if (idx < 0) return "";
      const rest = text.slice(idx + label.length);
      let end = rest.length;
      for (const l of filterLabels) {
        if (l === label) continue;
        const i = rest.indexOf(l);
        if (i > 0 && i < end) end = i;
      }
      return rest.slice(0, end).trim();
    };

    const modelosBlock = extractBlock("Produtos Aplicados");
    const modelosAplicados = modelosBlock
      .split(/\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 40 && !/^\d+$/.test(s))
      .filter((s, i, arr) => arr.indexOf(s) === i);

    const categoria = extractBlock("Categoria").split(/\n/)[0]?.trim() ?? "";
    const subcategoria = extractBlock("Subcategoria").split(/\n/)[0]?.trim() ?? "";

    // Descrição: primeiro nome de produto listado (ex.: "PLACA POTENCIA ERF2510")
    let descricao = "";
    const refMatch = text.match(/Ref\.?:\s*([A-Z0-9]+)\s*\n?\s*([^\n]{3,80})/i);
    if (refMatch) descricao = refMatch[2].trim();
    if (!descricao) {
      const prodMatch = text.match(/([A-Z0-9][A-Z0-9 \-\/]{5,60})\n\s*Ref\.?:/);
      if (prodMatch) descricao = prodMatch[1].trim();
    }

    // Preço (best-effort)
    let precoSugerido = "";
    const priceMatch = html.match(/R\$\s*([\d\.]+,\d{2})/);
    if (priceMatch) precoSugerido = `R$ ${priceMatch[1]}`;

    return {
      descricao,
      precoSugerido,
      modelosAplicados,
      categoria: [categoria, subcategoria].filter(Boolean).join(" / "),
      fonte: url,
      observacao: modelosAplicados.length ? "" : "Sem 'Produtos Aplicados' publicados para este código.",
    };
  });