import { Save } from "lucide-react";

const SITUACAO_STYLE: Record<string, { border: string; bg: string; dot: string; label: string }> = {
  em_aberto:       { border: "border-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/30",    dot: "bg-amber-500",   label: "Em aberto" },
  concluido:       { border: "border-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", dot: "bg-emerald-500", label: "Concluído" },
  realizar_pedido: { border: "border-sky-500",     bg: "bg-sky-50 dark:bg-sky-950/30",         dot: "bg-sky-500",     label: "Realizar pedido" },
  cancelado:       { border: "border-rose-500",    bg: "bg-rose-50 dark:bg-rose-950/30",        dot: "bg-rose-500",    label: "Cancelado" },
};

interface SaveSituacaoModalProps {
  numeroOS: string;
  onSave: (situacao: "em_aberto" | "concluido" | "realizar_pedido" | "cancelado") => void;
  onCancel: () => void;
}

export default function SaveSituacaoModal({ numeroOS, onSave, onCancel }: SaveSituacaoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl animate-scale-in">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Salvar atendimento como…
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Escolha a situação do atendimento OS {numeroOS}.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {(["concluido", "em_aberto", "realizar_pedido", "cancelado"] as const).map((s) => {
            const st = SITUACAO_STYLE[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSave(s)}
                className={`flex min-h-14 w-full items-center justify-between rounded-lg border-2 ${st.border} ${st.bg} px-4 py-3 text-left transition hover:brightness-95 active:brightness-90`}
              >
                <span className="pointer-events-none flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${st.dot}`} />
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {st.label}
                  </span>
                </span>
                <Save className="pointer-events-none h-4 w-4 text-slate-500" />
              </button>
            );
          })}
        </div>
        <button
          onClick={onCancel}
          className="mt-4 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
