import { useEffect, useRef, useState } from "react";

export default function SignaturePad({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [empty, setEmpty] = useState(!value);
  const [saved, setSaved] = useState(false);
  const [locked, setLocked] = useState(!!value);
  const [enabled, setEnabled] = useState(false);

  // Initialize canvas resolution + load existing signature
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1d4ed8";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = value;
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (locked || !enabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (empty) setEmpty(false);
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    if (locked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setEmpty(true);
    setSaved(false);
    onChange("");
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || empty) return;
    onChange(canvas.toDataURL("image/png"));
    setSaved(true);
    setLocked(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const edit = () => {
    setLocked(false);
    setSaved(false);
    setEnabled(false);
  };

  return (
    <div>
      <div className="relative rounded-md border border-slate-300 bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
          className={`block h-40 w-full touch-none rounded-md ${locked || !enabled ? "cursor-not-allowed" : ""}`}
          style={{ touchAction: "none" }}
        />
        {locked && (
          <span className="pointer-events-none absolute right-2 top-2 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            Bloqueada
          </span>
        )}
        {empty && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-slate-400">
            {enabled ? "Assine aqui usando o dedo ou o mouse" : "Clique em \"Habilitar assinatura\" para assinar"}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        {saved && <span className="text-xs font-medium text-emerald-600">Assinatura salva</span>}
        {locked ? (
          <button
            type="button"
            onClick={edit}
            className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-blue-700"
          >
            Editar assinatura
          </button>
        ) : (
          <>
        {!enabled ? (
          <button
            type="button"
            onClick={() => setEnabled(true)}
            className="rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-600"
          >
            Habilitar assinatura
          </button>
        ) : (
          <button
            type="button"
            onClick={save}
            disabled={empty}
            className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Salvar assinatura
          </button>
        )}
        <button
          type="button"
          onClick={clear}
          disabled={!enabled}
          className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpar assinatura
        </button>
          </>
        )}
      </div>
    </div>
  );
}