import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { defaultWhirlpool, type WhirlpoolData } from "@/lib/parecer-extras";

const ExtractInput = z.object({
  filename: z.string(),
  mimeType: z.string().default("application/pdf"),
  base64: z.string(),
});

const WhirlpoolSchema = z.object({
  numeroOS: z.string().nullable().optional().default(""),
  tecnico: z.string().nullable().optional().default(""),
  dataAgenda: z.string().nullable().optional().default(""),
  dataChamado: z.string().nullable().optional().default(""),
  periodo: z.enum(["MANHÃ", "TARDE", ""]).optional().default(""),
  tipoAgenda: z.string().nullable().optional().default(""),
  consumidor: z.string().nullable().optional().default(""),
  cep: z.string().nullable().optional().default(""),
  regiao: z.string().nullable().optional().default(""),
  endereco: z.string().nullable().optional().default(""),
  bairro: z.string().nullable().optional().default(""),
  complemento: z.string().nullable().optional().default(""),
  cidade: z.string().nullable().optional().default(""),
  uf: z.string().nullable().optional().default(""),
  cnpjCpf: z.string().nullable().optional().default(""),
  enderecoEletronico: z.string().nullable().optional().default(""),
  foneResidencia: z.string().nullable().optional().default(""),
  foneComercial: z.string().nullable().optional().default(""),
  foneOutros: z.string().nullable().optional().default(""),
  localizacao: z.string().nullable().optional().default(""),
  produto: z.string().nullable().optional().default(""),
  marca: z.string().nullable().optional().default(""),
  produtoConsumidor: z.string().nullable().optional().default(""),
  linha: z.string().nullable().optional().default(""),
  serie: z.string().nullable().optional().default(""),
  nomeComercial: z.string().nullable().optional().default(""),
  tempoUso: z.string().nullable().optional().default(""),
  tipoOS: z.string().nullable().optional().default(""),
  nrNotaFiscal: z.string().nullable().optional().default(""),
  dataCompra: z.string().nullable().optional().default(""),
  cor: z.string().nullable().optional().default(""),
  voltagem: z.string().nullable().optional().default(""),
  capacidade: z.string().nullable().optional().default(""),
  defeitoReclamado: z.string().nullable().optional().default(""),
  defeitoConstatado: z.string().nullable().optional().default(""),
  reclamacaoAtendimento: z.string().nullable().optional().default(""),
  laudoTecnico: z.string().nullable().optional().default(""),
  pecas: z
    .array(
      z.object({
        quantidade: z.string().nullable().optional().default(""),
        codigo: z.string().nullable().optional().default(""),
        descricao: z.string().nullable().optional().default(""),
        fcta: z.string().nullable().optional().default(""),
        ocor: z.string().nullable().optional().default(""),
        valor: z.string().nullable().optional().default(""),
      }),
    )
    .nullable()
    .optional()
    .default([]),
  observacao: z.string().nullable().optional().default(""),
  totalPecas: z.string().nullable().optional().default(""),
  maoDeObra: z.string().nullable().optional().default(""),
  totalOrcamento: z.string().nullable().optional().default(""),
  validadeOrcamento: z.string().nullable().optional().default(""),
  parcelas: z.string().nullable().optional().default(""),
  vencimento: z.string().nullable().optional().default(""),
  valorOrcamento: z.string().nullable().optional().default(""),
  condicaoPagamento: z.string().nullable().optional().default(""),
  dataAprovacao: z.string().nullable().optional().default(""),
  garantiaServicoMeses: z.string().nullable().optional().default(""),
  garantiaPecasMeses: z.string().nullable().optional().default(""),
  dataConclusao: z.string().nullable().optional().default(""),
  responsavel: z.string().nullable().optional().default(""),
});

function emptyWhirlpoolPeca() {
  return { quantidade: "", codigo: "", descricao: "", fcta: "", ocor: "", valor: "" };
}

function mergeWithDefaults(parsed: z.infer<typeof WhirlpoolSchema>): WhirlpoolData {
  const cleanPeca = (p: z.infer<typeof WhirlpoolSchema>["pecas"][number]) => ({
    quantidade: p.quantidade ?? "",
    codigo: p.codigo ?? "",
    descricao: p.descricao ?? "",
    fcta: p.fcta ?? "",
    ocor: p.ocor ?? "",
    valor: p.valor ?? "",
  });
  return {
    ...defaultWhirlpool,
    ...parsed,
    pecas: parsed.pecas?.length ? parsed.pecas.map(cleanPeca) : [emptyWhirlpoolPeca()],
  };
}

const SYSTEM_PROMPT = `Você é um extrator de dados de Ordens de Serviço (OS) da marca Whirlpool/Consul.

Extraia TODOS os campos visíveis no PDF e retorne um único objeto JSON. Siga as regras abaixo rigorosamente:

1. NUNCA retorne null. Se um campo não existir no PDF, use string vazia "".
2. Preserve textos, acentos e formatações originais quando possível.
3. Para "periodo", retorne apenas "MANHÃ" ou "TARDE" (ou vazio se não constar).
4. Para datas, mantenha o formato original (DD/MM/AAAA, DD.MM.AAAA ou similar).
5. Para CNPJ/CPF, mantenha a pontuação original.
6. Para telefones, mantenha DDD e traços.
7. A tabela de peças deve ser extraída linha a linha; se não houver peças, retorne array vazio [] e nunca null.
8. "numeroOS" é o campo "NÚMERO DA OS".
9. "defeitoReclamado" é o defeito informado pelo consumidor.
10. "defeitoConstatado" é o defeito encontrado pelo técnico.
11. "reclamacaoAtendimento" é o texto longo da seção RECLAMAÇÃO ATENDIMENTO.
12. "laudoTecnico" é o conteúdo da seção LAUDO TÉCNICO.

Campos esperados no JSON:
numeroOS, tecnico, dataAgenda, dataChamado, periodo, tipoAgenda, consumidor, cep, regiao, endereco, bairro, complemento, cidade, uf, cnpjCpf, enderecoEletronico, foneResidencia, foneComercial, foneOutros, localizacao, produto, marca, produtoConsumidor, linha, serie, nomeComercial, tempoUso, tipoOS, nrNotaFiscal, dataCompra, cor, voltagem, capacidade, defeitoReclamado, defeitoConstatado, reclamacaoAtendimento, laudoTecnico, pecas (array de {quantidade, codigo, descricao, fcta, ocor, valor}), observacao, totalPecas, maoDeObra, totalOrcamento, validadeOrcamento, parcelas, vencimento, valorOrcamento, condicaoPagamento, dataAprovacao, garantiaServicoMeses, garantiaPecasMeses, dataConclusao, responsavel.

Retorne APENAS o objeto JSON, sem explicações, sem markdown, sem blocos de código.`;

export const extrairDadosWhirlpool = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ExtractInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "file",
                file: {
                  filename: data.filename,
                  file_data: `data:${data.mimeType};base64,${data.base64}`,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`AI Gateway error ${response.status}: ${body}`);
    }

    const result = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const text = result.choices?.[0]?.message?.content ?? "";

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const json = jsonMatch ? jsonMatch[0] : text;
      const parsed = WhirlpoolSchema.parse(JSON.parse(json));
      return mergeWithDefaults(parsed);
    } catch (err) {
      console.error("Falha ao parsear resposta da IA:", text, err);
      throw new Error("Não foi possível extrair os dados do PDF. Tente enviar uma imagem mais nítida ou preencher manualmente.");
    }
  });
