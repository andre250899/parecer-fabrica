import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ParecerPreview from "@/components/ParecerPreview";
import {
  THEMES,
  defaultParecer,
  emptyItem,
  type ParecerData,
  type OrcamentoItem,
} from "@/lib/parecer-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "description", content: "Gere pareceres técnicos profissionais com 6 opções de design e exporte para PDF." },
      { property: "og:title", content: "Gerador de Parecer Técnico" },
      { property: "og:description", content: "Crie pareceres técnicos com múltiplos designs e imprima em PDF." },
    ],
  }),
  component: Index,
});

function Index() {
  const [data, setData] = useState<ParecerData>(defaultParecer);
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  const upd = <K extends keyof ParecerData>(k: K, v: ParecerData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const updItem = (i: number, k: keyof OrcamentoItem, v: string) =>
    setData((d) => {
      const itens = [...d.itens];
      itens[i] = { ...itens[i], [k]: v };
      return { ...d, itens };
    });

  const addItem = () => setData((d) => ({ ...d, itens: [...d.itens, emptyItem()] }));
  const removeItem = (i: number) =>
    setData((d) => ({ ...d, itens: d.itens.filter((_, idx) => idx !== i) }));

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Gerador de Parecer Técnico</h1>
            <p className="text-xs text-slate-500">Vox Grupo · Assistência Técnica</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => window.print()}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Imprimir / PDF
            </button>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-2 text-xs text-slate-600">
          <span className="font-semibold">Design ativo:</span> {theme.name} — {theme.description}
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-6 lg:grid-cols-[420px_1fr] print:block print:p-0">
        {/* FORM */}
        <aside className="space-y-6 rounded-lg border border-border bg-white p-5 shadow-sm print:hidden">
          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Ordem de Serviço</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Nº OS</label>
                <input className={inputCls} value={data.numeroOS} onChange={(e) => upd("numeroOS", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Data de Entrada</label>
                <input className={inputCls} value={data.dataEntrada} onChange={(e) => upd("dataEntrada", e.target.value)} placeholder="DD/MM/AAAA" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Cliente</h2>
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

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Equipamento</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Produto</label>
                <input className={inputCls} value={data.equipProduto} onChange={(e) => upd("equipProduto", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Marca</label>
                <input className={inputCls} value={data.equipMarca} onChange={(e) => upd("equipMarca", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Modelo</label>
                <input className={inputCls} value={data.equipModelo} onChange={(e) => upd("equipModelo", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nº de Série</label>
                <input className={inputCls} value={data.equipSerie} onChange={(e) => upd("equipSerie", e.target.value)} />
              </div>
            </div>
          </section>

          <section>
            <label className={labelCls}>Defeito Alegado pelo Cliente</label>
            <textarea rows={3} className={inputCls} value={data.defeito} onChange={(e) => upd("defeito", e.target.value)} />
          </section>

          <section>
            <label className={labelCls}>Parecer Técnico</label>
            <textarea rows={4} className={inputCls} value={data.parecer} onChange={(e) => upd("parecer", e.target.value)} />
            <label className={labelCls + " mt-3"}>Serviço</label>
            <input className={inputCls} value={data.servico} onChange={(e) => upd("servico", e.target.value)} />
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Orçamento</h2>
              <button onClick={addItem} className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold hover:bg-slate-100">
                + Item
              </button>
            </div>
            <div className="space-y-3">
              {data.itens.map((it, i) => (
                <div key={i} className="rounded-md border border-slate-200 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">Item #{i + 1}</span>
                    {data.itens.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-xs text-red-600 hover:underline">
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

          <section>
            <label className={labelCls}>Observações</label>
            <textarea rows={3} className={inputCls} value={data.observacoes} onChange={(e) => upd("observacoes", e.target.value)} />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Validade</label>
                <input className={inputCls} value={data.validadeDias} onChange={(e) => upd("validadeDias", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Data</label>
                <input className={inputCls} value={data.dataParecer} onChange={(e) => upd("dataParecer", e.target.value)} placeholder="DD/MM/AAAA" />
              </div>
            </div>
            <label className={labelCls + " mt-3"}>Garantia</label>
            <input className={inputCls} value={data.garantia} onChange={(e) => upd("garantia", e.target.value)} />
            <label className={labelCls + " mt-3"}>Responsável Técnico</label>
            <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
          </section>
        </aside>

        {/* PREVIEW */}
        <main className="overflow-x-auto">
          <ParecerPreview data={data} theme={theme} />
        </main>
      </div>
    </div>
  );
}
