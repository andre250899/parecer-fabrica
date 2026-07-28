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
  precoSugerido?: string;
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
  const [quantidade, setQuantidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim() || !descricao.trim()) {
      toast.error("Informe código e descrição.");
      return;
    }
    const q = parseInt(quantidade, 10) || 0;
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
        },
        ...itens,
      ];
      toast.success(`Item ${codigo} cadastrado.`);
    }
    onSave(next);
    setCodigo("");
    setDescricao("");
    setQuantidade("");
    setLocalizacao("");
  };

  const remover = (id: string) => {
    if (!confirm("Remover este item do estoque?")) return;
    onSave(itens.filter((it) => it.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <form
        onSubmit={submit}
        className="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-lg font-bold">Novo item</h3>
        <p className="text-xs text-slate-400">
          Se o código já existir, a quantidade será somada ao estoque atual.
        </p>
        <Field label="Código">
          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            className={inputCls}
            placeholder="Ex.: W10820038"
          />
        </Field>
        <Field label="Descrição">
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={inputCls}
            placeholder="Ex.: Placa de potência"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Quantidade">
            <input
              type="number"
              min={0}
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className={inputCls}
              placeholder="0"
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
        </div>
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
                <div className="min-w-0">
                  <div className="text-xs font-mono text-cyan-300">{it.codigo}</div>
                  <div className="truncate text-sm text-white">{it.descricao}</div>
                  {it.localizacao && (
                    <div className="text-[11px] text-slate-500">📍 {it.localizacao}</div>
                  )}
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