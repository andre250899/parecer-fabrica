import { useState } from "react";
import { Upload } from "lucide-react";

interface AgendaDropZoneProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
  onDrop: (id: string) => void;
  onPdfDrop?: (file: File) => void;
}

export default function AgendaDropZone({
  title,
  icon,
  count,
  children,
  onDrop,
  onPdfDrop,
}: AgendaDropZoneProps) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = Array.from(e.dataTransfer.files || []).find(
          (f) => f.type.includes("pdf") || f.name.toLowerCase().endsWith(".pdf"),
        );
        if (file) {
          onPdfDrop?.(file);
          return;
        }
        const raw = e.dataTransfer.getData("text/plain");
        const id = raw.startsWith("atendimento:") ? raw.slice("atendimento:".length) : "";
        if (id) onDrop(id);
      }}
      className={`rounded-xl border-2 p-4 shadow-sm transition ${
        dragOver
          ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
          {icon} {title}
        </h2>
        <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {count}
        </span>
      </div>
      <div className="space-y-3">{children}</div>

      {/* PDF drop hint */}
      {onPdfDrop && count === 0 && (
        <label
          className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600 p-3 text-xs text-slate-400 transition hover:border-slate-400 dark:hover:border-slate-400 hover:text-slate-600"
          onDragOver={(e) => e.stopPropagation()}
        >
          <Upload className="h-4 w-4" />
          <span>Solte um PDF de OS aqui</span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPdfDrop(f);
              e.target.value = "";
            }}
          />
        </label>
      )}
    </section>
  );
}
