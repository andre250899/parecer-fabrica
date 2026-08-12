import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { WhirlpoolData, WhirlpoolPeca } from "@/lib/parecer-extras";
import AttachmentField from "@/components/AttachmentField";
import SignaturePad from "@/components/SignaturePad";

// ─── BRL helpers ──────────────────────────────────────────────
function parseBRLNumber(raw: string): number {
  if (!raw) return 0;
  const cleaned = String(raw).replace(/[^\d,.-]/g, "").trim();
  if (!cleaned) return 0;
  let normalized = cleaned;
  if (cleaned.includes(",") && cleaned.includes(".")) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (cleaned.includes(",")) {
    normalized = cleaned.replace(",", ".");
  }
  const n = parseFloat(normalized);
  return isNaN(n) ? 0 : n;
}

function toBRL(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatBRLLive(raw: string): string {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";
  const n = parseInt(digits, 10) / 100;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatBRLInput(raw: string): string {
  if (!raw) return "";
  const cleaned = String(raw).replace(/[^\d,.-]/g, "").trim();
  if (!cleaned) return "";
  let normalized = cleaned;
  if (cleaned.includes(",") && cleaned.includes(".")) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (cleaned.includes(",")) {
    normalized = cleaned.replace(",", ".");
  }
  const n = parseFloat(normalized);
  if (isNaN(n)) return raw;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcularTotaisWhirlpool(data: WhirlpoolData): WhirlpoolData {
  const pecas = Array.isArray(data.pecas) ? data.pecas : [];
  const totalPecasNum = pecas.reduce((sum, p) => sum + parseBRLNumber(p.valor), 0);
  const maoNum = parseBRLNumber(data.maoDeObra);
  const totalOrc = totalPecasNum + maoNum;
  return {
    ...data,
    totalPecas: totalPecasNum > 0 ? toBRL(totalPecasNum) : "",
    totalOrcamento: totalOrc > 0 ? toBRL(totalOrc) : "",
    valorOrcamento: totalOrc > 0 ? toBRL(totalOrc) : "",
  };
}

const ADMIN_PASSWORD = "V271088";

interface WhirlpoolFormProps {
  data: WhirlpoolData;
  setData: React.Dispatch<React.SetStateAction<WhirlpoolData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}

export default function WhirlpoolForm({ data, setData, inputCls, labelCls, formatDate }: WhirlpoolFormProps) {
  const [advanced, setAdvanced] = useState(false);

  const upd = <K extends keyof WhirlpoolData>(k: K, v: WhirlpoolData[K]) =>
    setData((d) => calcularTotaisWhirlpool({ ...d, [k]: v }));

  const updPeca = (i: number, k: keyof WhirlpoolPeca, v: string) =>
    setData((d) => {
      const pecas = [...d.pecas];
      pecas[i] = { ...pecas[i], [k]: v };
      return calcularTotaisWhirlpool({ ...d, pecas });
    });

  const addPeca = () =>
    setData((d) =>
      calcularTotaisWhirlpool({
        ...d,
        pecas: [...d.pecas, { quantidade: "", codigo: "", descricao: "", fcta: "", ocor: "", valor: "" }],
      }),
    );

  const removePeca = (i: number) =>
    setData((d) => calcularTotaisWhirlpool({ ...d, pecas: d.pecas.filter((_, idx) => idx !== i) }));

  // Auto-calcular totais quando peças ou mão de obra mudam
  useEffect(() => {
    const calculated = calcularTotaisWhirlpool(data);
    if (
      data.totalPecas !== calculated.totalPecas ||
      data.totalOrcamento !== calculated.totalOrcamento ||
      data.valorOrcamento !== calculated.valorOrcamento
    ) {
      setData((d) => calcularTotaisWhirlpool(d));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.pecas, data.maoDeObra]);

  const toggleAdvanced = () => {
    if (advanced) {
      setAdvanced(false);
      toast.info("Edição avançada bloqueada.");
      return;
    }
    const pwd = window.prompt("Digite a senha de administrador:");
    if (pwd === null) return;
    if (pwd === ADMIN_PASSWORD) {
      setAdvanced(true);
      toast.success("Edição avançada liberada.");
    } else {
      toast.error("Senha incorreta.");
    }
  };

  const lockCls = advanced
    ? inputCls
    : `${inputCls} bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed`;

  return (
    <>
      {/* Modo avançado toggle */}
      <div className="flex items-center justify-between rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
        <div className="text-xs text-amber-900 dark:text-amber-300">
          <strong>Modo:</strong>{" "}
          {advanced ? (
            <span className="text-emerald-700 dark:text-emerald-400">Edição avançada (todos os campos)</span>
          ) : (
            <span>Edição básica (campos limitados)</span>
          )}
        </div>
        <button
          onClick={toggleAdvanced}
          className={`rounded-md px-3 py-1 text-xs font-semibold ${
            advanced
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          {advanced ? "Bloquear edição" : "Edição avançada"}
        </button>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Ordem de Serviço</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Nº OS</label><input disabled={!advanced} className={lockCls} value={data.numeroOS} onChange={(e) => upd("numeroOS", e.target.value)} /></div>
          <div><label className={labelCls}>Técnico</label><input className={inputCls} value={data.tecnico} onChange={(e) => upd("tecnico", e.target.value)} /></div>
          <div><label className={labelCls}>Data Agenda</label><input disabled={!advanced} className={lockCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataAgenda} onChange={(e) => upd("dataAgenda", formatDate(e.target.value))} /></div>
          <div><label className={labelCls}>Data Chamado</label><input disabled={!advanced} className={lockCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataChamado} onChange={(e) => upd("dataChamado", formatDate(e.target.value))} /></div>
          <div>
            <label className={labelCls}>Período</label>
            <select disabled={!advanced} className={lockCls} value={data.periodo} onChange={(e) => upd("periodo", e.target.value as "MANHÃ" | "TARDE" | "")}>
              <option value="">Selecionar</option>
              <option value="MANHÃ">Manhã</option>
              <option value="TARDE">Tarde</option>
            </select>
          </div>
          <div><label className={labelCls}>Tipo Agenda</label><input disabled={!advanced} className={lockCls} value={data.tipoAgenda} onChange={(e) => upd("tipoAgenda", e.target.value)} /></div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Consumidor</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className={labelCls}>Nome</label><input disabled={!advanced} className={lockCls} value={data.consumidor} onChange={(e) => upd("consumidor", e.target.value)} /></div>
          <div><label className={labelCls}>CPF/CNPJ</label><input disabled={!advanced} className={lockCls} value={data.cnpjCpf} onChange={(e) => upd("cnpjCpf", e.target.value)} /></div>
          <div><label className={labelCls}>CEP</label><input disabled={!advanced} className={lockCls} value={data.cep} onChange={(e) => upd("cep", e.target.value)} /></div>
          <div className="col-span-2"><label className={labelCls}>Endereço</label><input disabled={!advanced} className={lockCls} value={data.endereco} onChange={(e) => upd("endereco", e.target.value)} /></div>
          <div><label className={labelCls}>Complemento</label><input disabled={!advanced} className={lockCls} value={data.complemento} onChange={(e) => upd("complemento", e.target.value)} /></div>
          <div><label className={labelCls}>Bairro</label><input disabled={!advanced} className={lockCls} value={data.bairro} onChange={(e) => upd("bairro", e.target.value)} /></div>
          <div><label className={labelCls}>Cidade</label><input disabled={!advanced} className={lockCls} value={data.cidade} onChange={(e) => upd("cidade", e.target.value)} /></div>
          <div><label className={labelCls}>UF</label><input disabled={!advanced} className={lockCls} value={data.uf} onChange={(e) => upd("uf", e.target.value)} /></div>
          <div className="col-span-2">
            <label className={labelCls}>Telefones</label>
            <input disabled={!advanced} className={lockCls} value={`${data.foneResidencia} ${data.foneComercial} ${data.foneOutros}`.trim()} onChange={(e) => upd("foneOutros", e.target.value)} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Produto</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Produto</label><input className={inputCls} value={data.produto} onChange={(e) => upd("produto", e.target.value)} /></div>
          <div>
            <label className={labelCls}>Marca</label>
            <input className={inputCls} value={data.marca} onChange={(e) => setData((d) => ({ ...d, marca: e.target.value, centralAtendimento: e.target.value }))} />
          </div>
          <div><label className={labelCls}>Linha</label><input className={inputCls} value={data.linha} onChange={(e) => upd("linha", e.target.value)} /></div>
          <div><label className={labelCls}>Série</label><input className={inputCls} value={data.serie} onChange={(e) => upd("serie", e.target.value)} /></div>
          <div><label className={labelCls}>Nº Nota Fiscal</label><input className={inputCls} value={data.nrNotaFiscal} onChange={(e) => upd("nrNotaFiscal", e.target.value)} /></div>
          <div><label className={labelCls}>Data Compra</label><input className={inputCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataCompra} onChange={(e) => upd("dataCompra", formatDate(e.target.value))} /></div>
          <div><label className={labelCls}>Cor</label><input className={inputCls} value={data.cor} onChange={(e) => upd("cor", e.target.value)} /></div>
          <div><label className={labelCls}>Voltagem</label><input disabled={!advanced} className={lockCls} value={data.voltagem} onChange={(e) => upd("voltagem", e.target.value)} /></div>
        </div>
      </section>

      <section>
        <label className={labelCls}>Defeito Reclamado 1</label>
        <textarea rows={2} className={inputCls} value={data.defeitoReclamado} onChange={(e) => upd("defeitoReclamado", e.target.value)} />
        <label className={labelCls + " mt-3"}>Defeito Reclamado 2</label>
        <textarea rows={2} className={inputCls} value={data.defeitoReclamado2} onChange={(e) => upd("defeitoReclamado2", e.target.value)} />
        <label className={labelCls + " mt-3"}>Defeito Constatado 1</label>
        <textarea rows={2} className={inputCls} value={data.defeitoConstatado} onChange={(e) => upd("defeitoConstatado", e.target.value)} />
        <label className={labelCls + " mt-3"}>Defeito Constatado 2</label>
        <textarea rows={2} className={inputCls} value={data.defeitoConstatado2} onChange={(e) => upd("defeitoConstatado2", e.target.value)} />
        <label className={labelCls + " mt-3"}>Reclamação Atendimento</label>
        <textarea rows={3} disabled={!advanced} className={lockCls} value={data.reclamacaoAtendimento} onChange={(e) => upd("reclamacaoAtendimento", e.target.value)} />
        <label className={labelCls + " mt-3"}>Laudo Técnico</label>
        <textarea rows={3} className={inputCls} value={data.laudoTecnico} onChange={(e) => upd("laudoTecnico", e.target.value)} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Anexos do Atendimento</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <AttachmentField label="Nota Fiscal" value={data.anexoNotaFiscal} onChange={(v) => upd("anexoNotaFiscal", v)} accent="emerald" />
          <AttachmentField label="Etiqueta" value={data.anexoEtiqueta} onChange={(v) => upd("anexoEtiqueta", v)} accent="blue" />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">Peças / Orçamento</h2>
          <button onClick={addPeca} className="rounded-md border border-slate-300 dark:border-slate-600 px-2 py-1 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            + Peça
          </button>
        </div>
        <div className="space-y-3">
          {data.pecas.map((p, i) => (
            <div key={i} className="rounded-md border border-slate-200 dark:border-slate-700 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Peça #{i + 1}</span>
                {data.pecas.length > 1 && (
                  <button onClick={() => removePeca(i)} className="text-xs text-red-600 hover:underline">Remover</button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="Qtd" className={inputCls} inputMode="decimal" value={p.quantidade} onChange={(e) => updPeca(i, "quantidade", e.target.value)} />
                <input placeholder="Código" className={inputCls} value={p.codigo} onChange={(e) => updPeca(i, "codigo", e.target.value)} />
                <input placeholder="Valor em R$" className={inputCls} inputMode="decimal" value={p.valor} onChange={(e) => updPeca(i, "valor", e.target.value)} onBlur={(e) => updPeca(i, "valor", formatBRLInput(e.target.value))} />
                <input placeholder="FCTA" className={inputCls} value={p.fcta} onChange={(e) => updPeca(i, "fcta", e.target.value)} />
                <input placeholder="OCOR" className={inputCls} value={p.ocor} onChange={(e) => updPeca(i, "ocor", e.target.value)} />
              </div>
              <input placeholder="Descrição" className={`${inputCls} mt-2 w-full`} value={p.descricao} onChange={(e) => updPeca(i, "descricao", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Total Peças <span className="text-[10px] font-normal text-slate-500">(auto)</span></label>
            <input readOnly className={`${inputCls} bg-slate-100 dark:bg-slate-700 font-semibold`} value={toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0))} />
          </div>
          <div>
            <label className={labelCls}>Mão de Obra</label>
            <input className={inputCls} inputMode="numeric" value={data.maoDeObra} onChange={(e) => upd("maoDeObra", formatBRLLive(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Total Orçamento <span className="text-[10px] font-normal text-slate-500">(auto)</span></label>
            <input readOnly className={`${inputCls} bg-slate-100 dark:bg-slate-700 font-semibold`} value={toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0) + parseBRLNumber(data.maoDeObra))} />
          </div>
          <div>
            <label className={labelCls}>Valor Orçamento <span className="text-[10px] font-normal text-slate-500">(auto)</span></label>
            <input readOnly className={`${inputCls} bg-slate-100 dark:bg-slate-700`} value={toBRL((data.pecas || []).reduce((s, p) => s + parseBRLNumber(p.valor), 0) + parseBRLNumber(data.maoDeObra))} />
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Data da Aprovação</label><input className={inputCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataAprovacao} onChange={(e) => upd("dataAprovacao", formatDate(e.target.value))} /></div>
          <div><label className={labelCls}>Data Parecer</label><input disabled={!advanced} className={lockCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataParecer} onChange={(e) => upd("dataParecer", formatDate(e.target.value))} /></div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>Assinatura do Consumidor</label>
          <SignaturePad value={data.assinaturaConsumidor} onChange={(v) => upd("assinaturaConsumidor", v)} />
        </div>
        <label className={labelCls + " mt-3"}>Observação</label>
        <textarea rows={2} disabled={!advanced} className={lockCls} value={data.observacao} onChange={(e) => upd("observacao", e.target.value)} />
        <label className={labelCls + " mt-3"}>Validade Orçamento</label>
        <textarea rows={2} disabled={!advanced} className={lockCls} value={data.validadeOrcamento} onChange={(e) => upd("validadeOrcamento", e.target.value)} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Garantia Serviço (meses)</label><input disabled={!advanced} className={lockCls} value={data.garantiaServicoMeses} onChange={(e) => upd("garantiaServicoMeses", e.target.value)} /></div>
          <div><label className={labelCls}>Garantia Peças (meses)</label><input disabled={!advanced} className={lockCls} value={data.garantiaPecasMeses} onChange={(e) => upd("garantiaPecasMeses", e.target.value)} /></div>
          <div><label className={labelCls}>Data Conclusão</label><input disabled={!advanced} className={lockCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataConclusao} onChange={(e) => upd("dataConclusao", formatDate(e.target.value))} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Responsável</label>
        <input disabled={!advanced} className={lockCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
      </section>
    </>
  );
}
