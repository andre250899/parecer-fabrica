import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Boxes,
  Package,
  PackagePlus,
  PackageMinus,
  Search,
  Trash2,
  Plus,
  History,
  X,
  Camera,
  Sparkles,
  Loader2,
  ExternalLink,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  identificarPecaFoto,
  enriquecerPecaEletrolux,
} from "@/lib/estoque-vision.functions";

type Item = {
  id: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  localizacao: string;
  criadoEm: string;
  codigoBarras?: string;
  marca?: string;
  modelosAplicados?: string[];
  categoria?: string;
  fonte?: string;
  foto?: string; // data URL
};

type Movimento = {
  id: string;
  itemId: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  tecnico: string;
  os: string;
  data: string;
};

const ITEMS_KEY = "voxweb.estoque.itens.v1";
const MOV_KEY = "voxweb.estoque.movimentos.v1";

const readLS = <T,>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
};

const writeLS = <T,>(key: string, value: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

type View = "menu" | "consulta" | "cadastro" | "retirada";

export default function EstoqueScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("menu");
  const [itens, setItens] = useState<Item[]>([]);
  const [movs, setMovs] = useState<Movimento[]>([]);

  useEffect(() => {
    setItens(readLS<Item>(ITEMS_KEY));
    setMovs(readLS<Movimento>(MOV_KEY));
  }, []);

  const persistItens = (next: Item[]) => {
    setItens(next);
    writeLS(ITEMS_KEY, next);
  };
  const persistMovs = (next: Movimento[]) => {
    setMovs(next);
    writeLS(MOV_KEY, next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (view === "menu" ? onBack() : setView("menu"))}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-2 shadow-lg shadow-fuchsia-500/30">
              <Boxes className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Estoque</h1>
              <p className="text-xs text-slate-400">
                {itens.length} item(s) cadastrado(s) · {movs.length} retirada(s)
              </p>
            </div>
          </div>
        </div>
        {view !== "menu" && (
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/80">
            {view === "consulta" ? "Consulta" : view === "cadastro" ? "Cadastro" : "Retirada"}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {view === "menu" && <MenuGrid setView={setView} itens={itens} movs={movs} />}
        {view === "consulta" && <ConsultaView itens={itens} />}
        {view === "cadastro" && (
          <CadastroView itens={itens} onSave={persistItens} />
        )}
        {view === "retirada" && (
          <RetiradaView
            itens={itens}
            movs={movs}
            onUpdateItens={persistItens}
            onUpdateMovs={persistMovs}
          />
        )}
      </main>
    </div>
  );
}

function MenuGrid({
  setView,
  itens,
  movs,
}: {
  setView: (v: View) => void;
  itens: Item[];
  movs: Movimento[];
}) {
  const totalUnidades = itens.reduce((sum, it) => sum + (Number(it.quantidade) || 0), 0);
  const cards = [
    {
      id: "consulta" as const,
      title: "Consulta",
      desc: "Pesquise itens em estoque por código, descrição ou localização.",
      icon: Search,
      gradient: "from-sky-500 via-cyan-500 to-teal-400",
      stat: `${itens.length} itens`,
    },
    {
      id: "cadastro" as const,
      title: "Cadastro",
      desc: "Adicione novos itens e atualize quantidades disponíveis.",
      icon: PackagePlus,
      gradient: "from-emerald-500 via-green-500 to-lime-400",
      stat: `${totalUnidades} un.`,
    },
    {
      id: "retirada" as const,
      title: "Retirada",
      desc: "Registre saída de peças vinculadas ao técnico e à OS.",
      icon: PackageMinus,
      gradient: "from-rose-500 via-fuchsia-500 to-purple-500",
      stat: `${movs.length} saídas`,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Controle de Estoque</h2>
        <p className="mt-2 text-sm text-slate-400">
          Escolha uma operação. Os dados são armazenados localmente no seu dispositivo.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => setView(c.id)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl"
            >
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-30 blur-3xl transition group-hover:opacity-60`}
              />
              <div
                className={`relative inline-flex rounded-xl bg-gradient-to-br ${c.gradient} p-3 shadow-lg`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="relative mt-5 text-xl font-bold">{c.title}</h3>
              <p className="relative mt-2 text-sm text-slate-300">{c.desc}</p>
              <div className="relative mt-6 flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  {c.stat}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-white">
                  Abrir →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function ConsultaView({ itens }: { itens: Item[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return itens;
    return itens.filter(
      (it) =>
        it.codigo.toLowerCase().includes(t) ||
        it.descricao.toLowerCase().includes(t) ||
        it.localizacao.toLowerCase().includes(t),
    );
  }, [q, itens]);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por código, descrição ou localização…"
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
          <Package className="mx-auto mb-3 h-10 w-10 opacity-50" />
          Nenhum item encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <div
              key={it.id}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4 transition hover:border-cyan-400/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs font-mono uppercase text-cyan-300">{it.codigo}</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    it.quantidade > 5
                      ? "bg-emerald-500/20 text-emerald-300"
                      : it.quantidade > 0
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                  }`}
                >
                  {it.quantidade} un.
                </span>
              </div>
              <div className="mt-1 font-semibold text-white">{it.descricao}</div>
              {it.localizacao && (
                <div className="mt-2 text-xs text-slate-400">📍 {it.localizacao}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CadastroView({
  itens,
  onSave,
}: {
  itens: Item[];
  onSave: (next: Item[]) => void;
}) {
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [marca, setMarca] = useState("");
  const [modelosAplicados, setModelosAplicados] = useState<string[]>([]);
  const [categoria, setCategoria] = useState("");
  const [fonte, setFonte] = useState("");
  const [foto, setFoto] = useState<string>("");
  const [analisando, setAnalisando] = useState(false);
  const [enriquecendo, setEnriquecendo] = useState(false);
  const [quantidadeTemp, setQuantidadeTemp] = useState("0");
  const [mostrarTeclado, setMostrarTeclado] = useState(false);

  const identificar = useServerFn(identificarPecaFoto);
  const enriquecer = useServerFn(enriquecerPecaEletrolux);

  const limparCampos = () => {
    setCodigo("");
    setDescricao("");
    setLocalizacao("");
    setCodigoBarras("");
    setMarca("");
    setModelosAplicados([]);
    setCategoria("");
    setFonte("");
    setFoto("");
    setQuantidadeTemp("0");
  };

  const handleFoto = async (file: File) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx. 8 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      setFoto(dataUrl);
      const base64 = dataUrl.split(",")[1] || "";
      const mimeType = file.type || "image/jpeg";
      setAnalisando(true);
      try {
        const r = await identificar({ data: { base64, mimeType } });
        if (r.codigo) setCodigo(r.codigo);
        if (r.codigoBarras) setCodigoBarras(r.codigoBarras);
        if (r.descricao) setDescricao(r.descricao);
        if (r.marca) setMarca(r.marca);
        if (r.modelosAplicados?.length) setModelosAplicados(r.modelosAplicados);
        toast.success("Peça identificada pela foto.");
        // enriquecer automaticamente se houver código
        if (r.codigo) {
          setEnriquecendo(true);
          try {
            const e = await enriquecer({
              data: { codigo: r.codigo, descricao: r.descricao || "" },
            });
            if (e.descricao && !r.descricao) setDescricao(e.descricao);
            if (e.modelosAplicados?.length)
              setModelosAplicados((prev) =>
                Array.from(new Set([...prev, ...e.modelosAplicados])),
              );
            if (e.categoria) setCategoria(e.categoria);
            if (e.fonte) setFonte(e.fonte);
          } catch (err) {
            console.error(err);
          } finally {
            setEnriquecendo(false);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Falha ao analisar a foto.",
        );
      } finally {
        setAnalisando(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const buscarNoSiteParceiros = async () => {
    if (!codigo.trim()) {
      toast.error("Informe o código antes de buscar.");
      return;
    }
    setEnriquecendo(true);
    try {
      const e = await enriquecer({
        data: { codigo: codigo.trim(), descricao: descricao.trim() },
      });
      if (e.descricao) setDescricao(e.descricao);
      if (e.modelosAplicados?.length)
        setModelosAplicados((prev) =>
          Array.from(new Set([...prev, ...e.modelosAplicados])),
        );
      if (e.categoria) setCategoria(e.categoria);
      if (e.fonte) setFonte(e.fonte);
      toast.success("Informações complementares carregadas.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha na busca.");
    } finally {
      setEnriquecendo(false);
    }
  };

  const abrirTecladoQuantidade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim() || !descricao.trim()) {
      toast.error("Informe código e descrição.");
      return;
    }
    setQuantidadeTemp("0");
    setMostrarTeclado(true);
  };

  const salvar = (qtdInformada: number) => {
    const q = qtdInformada || 0;
    if (q <= 0) {
      toast.error("Informe uma quantidade maior que zero.");
      return;
    }
    const existing = itens.find(
      (it) => it.codigo.toLowerCase() === codigo.trim().toLowerCase(),
    );
    let next: Item[];
    if (existing) {
      next = itens.map((it) =>
        it.id === existing.id
          ? {
              ...it,
              descricao: descricao.trim() || it.descricao,
              localizacao: localizacao.trim() || it.localizacao,
              quantidade: it.quantidade + q,
              codigoBarras: codigoBarras.trim() || it.codigoBarras,
              marca: marca.trim() || it.marca,
              modelosAplicados: modelosAplicados.length
                ? modelosAplicados
                : it.modelosAplicados,
              categoria: categoria.trim() || it.categoria,
              fonte: fonte.trim() || it.fonte,
              foto: foto || it.foto,
            }
          : it,
      );
      toast.success(`+${q} un. adicionadas ao item ${codigo}.`);
    } else {
      next = [
        {
          id: crypto.randomUUID(),
          codigo: codigo.trim(),
          descricao: descricao.trim(),
          quantidade: q,
          localizacao: localizacao.trim(),
          criadoEm: new Date().toISOString(),
          codigoBarras: codigoBarras.trim() || undefined,
          marca: marca.trim() || undefined,
          modelosAplicados: modelosAplicados.length ? modelosAplicados : undefined,
          categoria: categoria.trim() || undefined,
          fonte: fonte.trim() || undefined,
          foto: foto || undefined,
        },
        ...itens,
      ];
      toast.success(`Item ${codigo} cadastrado.`);
    }
    onSave(next);
    limparCampos();
    setMostrarTeclado(false);
  };

  const remover = (id: string) => {
    if (!confirm("Remover este item do estoque?")) return;
    onSave(itens.filter((it) => it.id !== id));
  };

  const tecladoPressionar = (valor: string) => {
    setQuantidadeTemp((prev) => {
      const limpo = prev.replace(/^0+/, "").replace(/\D/g, "") || "0";
      const novo = limpo === "0" ? valor : limpo + valor;
      return novo.slice(0, 5);
    });
  };

  const tecladoApagar = () => {
    setQuantidadeTemp((prev) => {
      const limpo = prev.replace(/\D/g, "");
      const novo = limpo.slice(0, -1) || "0";
      return novo;
    });
  };

  const tecladoLimpar = () => setQuantidadeTemp("0");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <form
        onSubmit={abrirTecladoQuantidade}
        className="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-lg font-bold">Novo item</h3>
        <p className="text-xs text-slate-400">
          Informe os dados do item. A quantidade será digitada ao clicar em Salvar item.
        </p>

        {/* Photo capture */}
        <div className="rounded-xl border border-dashed border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-200">
            <Sparkles className="h-4 w-4" /> Identificar por foto
          </div>
          <p className="mt-1 text-[11px] text-slate-300">
            Tire uma foto da etiqueta, embalagem ou código de barras. Vamos
            identificar o código e buscar modelos aplicados.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fuchsia-500/20 px-3 py-2 text-xs font-semibold text-fuchsia-100 hover:bg-fuchsia-500/30">
              <Camera className="h-4 w-4" /> Câmera
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFoto(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10">
              <Package className="h-4 w-4" /> Galeria
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFoto(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            {foto && (
              <button
                type="button"
                onClick={() => setFoto("")}
                className="rounded-lg bg-rose-500/20 px-2 py-2 text-xs text-rose-200 hover:bg-rose-500/30"
                title="Remover foto"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {(analisando || enriquecendo) && (
              <span className="inline-flex items-center gap-1 text-xs text-fuchsia-200">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {analisando ? "Analisando foto…" : "Buscando dados…"}
              </span>
            )}
          </div>
          {foto && (
            <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
              <img src={foto} alt="Peça" className="max-h-40 w-full object-contain bg-black/40" />
            </div>
          )}
        </div>

        <Field label="Código">
          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            className={inputCls}
            placeholder="Ex.: W10820038"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Código de barras">
            <input
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              className={inputCls}
              placeholder="EAN/GTIN"
            />
          </Field>
          <Field label="Marca">
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className={inputCls}
              placeholder="Electrolux"
            />
          </Field>
        </div>
        <Field label="Descrição">
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={inputCls}
            placeholder="Ex.: Placa de potência"
          />
        </Field>
        <Field label="Localização">
          <input
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={inputCls}
            placeholder="Ex.: Prateleira A3"
          />
        </Field>
        <Field label="Categoria">
          <input
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={inputCls}
            placeholder="Refrigeração…"
          />
        </Field>
        <Field label="Modelos aplicados">
          <textarea
            value={modelosAplicados.join(", ")}
            onChange={(e) =>
              setModelosAplicados(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
            className={`${inputCls} min-h-16`}
            placeholder="Modelo A, Modelo B…"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={buscarNoSiteParceiros}
            disabled={enriquecendo || !codigo.trim()}
            className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-xs font-semibold text-fuchsia-100 hover:bg-fuchsia-500/20 disabled:opacity-40"
          >
            {enriquecendo ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Wand2 className="h-3.5 w-3.5" />
            )}
            Buscar dados
          </button>
          <a
            href={`https://compraparceiros.electrolux.com.br/${codigo ? `?q=${encodeURIComponent(codigo)}` : ""}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Abrir Compra Parceiros
          </a>
        </div>
        {fonte && (
          <p className="text-[11px] text-slate-400">
            Fonte consultada: <span className="text-slate-200">{fonte}</span>
          </p>
        )}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" /> Salvar item
        </button>
      </form>
      <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">Itens cadastrados</h3>
          <span className="text-xs text-slate-400">{itens.length} registro(s)</span>
        </div>
        {itens.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 p-8 text-center text-slate-400">
            Nenhum item cadastrado ainda.
          </div>
        ) : (
          <div className="max-h-[60vh] space-y-2 overflow-auto pr-1">
            {itens.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
              >
                {it.foto && (
                  <img
                    src={it.foto}
                    alt=""
                    className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-mono text-cyan-300">{it.codigo}</div>
                  <div className="truncate text-sm text-white">{it.descricao}</div>
                  <div className="mt-0.5 flex flex-wrap gap-x-2 text-[11px] text-slate-400">
                    {it.localizacao && <span>📍 {it.localizacao}</span>}
                    {it.marca && <span>🏷️ {it.marca}</span>}
                    {it.categoria && <span>📂 {it.categoria}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold">
                    {it.quantidade}
                  </span>
                  <button
                    onClick={() => remover(it.id)}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300"
                    title="Remover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RetiradaView({
  itens,
  movs,
  onUpdateItens,
  onUpdateMovs,
}: {
  itens: Item[];
  movs: Movimento[];
  onUpdateItens: (next: Item[]) => void;
  onUpdateMovs: (next: Movimento[]) => void;
}) {
  const [itemId, setItemId] = useState("");
  const [qtd, setQtd] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [os, setOs] = useState("");

  const item = itens.find((i) => i.id === itemId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) {
      toast.error("Selecione um item.");
      return;
    }
    const q = parseInt(qtd, 10) || 0;
    if (q <= 0) {
      toast.error("Informe uma quantidade válida.");
      return;
    }
    if (q > item.quantidade) {
      toast.error(`Estoque insuficiente. Disponível: ${item.quantidade}.`);
      return;
    }
    if (!tecnico.trim()) {
      toast.error("Informe o técnico responsável.");
      return;
    }
    const nextItens = itens.map((it) =>
      it.id === item.id ? { ...it, quantidade: it.quantidade - q } : it,
    );
    const nextMov: Movimento = {
      id: crypto.randomUUID(),
      itemId: item.id,
      codigo: item.codigo,
      descricao: item.descricao,
      quantidade: q,
      tecnico: tecnico.trim(),
      os: os.trim(),
      data: new Date().toISOString(),
    };
    onUpdateItens(nextItens);
    onUpdateMovs([nextMov, ...movs]);
    toast.success(`Retirada registrada: ${q} × ${item.codigo}.`);
    setItemId("");
    setQtd("");
    setOs("");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <form
        onSubmit={submit}
        className="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-lg font-bold">Registrar retirada</h3>
        <Field label="Item">
          <select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className={inputCls}
          >
            <option value="">Selecione…</option>
            {itens.map((it) => (
              <option key={it.id} value={it.id} disabled={it.quantidade <= 0}>
                {it.codigo} — {it.descricao} ({it.quantidade})
              </option>
            ))}
          </select>
        </Field>
        {item && (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
            Disponível: <span className="font-bold text-emerald-300">{item.quantidade}</span>
            {item.localizacao && <> · 📍 {item.localizacao}</>}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Quantidade">
            <input
              type="number"
              min={1}
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Nº OS">
            <input
              value={os}
              onChange={(e) => setOs(e.target.value)}
              className={inputCls}
              placeholder="opcional"
            />
          </Field>
        </div>
        <Field label="Técnico responsável">
          <input
            value={tecnico}
            onChange={(e) => setTecnico(e.target.value)}
            className={inputCls}
          />
        </Field>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-rose-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
        >
          <PackageMinus className="h-4 w-4" /> Confirmar retirada
        </button>
      </form>
      <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <History className="h-4 w-4 text-fuchsia-300" />
          <h3 className="text-lg font-bold">Histórico de retiradas</h3>
        </div>
        {movs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 p-8 text-center text-slate-400">
            Nenhuma retirada registrada ainda.
          </div>
        ) : (
          <div className="max-h-[60vh] space-y-2 overflow-auto pr-1">
            {movs.map((m) => (
              <div
                key={m.id}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-fuchsia-300">{m.codigo}</span>
                  <span>{new Date(m.data).toLocaleString("pt-BR")}</span>
                </div>
                <div className="mt-1 text-sm text-white">{m.descricao}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-300">
                  <span>
                    Qtd: <span className="font-bold text-rose-300">{m.quantidade}</span>
                  </span>
                  <span>Técnico: {m.tecnico}</span>
                  {m.os && <span>OS: {m.os}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}