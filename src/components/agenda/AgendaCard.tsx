import { useState } from "react";
import {
  GripVertical,
  FileText,
  Trash2,
  Clock,
  Tag,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

const SITUACAO_STYLE: Record<string, { border: string; bg: string; badge: string; dot: string; label: string }> = {
  em_aberto:       { border: "border-amber-400 dark:border-amber-500",   bg: "bg-amber-50/80 dark:bg-amber-950/25",    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",       dot: "bg-amber-500",   label: "Em aberto" },
  concluido:       { border: "border-emerald-500",                       bg: "bg-emerald-50/80 dark:bg-emerald-950/25", badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300", dot: "bg-emerald-500", label: "Concluído" },
  realizar_pedido: { border: "border-sky-500",                           bg: "bg-sky-50/80 dark:bg-sky-950/25",         badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",               dot: "bg-sky-500",     label: "Realizar pedido" },
  cancelado:       { border: "border-rose-500",                          bg: "bg-rose-50/80 dark:bg-rose-950/25",        badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",           dot: "bg-rose-500",    label: "Cancelado" },
};

export interface AgendaCardRow {
  id: string;
  numero_os: string;
  cliente_nome: string | null;
  status: string;
  data_agenda: string | null;
  periodo: string | null;
  dados: unknown;
  situacao?: string | null;
}

interface AgendaCardProps {
  row: AgendaCardRow;
  draggable?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUnschedule?: () => void;
  onMoveToDate?: (isoDate: string) => void;
  onUpdateTag?: (tag: string) => void;
  onDragStart?: () => void;
}

export default function AgendaCard({
  row,
  onEdit,
  onDelete,
  onUnschedule,
  onMoveToDate,
  onUpdateTag,
}: AgendaCardProps) {
  const dados =
    (row.dados as {
      consumidor?: string;
      endereco?: string;
      bairro?: string;
      cidade?: string;
      produto?: string;
      tagAgenda?: string;
    }) ?? {};

  const sit = (row.situacao || "em_aberto") as keyof typeof SITUACAO_STYLE;
  const st = SITUACAO_STYLE[sit] ?? SITUACAO_STYLE.em_aberto;
  const [dateOpen, setDateOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [tagDraft, setTagDraft] = useState(dados.tagAgenda ?? "");
  const tagAtual = (dados.tagAgenda ?? "").trim();

  const currentDate = row.data_agenda
    ? (() => {
        const [y, m, d] = row.data_agenda!.split("-").map(Number);
        return new Date(y, (m || 1) - 1, d || 1);
      })()
    : undefined;

  return (
    <div
      className={`group rounded-xl border-l-4 ${st.border} border-y border-r border-slate-200/80 dark:border-slate-700/80 ${st.bg} p-3.5 shadow-2xs transition-all hover:shadow-md active:scale-[0.99] animate-slide-up`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            draggable={false}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit();
            }}
            title="Abrir para edição"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-slate-900 dark:bg-slate-200 px-2 py-1 text-[11px] font-extrabold text-white dark:text-slate-900 shadow-2xs transition hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-slate-950 active:scale-95"
          >
            <span>OS {row.numero_os}</span>
            <FileText className="h-3 w-3" />
          </button>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-wider ${st.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {onUpdateTag && (
            <Popover
              open={tagOpen}
              onOpenChange={(o) => {
                setTagOpen(o);
                if (o) setTagDraft(dados.tagAgenda ?? "");
              }}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  draggable={false}
                  onMouseDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  title={tagAtual ? `Observação: ${tagAtual}` : "Adicionar observação"}
                  aria-label="Adicionar observação"
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    tagAtual
                      ? "text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/40"
                      : "text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800"
                  } active:scale-95 transition`}
                >
                  <Tag className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-3.5 pointer-events-auto shadow-xl rounded-xl">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Observação da agenda
                </div>
                <textarea
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  placeholder="Ex.: Atendimento prioritário, ligar antes..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <div className="mt-2.5 flex justify-between gap-2">
                  {tagAtual ? (
                    <button
                      type="button"
                      onClick={() => {
                        setTagOpen(false);
                        onUpdateTag("");
                      }}
                      className="rounded-lg px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      Remover
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setTagOpen(false);
                      onUpdateTag(tagDraft.trim());
                    }}
                    className="rounded-lg bg-amber-500 px-3.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-amber-600 active:scale-95"
                  >
                    Salvar
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {onMoveToDate && (
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  draggable={false}
                  onMouseDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  title="Transferir para outra data"
                  aria-label="Transferir para outra data"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-800 active:scale-95 transition"
                >
                  <Clock className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0 pointer-events-auto shadow-xl rounded-xl">
                <div className="border-b border-slate-100 dark:border-slate-700 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Transferir atendimento
                </div>
                <CalendarUI
                  mode="single"
                  selected={currentDate}
                  onSelect={(d) => {
                    if (!d) return;
                    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                    setDateOpen(false);
                    onMoveToDate(iso);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
                {onUnschedule && (
                  <button
                    type="button"
                    onClick={() => {
                      setDateOpen(false);
                      onUnschedule();
                    }}
                    className="w-full border-t border-slate-100 dark:border-slate-700 px-3.5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Mover para Não agendados
                  </button>
                )}
              </PopoverContent>
            </Popover>
          )}

          <button
            type="button"
            onClick={onDelete}
            title="Excluir"
            aria-label="Excluir"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 active:scale-95 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
        {dados.consumidor || row.cliente_nome || "Sem consumidor"}
      </p>

      {tagAtual && (
        <div className="mt-1.5 flex items-start gap-1 rounded-md border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 text-[10.5px] font-bold uppercase leading-tight tracking-wide text-amber-800 dark:text-amber-300">
          <Tag className="mt-0.5 h-3 w-3 shrink-0" />
          <span className="break-words">{tagAtual}</span>
        </div>
      )}

      {dados.endereco && (
        <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
          {dados.endereco}
        </p>
      )}

      {(dados.bairro || dados.cidade) && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
          {dados.bairro} {dados.cidade && `· ${dados.cidade}`}
        </p>
      )}

      {dados.produto && (
        <p className="mt-1.5 text-[10.5px] font-bold uppercase text-indigo-600 dark:text-indigo-400 line-clamp-1">
          {dados.produto}
        </p>
      )}
    </div>
  );
}
