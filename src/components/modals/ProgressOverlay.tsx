import { FileDown, Upload, Loader2 } from "lucide-react";

interface ProgressOverlayProps {
  visible: boolean;
  isPrinting?: boolean;
  progressLabel?: string;
}

export default function ProgressOverlay({ visible, isPrinting, progressLabel }: ProgressOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm print:hidden animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(92vw,340px)] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 animate-scale-in">
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-white">
          <div className="rounded-lg bg-white/20 p-2">
            {isPrinting ? <FileDown className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold">
              {isPrinting ? "Gerando arquivo…" : "Lendo arquivo…"}
            </h3>
            <p className="truncate text-[11px] text-white/85">
              {isPrinting
                ? progressLabel || "Preparando PDF para download / impressão"
                : "Extraindo dados do PDF"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-5">
          <Loader2 className="h-6 w-6 shrink-0 animate-spin text-indigo-600" />
          <div className="min-w-0 flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500" />
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              Por favor aguarde, isso leva apenas alguns segundos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
