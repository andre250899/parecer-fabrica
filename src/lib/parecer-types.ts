export interface OrcamentoItem {
  codigo: string;
  descricao: string;
  qtde: string;
  valorUnit: string;
}

export interface ParecerData {
  numeroOS: string;
  dataEntrada: string;
  clienteNome: string;
  clienteCPF: string;
  clienteEndereco: string;
  clienteTelefone: string;
  equipProduto: string;
  equipMarca: string;
  equipModelo: string;
  equipSerie: string;
  defeito: string;
  parecer: string;
  servico: string;
  itens: OrcamentoItem[];
  observacoes: string;
  validadeDias: string;
  garantia: string;
  responsavel: string;
  dataParecer: string;
}

export const emptyItem = (): OrcamentoItem => ({
  codigo: "",
  descricao: "",
  qtde: "",
  valorUnit: "",
});

export const defaultParecer: ParecerData = {
  numeroOS: "",
  dataEntrada: "",
  clienteNome: "",
  clienteCPF: "",
  clienteEndereco: "",
  clienteTelefone: "",
  equipProduto: "",
  equipMarca: "",
  equipModelo: "",
  equipSerie: "",
  defeito: "",
  parecer: "",
  servico: "",
  itens: [emptyItem()],
  observacoes:
    "Orçamento válido por 15 (quinze) dias.\nApós aprovado o orçamento, o prazo para execução do serviço será informado.",
  validadeDias: "15 (QUINZE) DIAS",
  garantia: "Garantia conforme legislação vigente e políticas internas da empresa.",
  responsavel: "Jefferson Hoffmann",
  dataParecer: "",
};

export const formatBRL = (v: string) => {
  const n = parseFloat(String(v).replace(",", "."));
  if (isNaN(n)) return "R$ 0,00";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const totalOrcamento = (itens: OrcamentoItem[]) => {
  return itens.reduce((sum, it) => {
    const q = parseFloat(it.qtde.replace(",", ".")) || 0;
    const v = parseFloat(it.valorUnit.replace(",", ".")) || 0;
    return sum + q * v;
  }, 0);
};

export interface ThemeDef {
  id: string;
  name: string;
  description: string;
  // colors
  primary: string;
  primarySoft: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  // style
  fontFamily: string;
  headingFont: string;
  radius: string;
  headerStyle: "pill" | "bar" | "underline" | "square" | "ribbon" | "serif";
  iconStyle: "circle" | "square" | "outline" | "none";
}

export const THEMES: ThemeDef[] = [
  {
    id: "vox",
    name: "Vox Original (Azul Corporativo)",
    description: "Design do modelo enviado — azul-marinho com pílulas e ícones em círculos.",
    primary: "#0d1b3d",
    primarySoft: "#e8edf5",
    accent: "#2a6fdb",
    bg: "#ffffff",
    surface: "#ffffff",
    text: "#0d1b3d",
    muted: "#5b6b85",
    border: "#d4dbe8",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Inter', system-ui, sans-serif",
    radius: "14px",
    headerStyle: "pill",
    iconStyle: "circle",
  },
  {
    id: "minimal",
    name: "Minimal Preto & Branco",
    description: "Preto e branco, tipografia limpa, sem ornamentos.",
    primary: "#000000",
    primarySoft: "#f4f4f4",
    accent: "#000000",
    bg: "#ffffff",
    surface: "#ffffff",
    text: "#0a0a0a",
    muted: "#666666",
    border: "#dcdcdc",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Inter', system-ui, sans-serif",
    radius: "0px",
    headerStyle: "underline",
    iconStyle: "none",
  },
  {
    id: "emerald",
    name: "Moderno Verde Esmeralda",
    description: "Verde esmeralda com cartões suaves — vibe moderna e tecnológica.",
    primary: "#065f46",
    primarySoft: "#ecfdf5",
    accent: "#10b981",
    bg: "#f8fafb",
    surface: "#ffffff",
    text: "#0f2419",
    muted: "#4b6b5c",
    border: "#d1e7dc",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Inter', system-ui, sans-serif",
    radius: "12px",
    headerStyle: "bar",
    iconStyle: "square",
  },
  {
    id: "bordo",
    name: "Elegante Bordô",
    description: "Bordô + creme com serifada editorial — feel formal e sofisticado.",
    primary: "#6d2e46",
    primarySoft: "#f7ede8",
    accent: "#a26769",
    bg: "#faf6f1",
    surface: "#ffffff",
    text: "#2c1a1f",
    muted: "#7a5a60",
    border: "#e6d6cf",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Georgia', 'Times New Roman', serif",
    radius: "6px",
    headerStyle: "serif",
    iconStyle: "outline",
  },
  {
    id: "tech",
    name: "Tech Escuro (Ciano)",
    description: "Fundo escuro com acentos ciano — para OS mais tecnológicas.",
    primary: "#0ea5b7",
    primarySoft: "#0a1720",
    accent: "#22d3ee",
    bg: "#0b1220",
    surface: "#111a2c",
    text: "#e6f1ff",
    muted: "#8aa0bd",
    border: "#1e2c47",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Inter', system-ui, sans-serif",
    radius: "10px",
    headerStyle: "ribbon",
    iconStyle: "square",
  },
  {
    id: "classico",
    name: "Clássico Cinza (Formal)",
    description: "Documento oficial em tons de cinza — sóbrio e neutro.",
    primary: "#374151",
    primarySoft: "#f3f4f6",
    accent: "#6b7280",
    bg: "#ffffff",
    surface: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    border: "#d1d5db",
    fontFamily: "'Inter', system-ui, sans-serif",
    headingFont: "'Inter', system-ui, sans-serif",
    radius: "2px",
    headerStyle: "square",
    iconStyle: "none",
  },
];