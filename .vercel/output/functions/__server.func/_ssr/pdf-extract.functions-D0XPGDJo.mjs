import { n as createServerFn } from "./server-DxW51C_N.mjs";
import { t as createServerRpc } from "./createServerRpc-CKVV6fgY.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { r as defaultWhirlpool } from "./parecer-extras-BH44_VuI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-extract.functions-D0XPGDJo.js
var ExtractInput = objectType({
	filename: stringType(),
	mimeType: stringType().default("application/pdf"),
	base64: stringType()
});
var WhirlpoolSchema = objectType({
	numeroOS: stringType().nullable().optional().default(""),
	tecnico: stringType().nullable().optional().default(""),
	dataAgenda: stringType().nullable().optional().default(""),
	dataChamado: stringType().nullable().optional().default(""),
	periodo: enumType([
		"MANHÃ",
		"TARDE",
		""
	]).optional().default(""),
	tipoAgenda: stringType().nullable().optional().default(""),
	consumidor: stringType().nullable().optional().default(""),
	cep: stringType().nullable().optional().default(""),
	regiao: stringType().nullable().optional().default(""),
	endereco: stringType().nullable().optional().default(""),
	bairro: stringType().nullable().optional().default(""),
	complemento: stringType().nullable().optional().default(""),
	cidade: stringType().nullable().optional().default(""),
	uf: stringType().nullable().optional().default(""),
	cnpjCpf: stringType().nullable().optional().default(""),
	enderecoEletronico: stringType().nullable().optional().default(""),
	foneResidencia: stringType().nullable().optional().default(""),
	foneComercial: stringType().nullable().optional().default(""),
	foneOutros: stringType().nullable().optional().default(""),
	localizacao: stringType().nullable().optional().default(""),
	produto: stringType().nullable().optional().default(""),
	marca: stringType().nullable().optional().default(""),
	produtoConsumidor: stringType().nullable().optional().default(""),
	linha: stringType().nullable().optional().default(""),
	serie: stringType().nullable().optional().default(""),
	nomeComercial: stringType().nullable().optional().default(""),
	tempoUso: stringType().nullable().optional().default(""),
	tipoOS: stringType().nullable().optional().default(""),
	nrNotaFiscal: stringType().nullable().optional().default(""),
	dataCompra: stringType().nullable().optional().default(""),
	cor: stringType().nullable().optional().default(""),
	voltagem: stringType().nullable().optional().default(""),
	capacidade: stringType().nullable().optional().default(""),
	defeitoReclamado: stringType().nullable().optional().default(""),
	defeitoConstatado: stringType().nullable().optional().default(""),
	reclamacaoAtendimento: stringType().nullable().optional().default(""),
	laudoTecnico: stringType().nullable().optional().default(""),
	pecas: arrayType(objectType({
		quantidade: stringType().nullable().optional().default(""),
		codigo: stringType().nullable().optional().default(""),
		descricao: stringType().nullable().optional().default(""),
		fcta: stringType().nullable().optional().default(""),
		ocor: stringType().nullable().optional().default(""),
		valor: stringType().nullable().optional().default("")
	})).nullable().optional().default([]),
	observacao: stringType().nullable().optional().default(""),
	totalPecas: stringType().nullable().optional().default(""),
	maoDeObra: stringType().nullable().optional().default(""),
	totalOrcamento: stringType().nullable().optional().default(""),
	validadeOrcamento: stringType().nullable().optional().default(""),
	parcelas: stringType().nullable().optional().default(""),
	vencimento: stringType().nullable().optional().default(""),
	valorOrcamento: stringType().nullable().optional().default(""),
	condicaoPagamento: stringType().nullable().optional().default(""),
	dataAprovacao: stringType().nullable().optional().default(""),
	garantiaServicoMeses: stringType().nullable().optional().default(""),
	garantiaPecasMeses: stringType().nullable().optional().default(""),
	dataConclusao: stringType().nullable().optional().default(""),
	responsavel: stringType().nullable().optional().default("")
});
function emptyWhirlpoolPeca() {
	return {
		quantidade: "",
		codigo: "",
		descricao: "",
		fcta: "",
		ocor: "",
		valor: ""
	};
}
function mergeWithDefaults(parsed) {
	const clean = (v) => v == null ? "" : v;
	const cleanPeca = (p) => ({
		quantidade: clean(p.quantidade),
		codigo: clean(p.codigo),
		descricao: clean(p.descricao),
		fcta: clean(p.fcta),
		ocor: clean(p.ocor),
		valor: clean(p.valor)
	});
	const base = {
		...defaultWhirlpool,
		numeroOS: clean(parsed.numeroOS),
		tecnico: clean(parsed.tecnico),
		dataAgenda: clean(parsed.dataAgenda),
		dataChamado: clean(parsed.dataChamado),
		periodo: parsed.periodo || "",
		tipoAgenda: clean(parsed.tipoAgenda),
		consumidor: clean(parsed.consumidor),
		cep: clean(parsed.cep),
		regiao: clean(parsed.regiao),
		endereco: clean(parsed.endereco),
		bairro: clean(parsed.bairro),
		complemento: clean(parsed.complemento),
		cidade: clean(parsed.cidade),
		uf: clean(parsed.uf),
		cnpjCpf: clean(parsed.cnpjCpf),
		enderecoEletronico: clean(parsed.enderecoEletronico),
		foneResidencia: clean(parsed.foneResidencia),
		foneComercial: clean(parsed.foneComercial),
		foneOutros: clean(parsed.foneOutros),
		localizacao: clean(parsed.localizacao),
		produto: clean(parsed.produto),
		marca: clean(parsed.marca),
		produtoConsumidor: clean(parsed.produtoConsumidor),
		linha: clean(parsed.linha),
		serie: clean(parsed.serie),
		nomeComercial: clean(parsed.nomeComercial),
		tempoUso: clean(parsed.tempoUso),
		tipoOS: clean(parsed.tipoOS),
		nrNotaFiscal: clean(parsed.nrNotaFiscal),
		dataCompra: clean(parsed.dataCompra),
		cor: clean(parsed.cor),
		voltagem: clean(parsed.voltagem),
		capacidade: clean(parsed.capacidade),
		defeitoReclamado: clean(parsed.defeitoReclamado),
		defeitoConstatado: clean(parsed.defeitoConstatado),
		reclamacaoAtendimento: clean(parsed.reclamacaoAtendimento),
		laudoTecnico: clean(parsed.laudoTecnico),
		pecas: (parsed.pecas ?? []).map(cleanPeca),
		observacao: clean(parsed.observacao),
		totalPecas: clean(parsed.totalPecas),
		maoDeObra: clean(parsed.maoDeObra),
		totalOrcamento: clean(parsed.totalOrcamento),
		validadeOrcamento: clean(parsed.validadeOrcamento),
		parcelas: clean(parsed.parcelas),
		vencimento: clean(parsed.vencimento),
		valorOrcamento: clean(parsed.valorOrcamento),
		condicaoPagamento: clean(parsed.condicaoPagamento),
		dataAprovacao: clean(parsed.dataAprovacao),
		garantiaServicoMeses: clean(parsed.garantiaServicoMeses),
		garantiaPecasMeses: clean(parsed.garantiaPecasMeses),
		dataConclusao: clean(parsed.dataConclusao),
		responsavel: clean(parsed.responsavel)
	};
	return {
		...base,
		pecas: base.pecas.length ? base.pecas : [emptyWhirlpoolPeca()]
	};
}
var SYSTEM_PROMPT = `Você é um extrator de dados de Ordens de Serviço (OS) da marca Whirlpool/Consul.

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
var extrairDadosWhirlpool_createServerFn_handler = createServerRpc({
	id: "626708997dd39ec4506ae630c65907c8906e3da02e1c39bdacc503204e991533",
	name: "extrairDadosWhirlpool",
	filename: "src/lib/pdf-extract.functions.ts"
}, (opts) => extrairDadosWhirlpool.__executeServer(opts));
var extrairDadosWhirlpool = createServerFn({ method: "POST" }).inputValidator((input) => ExtractInput.parse(input)).handler(extrairDadosWhirlpool_createServerFn_handler, async ({ data }) => {
	const key = process.env.LOVABLE_API_KEY;
	if (!key) throw new Error("Missing LOVABLE_API_KEY");
	const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Lovable-API-Key": key
		},
		body: JSON.stringify({
			model: "openai/gpt-5.5",
			messages: [{
				role: "system",
				content: SYSTEM_PROMPT
			}, {
				role: "user",
				content: [{
					type: "file",
					file: {
						filename: data.filename,
						file_data: `data:${data.mimeType};base64,${data.base64}`
					}
				}]
			}],
			response_format: { type: "json_object" }
		})
	});
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`AI Gateway error ${response.status}: ${body}`);
	}
	const text = (await response.json()).choices?.[0]?.message?.content ?? "";
	try {
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		const json = jsonMatch ? jsonMatch[0] : text;
		return mergeWithDefaults(WhirlpoolSchema.parse(JSON.parse(json)));
	} catch (err) {
		console.error("Falha ao parsear resposta da IA:", text, err);
		throw new Error("Não foi possível extrair os dados do PDF. Tente enviar uma imagem mais nítida ou preencher manualmente.");
	}
});
//#endregion
export { extrairDadosWhirlpool_createServerFn_handler };
