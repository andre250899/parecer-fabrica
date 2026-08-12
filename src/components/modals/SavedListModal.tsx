import { FolderOpen, Search, X } from "lucide-react";
import type { SavedListRow } from "@/lib/supabase-queries";

const SITUACAO_STYLE: Record<string, { badge: string; dot: string; label: string }> = {
  em_aberto:       { badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",     dot: "bg-amber-500",   label: "Em aberto" },
  concluido:       { badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", dot: "bg-emerald-500", label: "Concluído" },
  realizar_pedido: { badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",             dot: "bg-sky-500",     label: "Realizar pedido" },
  cancelado:       { badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",          dot: "bg-rose-500",    label: "Cancelado" },
};

function tipoBadge(t: string) {
  if (t === "vox")       return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  if (t === "hisense")   return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  if (t === "assurant")  return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
  if (t === "whirlpool") return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300";
  return "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
}

type SituacaoFilter = "" | "concluido" | "em_aberto" | "realizar_pedido" | "cancelado";

interface SavedListModalProps {
  rows: SavedListRow[];
  searchTerm: string;
  situacaoFilter: SituacaoFilter;
  onSearch: (v: string) => void;
  onSituacaoFilter: (v: SituacaoFilter) => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function SavedListModal({
  rows,
  searchTerm,
  situacaoFilter,
  onSearch,
  onSituacaoFilter,
  onOpen,
  onDelete,
  onClose,
}: SavedListModalProps) {
  const situacaoCounts = {
    concluido:       rows.filter((r) => (r.situacao ?? "em_aberto") === "concluido").length,
    em_aberto:       rows.filter((r) => (r.situacao ?? "em_aberto") === "em_aberto").length,
    realizar_pedido: rows.filter((r) => (r.situacao ?? "em_aberto") === "realizar_pedido").length,
    cancelado:       rows.filter((r) => (r.situacao ?? "em_aberto") === "cancelado").length,
  };

  const situacaoFiltered = situacaoFilter
    ? rows.filter((r) => (r.situacao ?? "em_aberto") === situacaoFilter)
    : rows;
  const filteredList = searchTerm.trim()
    ? situacaoFiltered.filter((r) =>
        [r.numero_os, r.cliente_nome ?? "", r.tipo]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()),
      )
    : situacaoFiltered;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 p-0 sm:p-4 backdrop-blur-sm print:hidden animate-fade-in"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] sm:max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2.5">
              <FolderOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Atendimentos salvos</h2>
              <p className="text-xs text-white/70">
                {filteredList.length} {filteredList.length === 1 ? "parecer" : "pareceres"} no total
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-6 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar por Nº OS, Sinistro, cliente ou tipo..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-3 pl-12 pr-4 text-sm shadow-sm placeholder:text-slate-400 dark:text-slate-100 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => onSituacaoFilter("")}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                situacaoFilter === ""
                  ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 shadow"
                  : "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"
              }`}
            >
              Todos <span className="ml-1 opacity-70">({rows.length})</span>
            </button>
            {(["concluido", "em_aberto", "realizar_pedido", "cancelado"] as const).map((s) => {
              const st = SITUACAO_STYLE[s];
              const active = situacaoFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => onSituacaoFilter(active ? "" : s)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                    active
                      ? `${st.badge} ring-2 ring-offset-1 ring-slate-400`
                      : "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                  {st.label} <span className="opacity-70">({situacaoCounts[s]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-700 p-5">
                <FolderOpen className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                Nenhum parecer salvo ainda
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Salve seu primeiro parecer para vê-lo listado aqui.
              </p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-700 p-5">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                Nenhum resultado encontrado
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Não encontramos pareceres para &quot;{searchTerm}&quot;.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 stagger">
              {filteredList.map((row) => {
                const sit = (row.situacao ?? "em_aberto") as keyof typeof SITUACAO_STYLE;
                const st = SITUACAO_STYLE[sit];
                return (
                  <li
                    key={row.id}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-4 shadow-sm transition animate-slide-up hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md"
                  >
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tipoBadge(row.tipo)}`}
                        >
                          {row.tipo}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {new Date(row.updated_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {row.tipo === "assurant" ? "Sinistro" : "OS"} {row.numero_os}
                      </p>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-600 dark:text-slate-300">
                        {row.cliente_nome ?? "Sem cliente informado"}
                      </p>
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${st.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Atualizado {new Date(row.updated_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => onOpen(row.id)}
                        className="flex-1 rounded-lg bg-slate-900 dark:bg-slate-200 px-3 py-2 text-xs font-semibold text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-300"
                      >
                        Abrir
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className="rounded-lg border border-red-200 dark:border-red-800 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        title="Excluir"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
