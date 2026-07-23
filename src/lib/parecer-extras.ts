export type ParecerTipo = "vox" | "hisense" | "assurant";

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
  motivo1: string;
  motivo2: string;
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
  assistencia: "VOX ELETRÔNICA",
  cnpj: "23892561000148",
  serial: "",
  sinistro: "",
  produtoMarca: "",
  produtoModelo: "",
  parecerTecnico: "",
  pecaTrocar: "",
  motivo1: "",
  motivo2: "",
  formaAtendimento: "",
  produtoColetado: "",
  responsavel: "Jose Tadeu",
  cidade: "VITORIA",
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