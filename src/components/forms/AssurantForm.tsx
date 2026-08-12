import type { AssurantData } from "@/lib/parecer-extras";
import PhotoField from "./PhotoField";

interface AssurantFormProps {
  data: AssurantData;
  setData: React.Dispatch<React.SetStateAction<AssurantData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}

export default function AssurantForm({ data, setData, inputCls, labelCls, formatDate }: AssurantFormProps) {
  const upd = <K extends keyof AssurantData>(k: K, v: AssurantData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const updFoto = (i: number, v: string) =>
    setData((d) => ({
      ...d,
      fotos: d.fotos.map((f, idx) => (idx === i ? { ...f, dataUrl: v } : f)),
    }));

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Ordem de Serviço
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Sinistro</label><input className={inputCls} value={data.sinistro} onChange={(e) => upd("sinistro", e.target.value)} /></div>
          <div><label className={labelCls}>Assistência</label><input className={inputCls} value={data.assistencia} onChange={(e) => upd("assistencia", e.target.value)} /></div>
          <div><label className={labelCls}>CNPJ</label><input className={inputCls} value={data.cnpj} onChange={(e) => upd("cnpj", e.target.value)} /></div>
          <div><label className={labelCls}>Serial</label><input className={inputCls} value={data.serial} onChange={(e) => upd("serial", e.target.value)} /></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Produto
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Marca</label><input className={inputCls} value={data.produtoMarca} onChange={(e) => upd("produtoMarca", e.target.value)} /></div>
          <div><label className={labelCls}>Modelo</label><input className={inputCls} value={data.produtoModelo} onChange={(e) => upd("produtoModelo", e.target.value)} /></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Parecer Técnico após Análise
        </h2>
        <textarea rows={4} className={inputCls} value={data.parecerTecnico} onChange={(e) => upd("parecerTecnico", e.target.value)} />
        <label className={labelCls + " mt-3"}>Peça que Necessita ser Trocada e Motivo</label>
        <textarea rows={2} className={inputCls} value={data.pecaTrocar} onChange={(e) => upd("pecaTrocar", e.target.value)} />
        <label className={labelCls + " mt-3"}>Motivo</label>
        <input className={inputCls} value={data.motivo} onChange={(e) => upd("motivo", e.target.value)} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Forma de Atendimento</label><input className={inputCls} value={data.formaAtendimento} onChange={(e) => upd("formaAtendimento", e.target.value)} /></div>
          <div><label className={labelCls}>Produto Coletado?</label><input className={inputCls} value={data.produtoColetado} onChange={(e) => upd("produtoColetado", e.target.value)} /></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Fotos do Defeito (4) & Cotações
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.fotos.map((f, i) => (
            <PhotoField key={i} label={f.legenda} value={f.dataUrl} onChange={(v) => updFoto(i, v)} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <PhotoField
            label="Cotação 1 (30 dias)"
            value={data.cotacaoImgs[0] ?? ""}
            onChange={(v) => upd("cotacaoImgs", [v, data.cotacaoImgs[1] ?? ""])}
          />
          <PhotoField
            label="Cotação 2 (30 dias)"
            value={data.cotacaoImgs[1] ?? ""}
            onChange={(v) => upd("cotacaoImgs", [data.cotacaoImgs[0] ?? "", v])}
          />
        </div>
        <div className="mt-3">
          <PhotoField
            label="Foto Residência do Segurado"
            value={data.residenciaImg}
            onChange={(v) => upd("residenciaImg", v)}
          />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Encerramento</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Cidade</label><input className={inputCls} value={data.cidade} onChange={(e) => upd("cidade", e.target.value)} /></div>
          <div><label className={labelCls}>Data</label><input className={inputCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataParecer} onChange={(e) => upd("dataParecer", formatDate(e.target.value))} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Técnico Responsável</label>
        <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
      </section>
    </div>
  );
}
