import { useState, useRef } from "react";
import { Camera, Image as ImageIcon, X, Download } from "lucide-react";
import { fileToCompressedDataUrl, downloadDataUrl } from "@/lib/parecer-extras";

interface PhotoFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function PhotoField({ label, value, onChange }: PhotoFieldProps) {
  const [busy, setBusy] = useState(false);

  const handleFile = async (f: File | null) => {
    if (!f) return;
    setBusy(true);
    try {
      const url = await fileToCompressedDataUrl(f);
      onChange(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 p-2.5 shadow-2xs">
      <div className="mb-2 flex items-center justify-between gap-1">
        <span className="truncate text-[10.5px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          {label}
        </span>
        {value && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => downloadDataUrl(value, label)}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 transition"
              title="Baixar foto"
            >
              <Download className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition"
              title="Remover foto"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {value ? (
        <div className="relative overflow-hidden rounded-lg group">
          <img src={value} alt={label} className="h-24 w-full rounded-lg object-cover" />
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition">
            <span>Trocar foto</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      ) : (
        <label className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-indigo-300 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 px-3 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 active:scale-[0.99] transition">
          {busy ? (
            <span className="animate-pulse text-indigo-600 dark:text-indigo-400">Processando foto...</span>
          ) : (
            <>
              <Camera className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="truncate">Adicionar foto (Câmera / Galeria)</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
        </label>
      )}
    </div>
  );
}
