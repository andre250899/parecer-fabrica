import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { defaultWhirlpool, type WhirlpoolData } from "@/lib/parecer-extras";

const ExtractInput = z.object({
  filename: z.string(),
  mimeType: z.string().default("application/pdf"),
  base64: z.string(),
});

const WhirlpoolSchema = z.object({
  numeroOS: z.string().optional().default(""),
  tecnico: z.string().optional().default(""),
  dataAgenda: z.string().optional().default(""),
  dataChamado: z.string().optional().default(""),
  periodo: z.enum(["MANHÃ", "TARDE", ""]).optional().default(""),
  tipoAgenda: z.string().optional().default(""),
  consumidor: z.string().optional().default(""),
  cep: z.string().optional().default(""),
  regiao: z.string().optional().default(""),
  endereco: z.string().optional().default(""),
  bairro: z.string().optional().default(""),
  complemento: z.string().optional().default(""),
  cidade: z.string().optional().default(""),
  uf: z.string().optional().default(""),
  cnpjCpf: z.string().optional().default(""),
  enderecoEletronico: z.string().optional().default(""),
  foneResidencia: z.string().optional().default(""),
  foneComercial: z.string().optional().default(""),
  foneOutros: z.string().optional().default(""),
  localizacao: z.string().optional().default(""),
  produto: z.string().optional().default(""),
  marca: z.string().optional().default(""),
  produtoConsumidor: z.string().optional().default(""),
  linha: z.string().optional().default(""),
  serie: z.string().optional().default(""),
  nomeComercial: z.string().optional().default(""),
  tempoUso: z.string().optional().default(""),
  tipoOS: z.string().optional().default(""),
  nrNotaFiscal: z.string().optional().default(""),
  dataCompra: z.string().optional().default(""),
  cor: z.string().optional().default(""),
  voltagem: z.string().optional().default(""),
  capacidade: z.string().optional().default(""),
  defeitoReclamado: z.string().optional().default(""),
  defeitoConstatado: z.string().optional().default(""),
  reclamacaoAtendimento: z.string().optional().default(""),
  laudoTecnico: z.string().optional().default(""),
  pecas: z
    .array(
      z.object({
        quantidade: z.string().optional().default(""),
        codigo: z.string().optional().default(""),
        descricao: z.string().optional().default(""),
        fcta: z.string().optional().default(""),
        ocor: z.string().optional().default(""),
        valor: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  observacao: z.string().optional().default(""),
  totalPecas: z.string().optional().default(""),
  maoDeObra: z.string().optional().default(""),
  totalOrcamento: z.string().optional().default(""),
  validadeOrcamento: z.string().optional().default(""),
  parcelas: z.string().optional().default(""),
  vencimento: z.string().optional().default(""),
  valorOrcamento: z.string().optional().default(""),
  condicaoPagamento: z.string().optional().default(""),
  dataAprovacao: z.string().optional().default(""),
  garantiaServicoMeses: z.string().optional().default(""),
  garantiaPecasMeses: z.string().optional().default(""),
  dataConclusao: z.string().optional().default(""),
  responsavel: z.string().optional().default(""),
});

function emptyWhirlpoolPeca() {
  return { quantidade: "", codigo: "", descricao: "", fcta: "", ocor: "", valor: "" };
}

function mergeWithDefaults(parsed: z.infer<typeof WhirlpoolSchema>): WhirlpoolData {
  return {
    ...defaultWhirlpool,
    ...parsed,
    pecas: parsed.pecas.length ? parsed.pecas : [emptyWhirlpoolPeca()],
  };
}

const SYSTEM_PROMPT = `Você é um extrator de dados de Ordens de Serviço (OS) da marca Whirlpool/Consul.

Extraia TODOS os campos visíveis no PDF e retorne um JSON estruturado seguindo exatamente o schema fornecido.

Regras importantes:
- Preserve textos, acentos e formatações originais quando possível.
- Para "periodo", retorne apenas "MANHÃ" ou "TARDE" (ou vazio se não constar).
- Para datas, mantenha o formato DD/MM/AAAA ou DD.MM.AAAA conforme apareça no documento.
- Para CNPJ/CPF, mantenha a pontuação original.
- Para telefones, mantenha DDD e traços.
- A tabela de peças deve ser extraída linha a linha; se não houver peças, retorne array vazio.
- O campo "reclamacaoAtendimento" é o texto longo da seção RECLAMAÇÃO ATENDIMENTO.
- O campo "laudoTecnico" é o conteúdo da seção LAUDO TÉCNICO.
- O campo "numeroOS" é o "NÚMERO DA OS" (não confunda com número da nota fiscal).
- Campos que não existirem no PDF devem vir como string vazia.

Retorne apenas o objeto JSON, sem explicações.`;

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
