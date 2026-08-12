import type { ParecerData, OrcamentoItem } from "@/lib/parecer-types";

interface VoxFormProps {
  data: ParecerData;
  setData: React.Dispatch<React.SetStateAction<ParecerData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}

export default function VoxForm({ data, setData, inputCls, labelCls, formatDate }: VoxFormProps) {
  const upd = <K extends keyof ParecerData>(k: K, v: ParecerData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const updDate = (k: "dataEntrada" | "dataParecer", raw: string) =>
    upd(k, formatDate(raw) as ParecerData[typeof k]);

  const updItem = (i: number, k: keyof OrcamentoItem, v: string) =>
    setData((d) => {
      const itens = [...d.itens];
      itens[i] = { ...itens[i], [k]: v };
      return { ...d, itens };
    });

  const addItem = () =>
    setData((d) => ({
      ...d,
      itens: [...d.itens, { codigo: "", descricao: "", qtde: "", valorUnit: "" }],
    }));

  const removeItem = (i: number) =>
    setData((d) => ({ ...d, itens: d.itens.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Ordem de Serviço
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Nº OS</label>
            <input className={inputCls} value={data.numeroOS} onChange={(e) => upd("numeroOS", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Data de Entrada</label>
            <input className={inputCls} value={data.dataEntrada} onChange={(e) => updDate("dataEntrada", e.target.value)} placeholder="DD/MM/AAAA" inputMode="numeric" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Cliente
        </h2>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Nome</label>
            <input className={inputCls} value={data.clienteNome} onChange={(e) => upd("clienteNome", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>CPF</label>
              <input className={inputCls} value={data.clienteCPF} onChange={(e) => upd("clienteCPF", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Telefone</label>
              <input className={inputCls} value={data.clienteTelefone} onChange={(e) => upd("clienteTelefone", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Endereço</label>
            <input className={inputCls} value={data.clienteEndereco} onChange={(e) => upd("clienteEndereco", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2.5 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Equipamento
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Produto</label><input className={inputCls} value={data.equipProduto} onChange={(e) => upd("equipProduto", e.target.value)} /></div>
          <div><label className={labelCls}>Marca</label><input className={inputCls} value={data.equipMarca} onChange={(e) => upd("equipMarca", e.target.value)} /></div>
          <div><label className={labelCls}>Modelo</label><input className={inputCls} value={data.equipModelo} onChange={(e) => upd("equipModelo", e.target.value)} /></div>
          <div><label className={labelCls}>Nº de Série</label><input className={inputCls} value={data.equipSerie} onChange={(e) => upd("equipSerie", e.target.value)} /></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Defeito Alegado pelo Cliente
        </h2>
        <textarea rows={3} className={inputCls} value={data.defeito} onChange={(e) => upd("defeito", e.target.value)} />
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Parecer Técnico & Serviço
        </h2>
        <textarea rows={4} className={inputCls} value={data.parecer} onChange={(e) => upd("parecer", e.target.value)} />
        <label className={labelCls + " mt-3"}>Serviço</label>
        <input className={inputCls} value={data.servico} onChange={(e) => upd("servico", e.target.value)} />
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Orçamento
          </h2>
          <button onClick={addItem} className="rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white px-2.5 py-1 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition">
            + Item
          </button>
        </div>
        <div className="space-y-3">
          {data.itens.map((it, i) => (
            <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Item #{i + 1}</span>
                {data.itens.length > 1 && (
                  <button onClick={() => removeItem(i)} className="text-xs font-bold text-rose-600 hover:underline">
                    Remover
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Código" className={inputCls} value={it.codigo} onChange={(e) => updItem(i, "codigo", e.target.value)} />
                <input placeholder="Qtde" className={inputCls} value={it.qtde} onChange={(e) => updItem(i, "qtde", e.target.value)} />
                <input placeholder="Descrição" className={inputCls + " col-span-2"} value={it.descricao} onChange={(e) => updItem(i, "descricao", e.target.value)} />
                <input placeholder="Valor unitário" className={inputCls + " col-span-2"} value={it.valorUnit} onChange={(e) => updItem(i, "valorUnit", e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 shadow-2xs">
        <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Observações & Condições
        </h2>
        <textarea rows={3} className={inputCls} value={data.observacoes} onChange={(e) => upd("observacoes", e.target.value)} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Validade</label>
            <input className={inputCls} value={data.validadeDias} onChange={(e) => upd("validadeDias", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Data</label>
            <input className={inputCls} value={data.dataParecer} onChange={(e) => updDate("dataParecer", e.target.value)} placeholder="DD/MM/AAAA" inputMode="numeric" />
          </div>
        </div>
        <label className={labelCls + " mt-3"}>Garantia</label>
        <input className={inputCls} value={data.garantia} onChange={(e) => upd("garantia", e.target.value)} />
        <label className={labelCls + " mt-3"}>Responsável Técnico</label>
        <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
      </section>
    </div>
  );
}
