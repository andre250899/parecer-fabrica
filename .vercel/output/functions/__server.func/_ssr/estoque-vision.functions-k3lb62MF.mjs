import { n as createServerFn } from "./server-BWhwvx9r.mjs";
import { t as createServerRpc } from "./createServerRpc-CAIdIDKN.mjs";
import { i as stringType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estoque-vision.functions-k3lb62MF.js
var Input = objectType({
	mimeType: stringType().default("image/jpeg"),
	base64: stringType()
});
var Extracted = objectType({
	codigo: stringType().nullable().optional().default(""),
	codigoBarras: stringType().nullable().optional().default(""),
	descricao: stringType().nullable().optional().default(""),
	marca: stringType().nullable().optional().default(""),
	modelosAplicados: arrayType(stringType()).nullable().optional().default([]),
	observacoes: stringType().nullable().optional().default("")
});
var SYSTEM = `Você identifica peças de reposição de eletrodomésticos a partir de fotos (etiquetas, embalagens, códigos de barras, adesivos).

Analise a imagem e extraia TUDO que estiver visível:
- codigo: código da peça (ex.: W10820038, A08529801, 326073104), sem espaços.
- codigoBarras: número do código de barras (EAN/GTIN), somente dígitos.
- descricao: descrição textual da peça (ex.: "PLACA DE POTÊNCIA LAVADORA").
- marca: fabricante (Electrolux, Whirlpool, Consul, Brastemp, Bosch, etc.).
- modelosAplicados: lista de modelos citados na etiqueta/embalagem.
- observacoes: qualquer outro dado útil (voltagem, cor, série).

Se um campo não estiver visível, retorne string vazia "" (ou array vazio []). NUNCA use null.

Retorne APENAS um objeto JSON, sem markdown.`;
var identificarPecaFoto_createServerFn_handler = createServerRpc({
	id: "e64168893f005e5031b250a47ffee0051c3fad4cb259180c3e6b4be700ce7a85",
	name: "identificarPecaFoto",
	filename: "src/lib/estoque-vision.functions.ts"
}, (opts) => identificarPecaFoto.__executeServer(opts));
var identificarPecaFoto = createServerFn({ method: "POST" }).inputValidator((input) => Input.parse(input)).handler(identificarPecaFoto_createServerFn_handler, async ({ data }) => {
	const key = process.env.LOVABLE_API_KEY;
	if (!key) throw new Error("LOVABLE_API_KEY ausente");
	const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Lovable-API-Key": key
		},
		body: JSON.stringify({
			model: "google/gemini-2.5-flash",
			messages: [{
				role: "system",
				content: SYSTEM
			}, {
				role: "user",
				content: [{
					type: "text",
					text: "Identifique a peça na foto e retorne o JSON solicitado."
				}, {
					type: "image_url",
					image_url: { url: `data:${data.mimeType};base64,${data.base64}` }
				}]
			}],
			response_format: { type: "json_object" }
		})
	});
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`AI Gateway ${response.status}: ${body}`);
	}
	const text = (await response.json()).choices?.[0]?.message?.content ?? "";
	const match = text.match(/\{[\s\S]*\}/);
	const parsed = Extracted.parse(JSON.parse(match ? match[0] : text));
	const clean = (v) => v == null ? "" : v.trim();
	return {
		codigo: clean(parsed.codigo).toUpperCase(),
		codigoBarras: clean(parsed.codigoBarras),
		descricao: clean(parsed.descricao),
		marca: clean(parsed.marca),
		modelosAplicados: (parsed.modelosAplicados ?? []).map((m) => clean(m)).filter(Boolean),
		observacoes: clean(parsed.observacoes)
	};
});
var EnrichInput = objectType({
	codigo: stringType().min(1),
	descricao: stringType().optional().default("")
});
var enriquecerPecaEletrolux_createServerFn_handler = createServerRpc({
	id: "3ee9ced25757c75e2ce1cfdb88162dac84e9e93162ad5de4792ad084e8bea1b9",
	name: "enriquecerPecaEletrolux",
	filename: "src/lib/estoque-vision.functions.ts"
}, (opts) => enriquecerPecaEletrolux.__executeServer(opts));
var enriquecerPecaEletrolux = createServerFn({ method: "POST" }).inputValidator((input) => EnrichInput.parse(input)).handler(enriquecerPecaEletrolux_createServerFn_handler, async ({ data }) => {
	const codigo = data.codigo.trim();
	if (!codigo) return {
		descricao: "",
		modelosAplicados: [],
		categoria: "",
		fonte: "",
		observacao: ""
	};
	const pageUrl = `https://compraparceiros.electrolux.com.br/${encodeURIComponent(codigo)}?map=ft&_q=${encodeURIComponent(codigo)}`;
	const searchUrl = `https://compraparceiros.electrolux.com.br/${encodeURIComponent(codigo)}?_q=${encodeURIComponent(codigo)}&map=ft`;
	const apiUrl = `https://compraparceiros.electrolux.com.br/api/catalog_system/pub/products/search/?ft=${encodeURIComponent(codigo)}`;
	const empty = {
		descricao: "",
		modelosAplicados: [],
		categoria: "",
		fonte: pageUrl,
		observacao: ""
	};
	let list = [];
	try {
		const res = await fetch(apiUrl, { headers: {
			"User-Agent": "Mozilla/5.0 VoxWeb/1.0",
			"Accept": "application/json",
			"Accept-Language": "pt-BR,pt;q=0.9"
		} });
		if (!res.ok) return {
			...empty,
			observacao: `HTTP ${res.status} ao consultar Electrolux`
		};
		list = await res.json();
	} catch (err) {
		return {
			...empty,
			observacao: `Falha de rede: ${err.message}`
		};
	}
	if (!Array.isArray(list) || list.length === 0) return {
		...empty,
		observacao: "Código não encontrado no catálogo público da Electrolux."
	};
	const p = list[0];
	const descricao = String(p.productName ?? "");
	const linkText = String(p.linkText ?? "").trim();
	const rawLink = String(p.link ?? "").trim();
	const host = "https://compraparceiros.electrolux.com.br";
	let produtoUrl = "";
	if (linkText) produtoUrl = `${host}/${linkText}/p`;
	else if (rawLink) {
		if (/^https?:\/\//i.test(rawLink)) produtoUrl = rawLink.replace(/^https?:\/\/[^/]+/i, host);
		else produtoUrl = `${host}/${rawLink.replace(/^\//, "")}`;
	} else produtoUrl = searchUrl;
	const categoria = (Array.isArray(p.categories) ? p.categories : []).map((c) => c.replace(/^\/|\/$/g, "").split("/").slice(1).join(" / ")).find((c) => c.length > 0) ?? "";
	const specVal = (name) => {
		const v = p[name];
		return Array.isArray(v) ? v.map((x) => String(x)) : [];
	};
	const produtosAplicados = specVal("Produtos Aplicados");
	const modelosSpec = specVal("Modelos Aplicados");
	const modelosDetalhados = [];
	for (const raw of modelosSpec) try {
		const parsed = JSON.parse(raw);
		for (const m of parsed.models ?? []) if (m.code) modelosDetalhados.push(String(m.code));
	} catch {}
	const modelosAplicados = Array.from(new Set([...produtosAplicados, ...modelosDetalhados].map((s) => s.trim()).filter(Boolean)));
	return {
		descricao,
		modelosAplicados,
		categoria,
		fonte: produtoUrl,
		observacao: modelosAplicados.length ? "" : "Sem 'Produtos Aplicados' cadastrados para este código."
	};
});
//#endregion
export { enriquecerPecaEletrolux_createServerFn_handler, identificarPecaFoto_createServerFn_handler };
