import { Save, X } from "lucide-react";

interface LeaveGuardModalProps {
  message: string;
  hasOS: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

export default function LeaveGuardModal({
  message,
  hasOS,
  onSave,
  onDiscard,
  onCancel,
}: LeaveGuardModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm print:hidden animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
          <div className="rounded-lg bg-white/20 p-2">
            <Save className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Alterações não salvas</h3>
            <p className="text-[11px] text-white/85">Proteja seu trabalho antes de sair</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-slate-700 dark:text-slate-200">{message}</p>
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={() => {
                if (!hasOS) return;
                onSave();
              }}
              disabled={!hasOS}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> Salvar agora
            </button>
            <button
              onClick={onDiscard}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white dark:bg-slate-700 dark:border-red-800 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <X className="h-4 w-4" /> Descartar alterações e sair
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
            >
              Continuar editando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
