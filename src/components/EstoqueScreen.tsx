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
import { supabase } from "@/integrations/supabase/client";

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

type ItemRow = {
  id: string;
  codigo: string;
  descricao: string | null;
  quantidade: number;
  localizacao: string | null;
  codigo_barras: string | null;
  marca: string | null;
  modelos_aplicados: string[] | null;
  categoria: string | null;
  fonte: string | null;
  foto: string | null;
  created_at: string;
};

type MovRow = {
  id: string;
  item_id: string | null;
  codigo: string;
  descricao: string | null;
  quantidade: number;
  tecnico: string | null;
  os: string | null;
  data: string;
};

const rowToItem = (r: ItemRow): Item => ({
  id: r.id,
  codigo: r.codigo,
  descricao: r.descricao ?? "",
  quantidade: r.quantidade,
  localizacao: r.localizacao ?? "",
  criadoEm: r.created_at,
  codigoBarras: r.codigo_barras ?? undefined,
  marca: r.marca ?? undefined,
  modelosAplicados: r.modelos_aplicados ?? undefined,
  categoria: r.categoria ?? undefined,
  fonte: r.fonte ?? undefined,
  foto: r.foto ?? undefined,
});

const rowToMov = (r: MovRow): Movimento => ({
  id: r.id,
  itemId: r.item_id ?? "",
  codigo: r.codigo,
  descricao: r.descricao ?? "",
  quantidade: r.quantidade,
  tecnico: r.tecnico ?? "",
  os: r.os ?? "",
  data: r.data,
});

type View = "menu" | "consulta" | "cadastro" | "retirada";

export default function EstoqueScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("menu");
  const [itens, setItens] = useState<Item[]>([]);
  const [movs, setMovs] = useState<Movimento[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const [i, m] = await Promise.all([
        supabase
          .from("estoque_itens")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("estoque_movimentos")
          .select("*")
          .order("data", { ascending: false })
          .limit(200),
      ]);
      if (i.error) throw i.error;
      if (m.error) throw m.error;
      setItens(((i.data ?? []) as ItemRow[]).map(rowToItem));
      setMovs(((m.data ?? []) as MovRow[]).map(rowToMov));
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Falha ao carregar estoque.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

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
                {loading ? "carregando…" : `${itens.length} item(s) cadastrado(s) · ${movs.length} retirada(s)`}
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
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando estoque…
          </div>
        ) : (
          <>
            {view === "menu" && <MenuGrid setView={setView} itens={itens} movs={movs} />}
            {view === "consulta" && <ConsultaView itens={itens} />}
            {view === "cadastro" && (
              <CadastroView itens={itens} onReload={reload} />
            )}
            {view === "retirada" && (
              <RetiradaView itens={itens} movs={movs} onReload={reload} />
            )}
          </>
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
          Escolha uma operação. Os dados são compartilhados entre todos os usuários da equipe.
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
  const [selected, setSelected] = useState<Item | null>(null);
  const [modo, setModo] = useState<"dados" | "foto">("dados");
  const [analisandoFoto, setAnalisandoFoto] = useState(false);
  const [fotoPreview, setFotoPreview] = useState("");
  const [ultimaIdent, setUltimaIdent] = useState("");
  const identificar = useServerFn(identificarPecaFoto);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return itens;
    return itens.filter(
      (it) =>
        it.codigo.toLowerCase().includes(t) ||
        it.descricao.toLowerCase().includes(t) ||
        it.localizacao.toLowerCase().includes(t) ||
        (it.codigoBarras || "").toLowerCase().includes(t) ||
        (it.marca || "").toLowerCase().includes(t),
    );
  }, [q, itens]);

  const handleFotoConsulta = async (file: File) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx. 8 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      setFotoPreview(dataUrl);
      const base64 = dataUrl.split(",")[1] || "";
      const mimeType = file.type || "image/jpeg";
      setAnalisandoFoto(true);
      try {
        const r = await identificar({ data: { base64, mimeType } });
        const codigoRef = (r.codigo || "").toUpperCase().trim();
        const barrasRef = (r.codigoBarras || "").trim();
        setUltimaIdent(
          [codigoRef, barrasRef, r.descricao].filter(Boolean).join(" · "),
        );
        const match = itens.find((it) => {
          const c = it.codigo.toUpperCase();
          const b = (it.codigoBarras || "").trim();
          return (
            (codigoRef && c === codigoRef) ||
            (barrasRef && b && b === barrasRef)
          );
        });
        if (match) {
          setSelected(match);
          toast.success(`Peça localizada: ${match.codigo}`);
        } else {
          const query = codigoRef || barrasRef || r.descricao || "";
          setQ(query);
          setModo("dados");
          toast.warning("Peça não encontrada no estoque. Confira os resultados.");
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Falha ao analisar a foto.",
        );
      } finally {
        setAnalisandoFoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 rounded-lg border border-white/10 bg-slate-950/40 p-1">
        <button
          type="button"
          onClick={() => setModo("dados")}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-bold transition ${
            modo === "dados"
              ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          <Search className="mr-1 inline h-3.5 w-3.5" /> Por dados
        </button>
        <button
          type="button"
          onClick={() => setModo("foto")}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-bold transition ${
            modo === "foto"
              ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow"
              : "text-slate-300 hover:bg-white/5"
          }`}
        >
          <Camera className="mr-1 inline h-3.5 w-3.5" /> Por foto
        </button>
      </div>

      {modo === "dados" ? (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por código, descrição, barras, marca ou localização…"
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-cyan-400/40 bg-cyan-500/5 px-4 py-6 text-center text-xs text-slate-300 hover:bg-cyan-500/10">
            {analisandoFoto ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
                Analisando…
              </>
            ) : (
              <>
                <Camera className="h-6 w-6 text-cyan-300" />
                Tirar foto ou selecionar imagem da peça
              </>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFotoConsulta(f);
                e.target.value = "";
              }}
              className="hidden"
            />
          </label>
          {fotoPreview && (
            <img
              src={fotoPreview}
              alt=""
              className="mt-3 max-h-40 w-full rounded-md border border-white/10 object-contain bg-black/40"
            />
          )}
          {ultimaIdent && (
            <p className="mt-2 text-[11px] text-slate-400">
              Identificado: <span className="text-slate-200">{ultimaIdent}</span>
            </p>
          )}
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
          <Package className="mx-auto mb-3 h-10 w-10 opacity-50" />
          Nenhum item encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <button
              key={it.id}
              onClick={() => setSelected(it)}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4 text-left transition hover:border-cyan-400/40 hover:from-white/15 hover:to-white/[0.04] focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
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
            </button>
          ))}
        </div>
      )}
      {selected && <ItemDetailModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ItemDetailModal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-300">{item.codigo}</div>
            <h3 className="text-lg font-bold text-white">Ficha do item</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {item.foto && (
          <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
            <img
              src={item.foto}
              alt={`Foto de ${item.descricao}`}
              className="max-h-52 w-full object-contain bg-black/40"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReadOnlyField label="Código" value={item.codigo} />
          <ReadOnlyField label="Código de barras" value={item.codigoBarras || "—"} />
          <ReadOnlyField label="Descrição" value={item.descricao} />
          <ReadOnlyField label="Marca" value={item.marca || "—"} />
          <ReadOnlyField label="Categoria" value={item.categoria || "—"} />
          <ReadOnlyField label="Localização" value={item.localizacao || "—"} />
          <ReadOnlyField label="Quantidade em estoque" value={String(item.quantidade)} />
          <ReadOnlyField
            label="Cadastrado em"
            value={new Date(item.criadoEm).toLocaleString("pt-BR")}
          />
        </div>

        <div className="mt-4">
          <ReadOnlyField
            label="Modelos aplicados"
            value={
              item.modelosAplicados && item.modelosAplicados.length > 0
                ? item.modelosAplicados.join(", ")
                : "—"
            }
            fullWidth
          />
        </div>

        {item.fonte && (
          <div className="mt-4">
            <a
              href={item.fonte}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-xs font-semibold text-fuchsia-100 hover:bg-fuchsia-500/20"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Abrir Compra Parceiros
            </a>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <label className={`block ${fullWidth ? "md:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <div className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-200">
        {value}
      </div>
    </label>
  );
}

function CadastroView({
  itens,
  onReload,
}: {
  itens: Item[];
  onReload: () => Promise<void>;
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

  const salvar = async (qtdInformada: number) => {
    const q = qtdInformada || 0;
    if (q <= 0) {
      toast.error("Informe uma quantidade maior que zero.");
      return;
    }
    const existing = itens.find(
      (it) => it.codigo.toLowerCase() === codigo.trim().toLowerCase(),
    );
    try {
      if (existing) {
        const { error } = await supabase
          .from("estoque_itens")
          .update({
            descricao: descricao.trim() || existing.descricao,
            localizacao: localizacao.trim() || existing.localizacao,
            quantidade: existing.quantidade + q,
            codigo_barras: codigoBarras.trim() || existing.codigoBarras || null,
            marca: marca.trim() || existing.marca || null,
            modelos_aplicados: modelosAplicados.length
              ? modelosAplicados
              : existing.modelosAplicados ?? [],
            categoria: categoria.trim() || existing.categoria || null,
            fonte: fonte.trim() || existing.fonte || null,
            foto: foto || existing.foto || null,
          })
          .eq("id", existing.id);
        if (error) throw error;
        toast.success(`+${q} un. adicionadas ao item ${codigo}.`);
      } else {
        const { error } = await supabase.from("estoque_itens").insert({
          codigo: codigo.trim(),
          descricao: descricao.trim(),
          quantidade: q,
          localizacao: localizacao.trim(),
          codigo_barras: codigoBarras.trim() || null,
          marca: marca.trim() || null,
          modelos_aplicados: modelosAplicados,
          categoria: categoria.trim() || null,
          fonte: fonte.trim() || null,
          foto: foto || null,
        });
        if (error) throw error;
        toast.success(`Item ${codigo} cadastrado.`);
      }
      await onReload();
      limparCampos();
      setMostrarTeclado(false);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Falha ao salvar item.");
    }
  };

  const remover = async (id: string) => {
    if (!confirm("Remover este item do estoque?")) return;
    const { error } = await supabase.from("estoque_itens").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await onReload();
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
            href={
              fonte.trim() ||
              (codigo
                ? `https://compraparceiros.electrolux.com.br/?q=${encodeURIComponent(codigo)}`
                : "https://compraparceiros.electrolux.com.br/")
            }
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

      {mostrarTeclado && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-slate-900 p-4 shadow-2xl">
            <div className="mb-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Quantidade a cadastrar
              </p>
              <div className="mt-2 rounded-xl bg-slate-950 py-4 text-4xl font-bold text-emerald-300">
                {quantidadeTemp}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => tecladoPressionar(n)}
                  className="rounded-xl bg-white/10 py-4 text-xl font-bold text-white hover:bg-white/20 active:scale-95"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={tecladoLimpar}
                className="rounded-xl bg-amber-500/20 py-4 text-sm font-bold text-amber-200 hover:bg-amber-500/30 active:scale-95"
              >
                C
              </button>
              <button
                type="button"
                onClick={() => tecladoPressionar("0")}
                className="rounded-xl bg-white/10 py-4 text-xl font-bold text-white hover:bg-white/20 active:scale-95"
              >
                0
              </button>
              <button
                type="button"
                onClick={tecladoApagar}
                className="rounded-xl bg-rose-500/20 py-4 text-sm font-bold text-rose-200 hover:bg-rose-500/30 active:scale-95"
              >
                ⌫
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMostrarTeclado(false)}
                className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void salvar(parseInt(quantidadeTemp, 10))}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-3 text-sm font-bold text-slate-900 hover:brightness-110"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
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
  onReload,
}: {
  itens: Item[];
  movs: Movimento[];
  onReload: () => Promise<void>;
}) {
  const [itemId, setItemId] = useState("");
  const [qtd, setQtd] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [os, setOs] = useState("");
  const [modo, setModo] = useState<"dados" | "foto">("dados");
  const [busca, setBusca] = useState("");
  const [analisandoFoto, setAnalisandoFoto] = useState(false);
  const [fotoPreview, setFotoPreview] = useState("");
  const [ultimaIdent, setUltimaIdent] = useState<string>("");
  const identificar = useServerFn(identificarPecaFoto);

  const item = itens.find((i) => i.id === itemId);

  const resultados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return itens;
    return itens.filter(
      (it) =>
        it.codigo.toLowerCase().includes(t) ||
        it.descricao.toLowerCase().includes(t) ||
        it.localizacao.toLowerCase().includes(t) ||
        (it.codigoBarras || "").toLowerCase().includes(t) ||
        (it.marca || "").toLowerCase().includes(t),
    );
  }, [busca, itens]);

  const handleFotoRetirada = async (file: File) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx. 8 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || "");
      setFotoPreview(dataUrl);
      const base64 = dataUrl.split(",")[1] || "";
      const mimeType = file.type || "image/jpeg";
      setAnalisandoFoto(true);
      try {
        const r = await identificar({ data: { base64, mimeType } });
        const codigoRef = (r.codigo || "").toUpperCase().trim();
        const barrasRef = (r.codigoBarras || "").trim();
        setUltimaIdent(
          [codigoRef, barrasRef, r.descricao].filter(Boolean).join(" · "),
        );
        const match = itens.find((it) => {
          const c = it.codigo.toUpperCase();
          const b = (it.codigoBarras || "").trim();
          return (
            (codigoRef && c === codigoRef) ||
            (barrasRef && b && b === barrasRef)
          );
        });
        if (match) {
          setItemId(match.id);
          toast.success(`Peça localizada: ${match.codigo}`);
        } else {
          setItemId("");
          const q = codigoRef || barrasRef || r.descricao || "";
          setBusca(q);
          toast.warning(
            "Peça não encontrada no estoque. Confira a busca por dados.",
          );
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Falha ao analisar a foto.",
        );
      } finally {
        setAnalisandoFoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
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
    if (modo === "dados" && !tecnico.trim()) {
      toast.error("Informe o técnico responsável.");
      return;
    }
    try {
      const { error: upErr } = await supabase
        .from("estoque_itens")
        .update({ quantidade: item.quantidade - q })
        .eq("id", item.id);
      if (upErr) throw upErr;
      const { error: movErr } = await supabase.from("estoque_movimentos").insert({
        item_id: item.id,
        codigo: item.codigo,
        descricao: item.descricao,
        quantidade: q,
        tecnico: tecnico.trim() || (modo === "foto" ? "Retirada por foto" : ""),
        os: os.trim(),
      });
      if (movErr) throw movErr;
      await onReload();
      toast.success(`Retirada registrada: ${q} × ${item.codigo}.`);
      setItemId("");
      setQtd("");
      setOs("");
      setBusca("");
      setFotoPreview("");
      setUltimaIdent("");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Falha ao registrar retirada.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <form
        onSubmit={(e) => void submit(e)}
        className="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-lg font-bold">Registrar retirada</h3>

        <div className="flex gap-2 rounded-lg border border-white/10 bg-slate-950/40 p-1">
          <button
            type="button"
            onClick={() => setModo("dados")}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-bold transition ${
              modo === "dados"
                ? "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <Search className="mr-1 inline h-3.5 w-3.5" /> Por dados
          </button>
          <button
            type="button"
            onClick={() => setModo("foto")}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-bold transition ${
              modo === "foto"
                ? "bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow"
                : "text-slate-300 hover:bg-white/5"
            }`}
          >
            <Camera className="mr-1 inline h-3.5 w-3.5" /> Por foto
          </button>
        </div>

        {modo === "dados" ? (
          <Field label="Buscar peça">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setItemId("");
                }}
                placeholder="Código, descrição, barras, marca…"
                className={`${inputCls} pl-9`}
              />
            </div>
            {busca && !item && (
              <div className="mt-2 max-h-56 space-y-1 overflow-auto rounded-lg border border-white/10 bg-slate-950/60 p-1">
                {resultados.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400">
                    Nenhuma peça encontrada.
                  </div>
                ) : (
                  resultados.slice(0, 20).map((it) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => {
                        setItemId(it.id);
                        setBusca("");
                      }}
                      disabled={it.quantidade <= 0}
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-white/5 disabled:opacity-40"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        <span className="font-mono text-cyan-300">{it.codigo}</span>{" "}
                        <span className="text-white">— {it.descricao}</span>
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 font-bold">
                        {it.quantidade}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </Field>
        ) : (
          <Field label="Localizar por foto">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-fuchsia-400/40 bg-fuchsia-500/5 px-4 py-6 text-center text-xs text-slate-300 hover:bg-fuchsia-500/10">
              {analisandoFoto ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-fuchsia-300" />
                  Analisando…
                </>
              ) : (
                <>
                  <Camera className="h-6 w-6 text-fuchsia-300" />
                  Tirar foto ou selecionar imagem
                </>
              )}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFotoRetirada(f);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
            {fotoPreview && (
              <img
                src={fotoPreview}
                alt=""
                className="mt-2 max-h-32 w-full rounded-md border border-white/10 object-contain bg-black/40"
              />
            )}
            {ultimaIdent && (
              <p className="mt-2 text-[11px] text-slate-400">
                Identificado: <span className="text-slate-200">{ultimaIdent}</span>
              </p>
            )}
          </Field>
        )}

        {item && (
          <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/5 px-3 py-2 text-xs text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-mono text-cyan-300">{item.codigo}</span>
              <button
                type="button"
                onClick={() => setItemId("")}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-0.5 text-white">{item.descricao}</div>
            <div className="mt-1 text-[11px] text-slate-300">
              Disponível:{" "}
              <span className="font-bold text-emerald-300">{item.quantidade}</span>
              {item.localizacao && <> · 📍 {item.localizacao}</>}
            </div>
          </div>
        )}
        {modo === "foto" ? (
          <Field label="Quantidade retirada">
            <input
              type="number"
              min={1}
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
              className={`${inputCls} text-lg font-bold`}
              autoFocus
            />
          </Field>
        ) : (
          <>
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
          </>
        )}
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