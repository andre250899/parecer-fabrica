import { useRef, useState } from "react";
import { fileToCompressedDataUrl } from "@/lib/parecer-extras";

export default function AttachmentField({
  label,
  value,
  onChange,
  accent = "emerald",
}: {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  accent?: "emerald" | "blue";
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);

  const accentBorder = accent === "blue" ? "border-blue-400" : "border-emerald-400";
  const accentBg = accent === "blue" ? "bg-blue-50" : "bg-emerald-50";
  const accentText = accent === "blue" ? "text-blue-700" : "text-emerald-700";
  const accentBtn =
    accent === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700";

  const load = async (file: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const isImg = file.type.startsWith("image/");
      if (isImg) {
        const url = await fileToCompressedDataUrl(file, 1400, 0.78);
        onChange(url);
      } else {
        // Non-image (e.g. PDF): store as data URL
        const reader = new FileReader();
        const url = await new Promise<string>((res, rej) => {
          reader.onload = () => res(reader.result as string);
          reader.onerror = () => rej(reader.error);
          reader.readAsDataURL(file);
        });
        onChange(url);
      }
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void load(file);
  };

  const isImage = value.startsWith("data:image/");
  const isPdf = value.startsWith("data:application/pdf");

  return (
    <div className={`rounded-lg border-2 border-dashed ${accentBorder} ${accentBg} p-3`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-wide ${accentText}`}>{label}</span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Remover
          </button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`relative flex min-h-32 items-center justify-center rounded-md bg-white p-2 text-center text-xs text-slate-500 transition ${
          drag ? "ring-2 ring-offset-1 " + (accent === "blue" ? "ring-blue-500" : "ring-emerald-500") : ""
        }`}
      >
        {busy ? (
          <span>Processando arquivo...</span>
        ) : value ? (
          isImage ? (
            <img src={value} alt={label} className="max-h-48 rounded object-contain" />
          ) : isPdf ? (
            <a href={value} target="_blank" rel="noreferrer" className="font-semibold text-blue-700 underline">
              Abrir PDF anexado
            </a>
          ) : (
            <a href={value} target="_blank" rel="noreferrer" className="font-semibold text-slate-700 underline">
              Abrir arquivo anexado
            </a>
          )
        ) : (
          <span>Arraste um arquivo aqui, tire uma foto ou escolha do dispositivo</span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className={`rounded-md px-3 py-1 text-xs font-semibold text-white ${accentBtn}`}
        >
          📷 Câmera
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          📎 Escolher arquivo
        </button>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void load(f);
            e.target.value = "";
          }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void load(f);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}