//#region node_modules/.nitro/vite/services/ssr/assets/parecer-extras-BH44_VuI.js
var defaultHisense = {
	numeroOS: "",
	assistenciaTec: "VOX ELETRÔNICA",
	clienteNome: "",
	modeloProduto: "",
	numeroSerie: "",
	artBatch: "",
	marcaProduto: "hisense",
	defeitoRelatado: "",
	diagnosticoTec: "",
	instalacaoCorreta: "",
	pecasNecessarias: "",
	tensaoF1F2: "",
	tensaoF1Terra: "",
	tensaoF2Terra: "",
	anotacoes: "",
	responsavel: "Jefferson Hoffmann",
	dataParecer: "",
	cidade: "Vitoria",
	fotos: [
		{
			legenda: "FOTO 1 – Instalação do Produto",
			dataUrl: ""
		},
		{
			legenda: "FOTO 2 – Instalação do Produto",
			dataUrl: ""
		},
		{
			legenda: "FOTO 3 – Local onde o Produto está Instalado.",
			dataUrl: ""
		},
		{
			legenda: "FOTO 4 – Instalação Elétrica",
			dataUrl: ""
		},
		{
			legenda: "FOTO 5 – Nº de Serie",
			dataUrl: ""
		},
		{
			legenda: "FOTO 6 – Peça Avariada",
			dataUrl: ""
		},
		{
			legenda: "FOTO 7 – Defeito/Erro Encontrado",
			dataUrl: ""
		},
		{
			legenda: "FOTO 8 – Defeito/Erro Encontrado",
			dataUrl: ""
		}
	]
};
var defaultAssurant = {
	assistencia: "",
	cnpj: "",
	serial: "",
	sinistro: "",
	produtoMarca: "",
	produtoModelo: "",
	parecerTecnico: "",
	pecaTrocar: "",
	motivo: "",
	formaAtendimento: "",
	produtoColetado: "",
	responsavel: "",
	cidade: "",
	dataParecer: "",
	fotos: [
		{
			legenda: "FOTO DO DEFEITO ENCONTRADO",
			dataUrl: ""
		},
		{
			legenda: "FOTO DO DEFEITO ENCONTRADO",
			dataUrl: ""
		},
		{
			legenda: "FOTO DO DEFEITO ENCONTRADO",
			dataUrl: ""
		},
		{
			legenda: "FOTO DO DEFEITO ENCONTRADO",
			dataUrl: ""
		}
	],
	cotacaoImgs: ["", ""],
	residenciaImg: ""
};
var emptyWhirlpoolPeca = () => ({
	quantidade: "",
	codigo: "",
	descricao: "",
	fcta: "",
	ocor: "",
	valor: ""
});
var defaultWhirlpool = {
	numeroOS: "",
	tecnico: "",
	dataAgenda: "",
	dataChamado: "",
	periodo: "",
	tipoAgenda: "",
	autorizada: "VOX SERRA LTDA",
	enderecoAutorizada: "AVENIDA DESEMBARGADOR MARIO DA SILVA NUNES",
	cnpjAutorizada: "61.422.882/0001-78",
	foneAutorizada: "(27) 3227-1288",
	inscEstadualAutorizada: "084.574.550",
	centralAtendimento: "CONSUL",
	foneCentral1: "3003 0777",
	foneCentral2: "0800 970 0777",
	consumidor: "",
	cep: "",
	regiao: "",
	endereco: "",
	bairro: "",
	complemento: "",
	cidade: "",
	uf: "",
	cnpjCpf: "",
	enderecoEletronico: "",
	foneResidencia: "",
	foneComercial: "",
	foneOutros: "",
	localizacao: "",
	produto: "",
	marca: "",
	produtoConsumidor: "",
	linha: "",
	serie: "",
	nomeComercial: "",
	tempoUso: "",
	tipoOS: "",
	nrNotaFiscal: "",
	dataCompra: "",
	cor: "",
	voltagem: "",
	capacidade: "",
	defeitoReclamado: "",
	defeitoConstatado: "",
	defeitoReclamado2: "",
	defeitoConstatado2: "",
	reclamacaoAtendimento: "",
	laudoTecnico: "",
	pecas: [emptyWhirlpoolPeca()],
	observacao: "",
	totalPecas: "",
	maoDeObra: "",
	totalOrcamento: "",
	validadeOrcamento: "O ORÇAMENTO É VÁLIDO POR 10 DIAS, APÓS ESSE PRAZO O MESMO ESTARÁ SUJEITO A MODIFICAÇÕES.",
	parcelas: "",
	vencimento: "",
	valorOrcamento: "",
	condicaoPagamento: "",
	dataAprovacao: "",
	garantiaServicoMeses: "",
	garantiaPecasMeses: "",
	dataConclusao: "",
	responsavel: "Jefferson Hoffmann",
	dataParecer: "",
	assinaturaConsumidor: "",
	anexoNotaFiscal: "",
	anexoEtiqueta: ""
};
function downloadDataUrl(dataUrl, filename) {
	if (!dataUrl) return;
	let ext = "jpg";
	const mime = /^data:([^;,]+)/.exec(dataUrl)?.[1] ?? "";
	if (mime.includes("pdf")) ext = "pdf";
	else if (mime.includes("png")) ext = "png";
	else if (mime.includes("webp")) ext = "webp";
	const safe = filename.replace(/[^\p{L}\p{N}\-_ ]/gu, "").trim().replace(/\s+/g, "-") || "anexo";
	const a = document.createElement("a");
	a.href = dataUrl;
	a.download = `${safe}.${ext}`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
async function fileToCompressedDataUrl(file, maxDim = 900, quality = .72) {
	const dataUrl = await new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = reject;
		r.readAsDataURL(file);
	});
	const img = await new Promise((resolve, reject) => {
		const i = new Image();
		i.onload = () => resolve(i);
		i.onerror = reject;
		i.src = dataUrl;
	});
	const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
	const w = Math.round(img.width * scale);
	const h = Math.round(img.height * scale);
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) return dataUrl;
	ctx.drawImage(img, 0, 0, w, h);
	return canvas.toDataURL("image/jpeg", quality);
}
//#endregion
export { fileToCompressedDataUrl as a, downloadDataUrl as i, defaultHisense as n, defaultWhirlpool as r, defaultAssurant as t };
