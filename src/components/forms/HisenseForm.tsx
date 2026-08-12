import type { HisenseData } from "@/lib/parecer-extras";
import PhotoField from "./PhotoField";

interface HisenseFormProps {
  data: HisenseData;
  setData: React.Dispatch<React.SetStateAction<HisenseData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}

export default function HisenseForm({ data, setData, inputCls, labelCls, formatDate }: HisenseFormProps) {
  const upd = <K extends keyof HisenseData>(k: K, v: HisenseData[K]) =>
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
          Identificação
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Nº OS</label><input className={inputCls} value={data.numeroOS} onChange={(e) => upd("numeroOS", e.target.value)} /></div>
          <div><label className={labelCls}>Assistência Téc.</label><input className={inputCls} value={data.assistenciaTec} onChange={(e) => upd("assistenciaTec", e.target.value)} /></div>
          <div className="col-span-2"><label className={labelCls}>Nome do Cliente</label><input className={inputCls} value={data.clienteNome} onChange={(e) => upd("clienteNome", e.target.value)} /></div>
          <div><label className={labelCls}>Modelo do Prod.</label><input className={inputCls} value={data.modeloProduto} onChange={(e) => upd("modeloProduto", e.target.value)} /></div>
          <div><label className={labelCls}>Nº de Série</label><input className={inputCls} value={data.numeroSerie} onChange={(e) => upd("numeroSerie", e.target.value)} /></div>
          <div><label className={labelCls}>ART ou Batch</label><input className={inputCls} value={data.artBatch} onChange={(e) => upd("artBatch", e.target.value)} /></div>
          <div>
            <label className={labelCls}>Marca</label>
            <select className={inputCls} value={data.marcaProduto} onChange={(e) => upd("marcaProduto", e.target.value as "gorenje" | "hisense")}>
              <option value="hisense">Hisense</option>
              <option value="gorenje">Gorenje</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Análise Técnica
        </h2>
        <label className={labelCls}>Defeito Relatado pelo Cliente</label>
        <textarea rows={3} className={inputCls} value={data.defeitoRelatado} onChange={(e) => upd("defeitoRelatado", e.target.value)} />
        <label className={labelCls + " mt-3"}>Diagnóstico Técnico</label>
        <textarea rows={3} className={inputCls} value={data.diagnosticoTec} onChange={(e) => upd("diagnosticoTec", e.target.value)} />
        <label className={labelCls + " mt-3"}>Instalação Correta? (irregularidades)</label>
        <textarea rows={2} className={inputCls} value={data.instalacaoCorreta} onChange={(e) => upd("instalacaoCorreta", e.target.value)} />
        <label className={labelCls + " mt-3"}>Peças Necessárias para Reparo</label>
        <textarea rows={2} className={inputCls} value={data.pecasNecessarias} onChange={(e) => upd("pecasNecessarias", e.target.value)} />
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Fotos (8)</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.fotos.map((f, i) => (
            <PhotoField key={i} label={f.legenda} value={f.dataUrl} onChange={(v) => updFoto(i, v)} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Tensão (Volts)</h2>
        <div className="grid grid-cols-3 gap-2">
          <div><label className={labelCls}>F1+F2</label><input className={inputCls} value={data.tensaoF1F2} onChange={(e) => upd("tensaoF1F2", e.target.value)} /></div>
          <div><label className={labelCls}>F1+Terra</label><input className={inputCls} value={data.tensaoF1Terra} onChange={(e) => upd("tensaoF1Terra", e.target.value)} /></div>
          <div><label className={labelCls}>F2+Terra</label><input className={inputCls} value={data.tensaoF2Terra} onChange={(e) => upd("tensaoF2Terra", e.target.value)} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Anotações Técnicas</label>
        <textarea rows={3} className={inputCls} value={data.anotacoes} onChange={(e) => upd("anotacoes", e.target.value)} />
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
