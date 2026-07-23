export type ParecerTipo = "vox" | "hisense" | "assurant" | "whirlpool";

export interface FotoItem {
  legenda: string;
  dataUrl: string; // base64 image
}

export interface HisenseData {
  numeroOS: string;
  assistenciaTec: string;
  clienteNome: string;
  modeloProduto: string;
  numeroSerie: string;
  artBatch: string;
  marcaProduto: "gorenje" | "hisense";
  defeitoRelatado: string;
  diagnosticoTec: string;
  instalacaoCorreta: string;
  pecasNecessarias: string;
  tensaoF1F2: string;
  tensaoF1Terra: string;
  tensaoF2Terra: string;
  anotacoes: string;
  responsavel: string;
  dataParecer: string;
  cidade: string;
  fotos: FotoItem[]; // 8 slots
}

export const defaultHisense: HisenseData = {
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
    { legenda: "FOTO 1 – Instalação do Produto", dataUrl: "" },
    { legenda: "FOTO 2 – Instalação do Produto", dataUrl: "" },
    { legenda: "FOTO 3 – Local onde o Produto está Instalado.", dataUrl: "" },
    { legenda: "FOTO 4 – Instalação Elétrica", dataUrl: "" },
    { legenda: "FOTO 5 – Nº de Serie", dataUrl: "" },
    { legenda: "FOTO 6 – Peça Avariada", dataUrl: "" },
    { legenda: "FOTO 7 – Defeito/Erro Encontrado", dataUrl: "" },
    { legenda: "FOTO 8 – Defeito/Erro Encontrado", dataUrl: "" },
  ],
};

export interface AssurantData {
  assistencia: string;
  cnpj: string;
  serial: string;
  sinistro: string;
  produtoMarca: string;
  produtoModelo: string;
  parecerTecnico: string;
  pecaTrocar: string;
  motivo: string;
  formaAtendimento: string;
  produtoColetado: string;
  responsavel: string;
  cidade: string;
  dataParecer: string;
  fotos: FotoItem[]; // 4 defeito
  cotacaoImgs: string[]; // 2 cotação
  residenciaImg: string;
}

export const defaultAssurant: AssurantData = {
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
    { legenda: "FOTO DO DEFEITO ENCONTRADO", dataUrl: "" },
    { legenda: "FOTO DO DEFEITO ENCONTRADO", dataUrl: "" },
    { legenda: "FOTO DO DEFEITO ENCONTRADO", dataUrl: "" },
    { legenda: "FOTO DO DEFEITO ENCONTRADO", dataUrl: "" },
  ],
  cotacaoImgs: ["", ""],
  residenciaImg: "",
};

export interface WhirlpoolPeca {
  quantidade: string;
  codigo: string;
  descricao: string;
  fcta: string;
  ocor: string;
  valor: string;
}

export interface WhirlpoolData {
  numeroOS: string;
  tecnico: string;
  dataAgenda: string;
  dataChamado: string;
  periodo: "MANHÃ" | "TARDE" | "";
  tipoAgenda: string;
  autorizada: string;
  enderecoAutorizada: string;
  cnpjAutorizada: string;
  foneAutorizada: string;
  inscEstadualAutorizada: string;
  centralAtendimento: string;
  foneCentral1: string;
  foneCentral2: string;
  consumidor: string;
  cep: string;
  regiao: string;
  endereco: string;
  bairro: string;
  complemento: string;
  cidade: string;
  uf: string;
  cnpjCpf: string;
  enderecoEletronico: string;
  foneResidencia: string;
  foneComercial: string;
  foneOutros: string;
  localizacao: string;
  produto: string;
  marca: string;
  produtoConsumidor: string;
  linha: string;
  serie: string;
  nomeComercial: string;
  tempoUso: string;
  tipoOS: string;
  nrNotaFiscal: string;
  dataCompra: string;
  cor: string;
  voltagem: string;
  capacidade: string;
  defeitoReclamado: string;
  defeitoConstatado: string;
  defeitoReclamado2: string;
  defeitoConstatado2: string;
  reclamacaoAtendimento: string;
  laudoTecnico: string;
  pecas: WhirlpoolPeca[];
  observacao: string;
  totalPecas: string;
  maoDeObra: string;
  totalOrcamento: string;
  validadeOrcamento: string;
  parcelas: string;
  vencimento: string;
  valorOrcamento: string;
  condicaoPagamento: string;
  dataAprovacao: string;
  garantiaServicoMeses: string;
  garantiaPecasMeses: string;
  dataConclusao: string;
  responsavel: string;
  dataParecer: string;
  assinaturaConsumidor: string;
}

export const emptyWhirlpoolPeca = (): WhirlpoolPeca => ({
  quantidade: "",
  codigo: "",
  descricao: "",
  fcta: "",
  ocor: "",
  valor: "",
});

export const defaultWhirlpool: WhirlpoolData = {
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
};

// Compress an image file to a JPEG data URL, max ~900px, quality 0.72
export async function fileToCompressedDataUrl(file: File, maxDim = 900, quality = 0.72): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
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