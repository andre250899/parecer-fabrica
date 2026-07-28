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
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY ausente");

    // O site compraparceiros.electrolux.com.br exige login de parceiro.
    // Tentamos uma busca pública (Google) usando a IA como sintetizador do
    // resultado. É best-effort — retorna vazio quando não há sinal público.
    const prompt = `Preciso de informações sobre a peça de reposição Electrolux (ou compatível) com o código "${data.codigo}"${data.descricao ? ` (descrição: ${data.descricao})` : ""}.

Considere fontes públicas (marketplaces, catálogos, revenda autorizada, compraparceiros.electrolux.com.br quando indexado).

Retorne APENAS um JSON com o formato:
{
  "descricao": "descrição oficial da peça",
  "precoSugerido": "R$ 000,00 (preço médio de mercado)",
  "modelosAplicados": ["modelo1", "modelo2"],
  "categoria": "linha branca / refrigeração / lavanderia / etc.",
  "fonte": "url ou fonte consultada",
  "observacao": "texto curto"
}

Se não tiver certeza, deixe strings vazias e arrays vazios. NUNCA invente preço.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
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
    const text = result.choices?.[0]?.message?.content ?? "{}";
    const match = text.match(/\{[\s\S]*\}/);
    try {
      const raw = JSON.parse(match ? match[0] : text) as Record<string, unknown>;
      return {
        descricao: String(raw.descricao ?? ""),
        precoSugerido: String(raw.precoSugerido ?? ""),
        modelosAplicados: Array.isArray(raw.modelosAplicados)
          ? (raw.modelosAplicados as unknown[]).map((m) => String(m))
          : [],
        categoria: String(raw.categoria ?? ""),
        fonte: String(raw.fonte ?? ""),
        observacao: String(raw.observacao ?? ""),
      };
    } catch {
      return { descricao: "", precoSugerido: "", modelosAplicados: [], categoria: "", fonte: "", observacao: "" };
    }
  });