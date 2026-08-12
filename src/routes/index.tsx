import { createFileRoute } from "@tanstack/react-router";
import {
  Printer,
  Save,
  Search,
  Calendar,
  Upload,
  Sun,
  Moon,
  CheckCircle2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import ParecerPreview from "@/components/ParecerPreview";
import HisensePreview from "@/components/HisensePreview";
import AssurantPreview from "@/components/AssurantPreview";
import WhirlpoolPreview from "@/components/WhirlpoolPreview";
import EstoqueScreen from "@/components/EstoqueScreen";
import AppHeader from "@/components/layouts/AppHeader";
import SavedListModal from "@/components/modals/SavedListModal";
import LeaveGuardModal from "@/components/modals/LeaveGuardModal";
import SaveSituacaoModal from "@/components/modals/SaveSituacaoModal";
import ProgressOverlay from "@/components/modals/ProgressOverlay";
import AgendaCard from "@/components/agenda/AgendaCard";
import AgendaDropZone from "@/components/agenda/AgendaDropZone";
import VoxForm from "@/components/forms/VoxForm";
import HisenseForm from "@/components/forms/HisenseForm";
import AssurantForm from "@/components/forms/AssurantForm";
import WhirlpoolForm from "@/components/forms/WhirlpoolForm";
import { THEMES, defaultParecer, type ParecerData } from "@/lib/parecer-types";
import {
  defaultHisense,
  defaultAssurant,
  defaultWhirlpool,
  type HisenseData,
  type AssurantData,
  type WhirlpoolData,
  type ParecerTipo,
} from "@/lib/parecer-extras";
import {
  fetchSavedList,
  fetchParecerById,
  fetchAtendimentoById,
  saveParecerCliente,
  deleteParecerCliente,
  type SavedListRow,
} from "@/lib/supabase-queries";
import { useAuth } from "@/hooks/useAuth";
import { useAtendimentos, ATENDIMENTOS_KEY } from "@/hooks/useAtendimentos";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useTheme } from "@/hooks/useTheme";
import { extrairDadosWhirlpool } from "@/lib/pdf-extract.functions";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

// ─── Helpers ──────────────────────────────────────────────────

const SITUACAO_LABEL: Record<string, string> = {
  em_aberto: "Em aberto",
  concluido: "Concluído",
  realizar_pedido: "Realizar pedido",
  cancelado: "Cancelado",
};

const SITUACAO_STYLE: Record<string, { border: string; bg: string; badge: string; dot: string; label: string }> = {
  em_aberto:       { border: "border-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/20",    badge: "bg-amber-100 text-amber-800",     dot: "bg-amber-500",   label: "Em aberto" },
  concluido:       { border: "border-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500", label: "Concluído" },
  realizar_pedido: { border: "border-sky-500",     bg: "bg-sky-50 dark:bg-sky-950/20",         badge: "bg-sky-100 text-sky-800",         dot: "bg-sky-500",     label: "Realizar pedido" },
  cancelado:       { border: "border-rose-500",    bg: "bg-rose-50 dark:bg-rose-950/20",        badge: "bg-rose-100 text-rose-700",       dot: "bg-rose-500",    label: "Cancelado" },
};

function formatDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function normalizeAgendaDate(value?: string | null): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const day = match?.[1]; const month = match?.[2]; const year = match?.[3];
  return day && month && year ? `${year}-${month}-${day}` : value;
}

function normalizeAssurantData(raw: unknown): AssurantData {
  const source = (raw && typeof raw === "object" ? raw : {}) as Partial<AssurantData> & {
    motivo1?: string; motivo2?: string; cotacaoImg?: string; cotacaoOrcamento?: string;
  };
  const fotos = Array.isArray(source.fotos) && source.fotos.length > 0
    ? defaultAssurant.fotos.map((fallback, index) => {
        const current = source.fotos?.[index];
        return { legenda: current?.legenda || fallback.legenda, dataUrl: current?.dataUrl || "" };
      })
    : defaultAssurant.fotos;
  const legacyCotacao = [source.cotacaoImg, source.cotacaoOrcamento].filter(
    (item): item is string => typeof item === "string" && item.length > 0,
  );
  const cotacaoImgs = Array.isArray(source.cotacaoImgs)
    ? [source.cotacaoImgs[0] ?? "", source.cotacaoImgs[1] ?? ""]
    : [legacyCotacao[0] ?? "", legacyCotacao[1] ?? ""];
  return {
    ...defaultAssurant, ...source,
    motivo: source.motivo || [source.motivo1, source.motivo2].filter(Boolean).join("\n"),
    fotos, cotacaoImgs, residenciaImg: source.residenciaImg || "",
  };
}

// ─── Route ────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "description", content: "Gere pareceres técnicos profissionais VOX, HISENSE, ASSURANT e WHIRLPOOL." },
    ],
  }),
  component: Index,
});

type SituacaoFilter = "" | "concluido" | "em_aberto" | "realizar_pedido" | "cancelado";

// ─── Main Component ───────────────────────────────────────────

function Index() {
  const { userEmail, authChecked, signOut } = useAuth();
  const { theme, toggle: toggleTheme, isDark } = useTheme();
  const { isInstalled, handleInstall } = usePwaInstall();

  // ── Mode & tipo state ──
  const [modo, setModo] = useState<"home" | "parecer" | "whirlpool" | "estoque">("home");
  const [tipo, setTipo] = useState<ParecerTipo | null>(null);

  // ── Form data ──
  const [data, setData] = useState<ParecerData>(defaultParecer);
  const [hisense, setHisense] = useState<HisenseData>(defaultHisense);
  const [assurant, setAssurant] = useState<AssurantData>(defaultAssurant);
  const [whirlpool, setWhirlpool] = useState<WhirlpoolData>(defaultWhirlpool);
  const [whirlpoolAtendimentoId, setWhirlpoolAtendimentoId] = useState<string | null>(null);
  const [whirlpoolBaseline, setWhirlpoolBaseline] = useState(() => JSON.stringify(defaultWhirlpool));
  const [themeId, setThemeId] = useState(THEMES[0].id);

  // ── UI state ──
  const [savedList, setSavedList] = useState<SavedListRow[]>([]);
  const [showList, setShowList] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState<SituacaoFilter>("");
  const [agendaSearch, setAgendaSearch] = useState("");
  const [agendaDate, setAgendaDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [progressLabel, setProgressLabel] = useState("");
  const [saveSituacaoOpen, setSaveSituacaoOpen] = useState(false);
  const [leaveGuard, setLeaveGuard] = useState<{ action: () => void; message: string } | null>(null);
  const [postSaveAction, setPostSaveAction] = useState<(() => void) | null>(null);

  // ── Atendimentos via hook ──
  const atendimentos = useAtendimentos(authChecked && modo === "whirlpool");
  const skipNextWhirlpoolTodayResetRef = useRef(false);
  const prevModoRef = useRef(modo);

  // Server functions (kept for PDF/AI)
  const extractPdf = useServerFn(extrairDadosWhirlpool);

  const theme_obj = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  const inputCls = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 dark:text-slate-100 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition";
  const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5";

  // ── Dirty state ──
  const isWhirlpoolDirty =
    modo === "whirlpool" && tipo === "whirlpool" && JSON.stringify(whirlpool) !== whirlpoolBaseline;

  useEffect(() => {
    if (!isWhirlpoolDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isWhirlpoolDirty]);

  const requestLeave = useCallback((action: () => void, message?: string) => {
    if (!isWhirlpoolDirty) { action(); return; }
    setLeaveGuard({ action, message: message ?? "Você tem alterações não salvas neste atendimento. O que deseja fazer?" });
  }, [isWhirlpoolDirty]);

  const discardWhirlpoolChanges = () => {
    try {
      const base = JSON.parse(whirlpoolBaseline) as WhirlpoolData;
      setWhirlpool(base);
    } catch { setWhirlpool(defaultWhirlpool); }
  };

  // ── Agenda date reset ──
  useEffect(() => {
    if (modo === "whirlpool" && prevModoRef.current !== "whirlpool") {
      if (skipNextWhirlpoolTodayResetRef.current) {
        skipNextWhirlpoolTodayResetRef.current = false;
      } else {
        setAgendaDate(new Date().toISOString().split("T")[0]);
      }
    }
    prevModoRef.current = modo;
  }, [modo]);

  // ── Print ──
  useEffect(() => {
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done);
    return () => window.removeEventListener("afterprint", done);
  }, []);

  const handlePrint = (label = "Preparando documento para impressão…") => {
    const printable = document.getElementById("parecer-print");
    if (!printable) { toast.error("Nenhum parecer foi encontrado para impressão."); return; }
    setProgressLabel(label);
    setPrinting(true);
    document.getElementById("parecer-print-root")?.remove();
    const printRoot = document.createElement("div");
    printRoot.id = "parecer-print-root";
    printRoot.className = "parecer-print-root";
    const printableClone = printable.cloneNode(true);
    if (printableClone instanceof HTMLElement) {
      if (printableClone.querySelector(".whirlpool-a4")) printRoot.classList.add("whirlpool-print-root");
      if (printableClone.classList.contains("assurant-preview")) printRoot.classList.add("assurant-print-root");
    }
    printRoot.appendChild(printableClone);
    document.body.appendChild(printRoot);
    document.body.classList.add("parecer-printing");
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return; cleaned = true;
      document.body.classList.remove("parecer-printing");
      if (document.body.contains(printRoot)) document.body.removeChild(printRoot);
      setPrinting(false);
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup, { once: true });
    try { window.print(); window.setTimeout(cleanup, 30000); }
    catch { cleanup(); toast.error("Não foi possível abrir a janela de impressão."); }
  };

  // ── Saved list ──
  const loadList = useCallback(async () => {
    try {
      const list = await fetchSavedList(tipo);
      setSavedList(list);
    } catch { toast.error("Erro ao carregar atendimentos salvos."); }
  }, [tipo]);

  const openList = async () => {
    setSearchTerm("");
    await loadList();
    setShowList(true);
  };

  // ── Merged list (savedList + live atendimentos) ──
  const atendimentosFallback: SavedListRow[] = (atendimentos.atendimentos).map((row) => ({
    id: row.id,
    numero_os: row.numero_os,
    cliente_nome: row.cliente_nome ?? null,
    updated_at: row.updated_at,
    tipo: row.tipo,
    source: "atendimento" as const,
    data_agenda: row.data_agenda,
    periodo: row.periodo,
    status: row.status,
    situacao: (row as { situacao?: string | null }).situacao ?? null,
    dados: row.dados,
  }));
  const mergedById = new Map<string, SavedListRow>();
  for (const r of atendimentosFallback) mergedById.set(r.id, r);
  for (const r of savedList) mergedById.set(r.id, r);
  const mergedAll = Array.from(mergedById.values()).sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const allSaved = tipo ? mergedAll.filter((r) => r.tipo === tipo) : mergedAll;

  // ── Save / Load Parecer ──
  const saveParecer = async () => {
    if (!tipo) return;
    const numeroOS = tipo === "vox" ? data.numeroOS : tipo === "hisense" ? hisense.numeroOS : tipo === "assurant" ? assurant.sinistro : whirlpool.numeroOS;
    const clienteNome = tipo === "vox" ? data.clienteNome : tipo === "hisense" ? hisense.clienteNome : tipo === "assurant" ? `Sinistro ${assurant.sinistro}` : whirlpool.consumidor;
    const payload = tipo === "vox" ? data : tipo === "hisense" ? hisense : tipo === "assurant" ? assurant : whirlpool;
    if (!numeroOS.trim()) { setSaveMsg("Informe o Nº OS antes de salvar."); return; }
    try {
      await saveParecerCliente({ tipo, numero_os: numeroOS.trim(), cliente_nome: clienteNome || null, data: payload });
      setSaveMsg(`Parecer OS ${numeroOS} salvo com sucesso.`);
      setTimeout(() => setSaveMsg(""), 4000);
    } catch (err) {
      setSaveMsg(`Erro: ${err instanceof Error ? err.message : "falha ao salvar"}`);
    }
  };

  const loadParecer = async (id: string) => {
    const cachedRow = allSaved.find((row) => row.id === id);
    if (cachedRow?.source === "atendimento") {
      const row = await fetchAtendimentoById(id) ?? cachedRow;
      const atendimentoTipo = row.tipo as ParecerTipo;
      const rawDados = (row.dados as unknown) ?? {};
      requestLeave(() => {
        if (atendimentoTipo !== "whirlpool") {
          setTipo(atendimentoTipo);
          setModo("parecer");
          if (atendimentoTipo === "vox") setData({ ...defaultParecer, ...(rawDados as Partial<ParecerData>) } as ParecerData);
          else if (atendimentoTipo === "hisense") setHisense({ ...defaultHisense, ...(rawDados as Partial<HisenseData>) } as HisenseData);
          else if (atendimentoTipo === "assurant") setAssurant(normalizeAssurantData(rawDados));
          setShowList(false); setSearchTerm(""); return;
        }
        const raw = (rawDados as Partial<WhirlpoolData>) ?? {};
        const merged: WhirlpoolData = { ...defaultWhirlpool, ...raw, pecas: Array.isArray(raw.pecas) && raw.pecas.length > 0 ? raw.pecas : defaultWhirlpool.pecas };
        const scheduledDate = normalizeAgendaDate((row as { data_agenda?: string | null }).data_agenda);
        setWhirlpool(merged);
        setWhirlpoolBaseline(JSON.stringify(merged));
        setWhirlpoolAtendimentoId(row.id);
        setTipo("whirlpool");
        if (scheduledDate) { skipNextWhirlpoolTodayResetRef.current = true; setAgendaDate(scheduledDate); }
        setModo("whirlpool"); setShowList(false); setSearchTerm("");
      }, "Abrir outro atendimento vai descartar as alterações não salvas do atual. O que deseja fazer?");
      return;
    }
    const row = await fetchParecerById(id);
    if (row) {
      const t = row.tipo as ParecerTipo;
      if (t === "whirlpool") {
        setWhirlpool(row.data as unknown as WhirlpoolData);
        setWhirlpoolAtendimentoId(id);
        setWhirlpoolBaseline(JSON.stringify(row.data));
        setTipo("whirlpool"); skipNextWhirlpoolTodayResetRef.current = true; setModo("whirlpool");
      } else {
        setTipo(t); setModo("parecer");
        if (t === "vox") setData(row.data as unknown as ParecerData);
        else if (t === "hisense") setHisense(row.data as unknown as HisenseData);
        else setAssurant(normalizeAssurantData(row.data));
      }
      setShowList(false);
    }
  };

  const deleteParecer = async (id: string) => {
    const cachedRow = allSaved.find((row) => row.id === id);
    if (cachedRow?.source === "atendimento") {
      await deleteAtendimentoHandler(id);
      await loadList();
      return;
    }
    if (!confirm("Excluir este parecer?")) return;
    await deleteParecerCliente(id);
    await loadList();
  };

  // ── Whirlpool agenda operations ──
  const openAtendimento = (id: string) => {
    const row = atendimentos.atendimentos.find((a) => a.id === id);
    if (!row) return;
    requestLeave(() => {
      const tipoRow = row.tipo as ParecerTipo;
      const rawAny = (row.dados as unknown) ?? {};
      if (tipoRow !== "whirlpool") {
        setTipo(tipoRow); setModo("parecer");
        if (tipoRow === "vox") setData(rawAny as ParecerData);
        else if (tipoRow === "hisense") setHisense({ ...defaultHisense, ...(rawAny as Partial<HisenseData>) } as HisenseData);
        else if (tipoRow === "assurant") setAssurant(normalizeAssurantData(rawAny));
        setShowList(false); return;
      }
      const raw = (rawAny as Partial<WhirlpoolData>) ?? {};
      const merged: WhirlpoolData = { ...defaultWhirlpool, ...raw, pecas: Array.isArray(raw.pecas) && raw.pecas.length > 0 ? raw.pecas : defaultWhirlpool.pecas };
      setWhirlpool(merged); setWhirlpoolBaseline(JSON.stringify(merged)); setWhirlpoolAtendimentoId(row.id); setTipo("whirlpool");
      const scheduledDate = normalizeAgendaDate(row.data_agenda);
      if (scheduledDate) { skipNextWhirlpoolTodayResetRef.current = true; setAgendaDate(scheduledDate); }
      setModo("whirlpool");
    }, "Abrir outro atendimento vai descartar as alterações não salvas do atual. O que deseja fazer?");
  };

  const saveWhirlpoolAtendimento = async (situacao: "em_aberto" | "concluido" | "realizar_pedido" | "cancelado") => {
    if (!whirlpool.numeroOS.trim()) { toast.error("Informe o Nº OS antes de salvar."); return; }
    const osTrim = whirlpool.numeroOS.trim();
    let idAlvo = whirlpoolAtendimentoId ?? undefined;
    let existenteRow = idAlvo ? atendimentos.atendimentos.find((a) => a.id === idAlvo) : undefined;
    if (!idAlvo) {
      const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === osTrim);
      if (existente) {
        if (!confirm(`Já existe um atendimento com a OS ${osTrim}. Deseja substituir?`)) { setSaveSituacaoOpen(false); return; }
        idAlvo = existente.id; existenteRow = existente;
      }
    }
    const preservedStatus = (existenteRow?.status as "nao_agendado" | "agendado" | "concluido" | undefined) ?? "agendado";
    const preservedData = existenteRow?.data_agenda ?? (preservedStatus === "agendado" ? agendaDate : "");
    const preservedPeriodo = (existenteRow?.periodo as "manha" | "tarde" | "" | null | undefined) ?? (whirlpool.periodo === "MANHÃ" ? "manha" : whirlpool.periodo === "TARDE" ? "tarde" : "");
    const result = await atendimentos.save({
      id: idAlvo, numero_os: osTrim, tipo: "whirlpool", cliente_nome: whirlpool.consumidor || null,
      dados: whirlpool as unknown as Record<string, unknown>, status: preservedStatus,
      data_agenda: preservedData || "", periodo: (preservedPeriodo || "") as "manha" | "tarde" | "",
      situacao,
    });
    setWhirlpoolAtendimentoId(result.id);
    setWhirlpoolBaseline(JSON.stringify(whirlpool));
    setSaveSituacaoOpen(false);
    toast.success(`Atendimento ${whirlpool.numeroOS} salvo como ${SITUACAO_LABEL[situacao]}.`);
    if (postSaveAction) { const act = postSaveAction; setPostSaveAction(null); act(); }
  };

  const novoAtendimentoAutoSave = async () => {
    const os = window.prompt("Informe o Nº da OS para o novo atendimento:")?.trim();
    if (!os) { toast.error("Nº OS obrigatório para criar o atendimento."); return; }
    const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === os);
    if (existente) { toast.info(`Já existe um atendimento com a OS ${os}. Abrindo o existente.`); openAtendimento(existente.id); return; }
    const base: WhirlpoolData = { ...defaultWhirlpool, numeroOS: os };
    try {
      const result = await atendimentos.save({ numero_os: os, tipo: "whirlpool", cliente_nome: null, dados: base as unknown as Record<string, unknown>, status: "nao_agendado", data_agenda: "", periodo: "", situacao: "em_aberto" });
      setWhirlpool(base); setWhirlpoolBaseline(JSON.stringify(base)); setWhirlpoolAtendimentoId(result.id);
      setTipo("whirlpool"); setModo("whirlpool");
      toast.success(`Atendimento ${os} criado e disponível na pesquisa.`);
    } catch (err) { toast.error(err instanceof Error ? err.message : "Erro ao criar atendimento."); }
  };

  const scheduleTo = async (id: string, periodo: "manha" | "tarde") => {
    const row = atendimentos.atendimentos.find((a) => a.id === id);
    const dadosAtuais = (row?.dados as Record<string, unknown> | undefined) ?? {};
    const [y, m, d] = agendaDate.split("-");
    const dataBR = y && m && d ? `${d}/${m}/${y}` : "";
    const periodoLabel = periodo === "manha" ? "MANHÃ" : "TARDE";
    const novosDados = { ...dadosAtuais, dataAgenda: dataBR, periodo: periodoLabel };
    if (row) {
      await atendimentos.save({ id, numero_os: row.numero_os, tipo: row.tipo, cliente_nome: row.cliente_nome ?? null, dados: novosDados, status: "agendado", data_agenda: agendaDate, periodo });
    } else {
      await atendimentos.updateStatus({ id, status: "agendado", data_agenda: agendaDate, periodo });
    }
    if (whirlpoolAtendimentoId === id) setWhirlpool((d) => ({ ...d, dataAgenda: dataBR, periodo: periodoLabel }));
    toast.success("Atendimento agendado.");
  };

  const unschedule = async (id: string) => {
    const row = atendimentos.atendimentos.find((a) => a.id === id);
    const dadosAtuais = (row?.dados as Record<string, unknown> | undefined) ?? {};
    const novosDados = { ...dadosAtuais, dataAgenda: "", periodo: "" };
    if (row) {
      await atendimentos.save({ id, numero_os: row.numero_os, tipo: row.tipo, cliente_nome: row.cliente_nome ?? null, dados: novosDados, status: "nao_agendado", data_agenda: "", periodo: "" });
    } else {
      await atendimentos.updateStatus({ id, status: "nao_agendado", data_agenda: "", periodo: "" });
    }
    if (whirlpoolAtendimentoId === id) setWhirlpool((d) => ({ ...d, dataAgenda: "", periodo: "" }));
    toast.success("Atendimento movido para não agendados.");
  };

  const moveToDate = async (id: string, isoDate: string) => {
    const row = atendimentos.atendimentos.find((a) => a.id === id);
    if (!row) return;
    const dadosAtuais = (row.dados as Record<string, unknown> | undefined) ?? {};
    const [y, m, d] = isoDate.split("-");
    const dataBR = y && m && d ? `${d}/${m}/${y}` : "";
    const periodo = (row.periodo === "manha" || row.periodo === "tarde") ? (row.periodo as "manha" | "tarde") : "manha";
    const periodoLabel = periodo === "manha" ? "MANHÃ" : "TARDE";
    const novosDados = { ...dadosAtuais, dataAgenda: dataBR, periodo: periodoLabel };
    await atendimentos.save({ id, numero_os: row.numero_os, tipo: row.tipo, cliente_nome: row.cliente_nome ?? null, dados: novosDados, status: "agendado", data_agenda: isoDate, periodo });
    if (whirlpoolAtendimentoId === id) setWhirlpool((data) => ({ ...data, dataAgenda: dataBR, periodo: periodoLabel }));
    toast.success(`Atendimento transferido para ${dataBR}.`);
  };

  const updateTagAgenda = async (id: string, tag: string) => {
    const row = atendimentos.atendimentos.find((a) => a.id === id);
    if (!row) return;
    const dadosAtuais = (row.dados as Record<string, unknown> | undefined) ?? {};
    const novosDados = { ...dadosAtuais, tagAgenda: tag };
    await atendimentos.save({ id, numero_os: row.numero_os, tipo: row.tipo, cliente_nome: row.cliente_nome ?? null, dados: novosDados, status: (row.status as "nao_agendado" | "agendado" | "concluido") ?? "nao_agendado", data_agenda: row.data_agenda ?? "", periodo: (row.periodo as "manha" | "tarde" | "") ?? "" });
    if (whirlpoolAtendimentoId === id) setWhirlpool((data) => ({ ...data, tagAgenda: tag }));
    toast.success(tag ? "Observação salva na agenda." : "Observação removida.");
  };

  const deleteAtendimentoHandler = async (id: string) => {
    const pwd = window.prompt("Exclusão protegida — informe a senha de administrador:");
    if (pwd === null) return;
    if (pwd !== "V271088") { toast.error("Senha incorreta. Exclusão cancelada."); return; }
    if (!confirm("Confirmar exclusão deste atendimento? Esta ação não pode ser desfeita.")) return;
    await atendimentos.remove(id);
    if (whirlpoolAtendimentoId === id) { setWhirlpool(defaultWhirlpool); setWhirlpoolAtendimentoId(null); }
    toast.success("Atendimento excluído.");
  };

  const handlePdfUpload = async (file: File, target?: { status: "nao_agendado" | "agendado"; periodo?: "manha" | "tarde" }) => {
    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) { toast.error("Envie um arquivo PDF."); return; }
    setPdfUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(",")[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
      const extracted = await extractPdf({ data: { filename: file.name, mimeType: "application/pdf", base64 } });
      const status = target?.status ?? "nao_agendado";
      const periodo = target?.periodo ?? "";
      const dadosFinal: WhirlpoolData = { ...extracted };
      if (status === "agendado") {
        const [y, m, d] = agendaDate.split("-");
        dadosFinal.dataAgenda = y && m && d ? `${d}/${m}/${y}` : dadosFinal.dataAgenda;
        dadosFinal.periodo = periodo === "manha" ? "MANHÃ" : periodo === "tarde" ? "TARDE" : dadosFinal.periodo;
      }
      const numeroOsNovo = (extracted.numeroOS || "SEM-OS").trim();
      const existente = atendimentos.atendimentos.find((a) => a.tipo === "whirlpool" && a.numero_os.trim() === numeroOsNovo);
      if (existente) {
        const [ay, am, ad] = agendaDate.split("-");
        const dataBR = ay && am && ad ? `${ad}/${am}/${ay}` : agendaDate;
        const destino = status === "agendado" ? `${dataBR} — ${periodo === "manha" ? "Manhã" : "Tarde"}` : "Não agendados";
        if (!confirm(`Já existe um atendimento com a OS ${numeroOsNovo}.\n\nDeseja atualizar para:\n${destino}?`)) { setPdfUploading(false); return; }
        await atendimentos.save({ id: existente.id, numero_os: numeroOsNovo, tipo: "whirlpool", cliente_nome: extracted.consumidor || existente.cliente_nome || null, dados: dadosFinal as unknown as Record<string, unknown>, status, data_agenda: status === "agendado" ? agendaDate : "", periodo: status === "agendado" ? (periodo as "manha" | "tarde") : "" });
        toast.success(`OS ${numeroOsNovo} atualizada.`);
        return;
      }
      const novo = await atendimentos.save({ numero_os: extracted.numeroOS || "SEM-OS", tipo: "whirlpool", cliente_nome: extracted.consumidor || null, dados: dadosFinal as unknown as Record<string, unknown>, status, data_agenda: status === "agendado" ? agendaDate : "", periodo: status === "agendado" ? (periodo as "manha" | "tarde") : "" });
      toast.success(status === "agendado" ? `OS ${extracted.numeroOS || novo.numero_os} agendada.` : `OS ${extracted.numeroOS || novo.numero_os} adicionada.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao processar PDF.");
    } finally {
      setPdfUploading(false);
    }
  };

  // ── Guards ──
  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm text-slate-500">Carregando...</p>
        </div>
      </div>
    );
  }

  // ── Shared overlays ──
  const sharedOverlays = (
    <>
      <ProgressOverlay visible={pdfUploading || printing} isPrinting={printing} progressLabel={progressLabel} />
      {leaveGuard && (
        <LeaveGuardModal
          message={leaveGuard.message}
          hasOS={!!whirlpool.numeroOS.trim()}
          onSave={() => {
            setPostSaveAction(() => leaveGuard.action);
            setLeaveGuard(null);
            setSaveSituacaoOpen(true);
          }}
          onDiscard={() => {
            const act = leaveGuard.action;
            discardWhirlpoolChanges();
            setLeaveGuard(null);
            act();
          }}
          onCancel={() => setLeaveGuard(null)}
        />
      )}
      {showList && (
        <SavedListModal
          rows={allSaved}
          searchTerm={searchTerm}
          situacaoFilter={situacaoFilter}
          onSearch={setSearchTerm}
          onSituacaoFilter={setSituacaoFilter}
          onOpen={loadParecer}
          onDelete={deleteParecer}
          onClose={() => setShowList(false)}
        />
      )}
    </>
  );

  // ── Estoque ──
  if (modo === "estoque") {
    return <EstoqueScreen onBack={() => setModo("home")} />;
  }

  // ── Home ──
  if (modo === "home") {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        {sharedOverlays}
        <AppHeader
          title="Gerador de Parecer Técnico"
          subtitle={`Vox Grupo · ${userEmail ?? ""}`}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onOpenList={openList}
          onSignOut={() => requestLeave(() => { void signOut(); }, "Você tem alterações não salvas. Deseja sair mesmo assim?")}
          isInstalled={isInstalled}
          onInstall={handleInstall}
          extraActions={
            <>
              <button onClick={() => setModo("whirlpool")} className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <Calendar className="h-4 w-4" /> Agenda
              </button>
              <button onClick={() => setModo("estoque")} className="inline-flex items-center gap-2 rounded-md border border-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-110 transition">
                <Package className="h-4 w-4" /> Estoque
              </button>
            </>
          }
        />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-6 animate-slide-down">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Escolha o modelo de parecer
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Cada fabricante possui layout oficial, regras de cálculo e galeria de fotos dedicadas.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger">
            {[
              { id: "vox" as const,       name: "VOX",       badge: "Corporativo",  desc: "Parecer técnico com 6 temas visuais e impressão A4.",     color: "from-blue-600 via-indigo-600 to-indigo-800",       icon: "⚡" },
              { id: "hisense" as const,   name: "HISENSE",   badge: "Gorenje",      desc: "Relatório técnico com 8 fotos e medições elétricas.",     color: "from-red-600 via-rose-600 to-rose-800",             icon: "❄️" },
              { id: "assurant" as const,  name: "ASSURANT",  badge: "Sinistros",    desc: "Laudo para seguradora com fotos e cotações de peças.",    color: "from-slate-800 via-slate-900 to-zinc-950",         icon: "🛡️" },
              { id: "whirlpool" as const, name: "WHIRLPOOL", badge: "Agenda OS",    desc: "Agenda diária com importação automatizada de PDF.",       color: "from-cyan-600 via-blue-600 to-indigo-700",         icon: "📅" },
              { id: "estoque" as const,   name: "ESTOQUE",   badge: "Peças",        desc: "Controle de peças com busca visual e foto por IA.",       color: "from-emerald-600 via-teal-600 to-teal-800",        icon: "📦" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  if (m.id === "whirlpool") setModo("whirlpool");
                  else if (m.id === "estoque") setModo("estoque");
                  else { setTipo(m.id); setModo("parecer"); }
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${m.color} p-5 text-left text-white shadow-md transition-all duration-200 hover-lift active:scale-[0.98] animate-slide-up`}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform" />
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-2xl">{m.icon}</span>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-lg font-black tracking-wide">{m.name}</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/85">{m.desc}</p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition">
                  <span>Acessar</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ── Whirlpool agenda ──
  if (modo === "whirlpool") {
    const rows = atendimentos.atendimentos;
    const shiftAgendaDate = (days: number) => {
      const [y, m, d] = (agendaDate || new Date().toISOString().slice(0, 10)).split("-").map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1);
      dt.setDate(dt.getDate() + days);
      setAgendaDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
    };
    const formatAgendaDateLong = (iso: string) => {
      if (!iso) return "";
      const [y, m, d] = iso.split("-").map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1);
      const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
      const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      return `${dias[dt.getDay()]}, ${String(dt.getDate()).padStart(2, "0")} ${meses[dt.getMonth()]} ${dt.getFullYear()}`;
    };
    const isToday = agendaDate === new Date().toISOString().slice(0, 10);
    const agendaDateObj = (() => {
      const [y, m, d] = (agendaDate || new Date().toISOString().slice(0, 10)).split("-").map(Number);
      return new Date(y, (m || 1) - 1, d || 1);
    })();
    const setAgendaDateFromObj = (dt: Date | undefined) => {
      if (!dt) return;
      setAgendaDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
    };
    const q = agendaSearch.trim().toLowerCase();
    const filtered = q ? rows.filter((r) => [r.numero_os, r.cliente_nome ?? "", r.tipo, (r.dados as { consumidor?: string })?.consumidor ?? ""].join(" ").toLowerCase().includes(q)) : rows;
    const naoAgendados = filtered.filter((r) => r.status === "nao_agendado");
    const agendadosManha = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "manha");
    const agendadosTarde = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "tarde");
    const concluidos = filtered.filter((r) => r.status === "concluido");

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
        {sharedOverlays}
        {saveSituacaoOpen && (
          <SaveSituacaoModal
            numeroOS={whirlpool.numeroOS}
            onSave={saveWhirlpoolAtendimento}
            onCancel={() => { setSaveSituacaoOpen(false); setPostSaveAction(null); }}
          />
        )}

        <AppHeader
          title="Agenda Whirlpool"
          subtitle={`Vox Grupo · ${userEmail ?? ""}`}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onBack={() => requestLeave(() => setModo("home"), "Você tem alterações não salvas. Sair para o menu inicial?")}
          onOpenList={openList}
          onSignOut={() => requestLeave(() => { void signOut(); }, "Você tem alterações não salvas. Deseja sair mesmo assim?")}
          isInstalled={isInstalled}
          onInstall={handleInstall}
          extraActions={
            <>
              {pdfUploading && (
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                  <Upload className="h-4 w-4 animate-pulse" /> Lendo PDF...
                </span>
              )}
              <button
                onClick={() => requestLeave(() => { void novoAtendimentoAutoSave(); }, "Criar novo atendimento vai descartar as alterações. Continuar?")}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <Plus className="h-4 w-4" /> Novo atendimento
              </button>
            </>
          }
        >
          {/* Date navigation in header */}
          <div className="ml-3 hidden items-center gap-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-3 py-2 text-white shadow-lg ring-2 ring-amber-300/40 md:flex">
            <button onClick={() => shiftAgendaDate(-1)} className="rounded-lg bg-white/15 p-1.5 hover:bg-white/25" title="Dia anterior">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="flex cursor-pointer flex-col items-center px-3 leading-tight text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? "text-amber-300" : "text-white/80"}`}>
                    {isToday ? "★ Hoje" : "Agenda"}
                  </span>
                  <span className="whitespace-nowrap text-base font-extrabold tracking-tight md:text-lg drop-shadow">
                    {formatAgendaDateLong(agendaDate)}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-auto p-0 pointer-events-auto">
                <CalendarUI mode="single" selected={agendaDateObj} onSelect={setAgendaDateFromObj} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            <button onClick={() => shiftAgendaDate(1)} className="rounded-lg bg-white/15 p-1.5 hover:bg-white/25" title="Próximo dia">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </AppHeader>

        <main className="mx-auto max-w-[1600px] p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={agendaSearch} onChange={(e) => setAgendaSearch(e.target.value)} placeholder="Buscar atendimentos por OS, cliente, endereço..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm dark:text-slate-100 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition" />
            </div>
            {/* Mobile date nav */}
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={() => shiftAgendaDate(-1)} className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition" aria-label="Dia anterior"><ChevronLeft className="h-4 w-4" /></button>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="flex flex-1 items-center gap-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition" aria-label="Escolher data">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="flex-1 text-left font-medium">{formatAgendaDateLong(agendaDate)}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0 pointer-events-auto">
                  <CalendarUI mode="single" selected={agendaDateObj} onSelect={setAgendaDateFromObj} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
              <button onClick={() => shiftAgendaDate(1)} className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition" aria-label="Próximo dia"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="relative">
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs shadow-sm">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Situação:</span>
              {(["concluido", "em_aberto", "realizar_pedido", "cancelado"] as const).map((s) => {
                const st = SITUACAO_STYLE[s];
                return (
                  <span key={s} className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${st.badge}`}>
                    <span className={`h-2 w-2 rounded-full ${st.dot}`} />{st.label}
                  </span>
                );
              })}
            </div>
            <button onClick={() => shiftAgendaDate(-1)} className="absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md transition hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-700 md:inline-flex" aria-label="Dia anterior"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={() => shiftAgendaDate(1)} className="absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md transition hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-700 md:inline-flex" aria-label="Próximo dia"><ChevronRight className="h-6 w-6" /></button>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <AgendaDropZone title="Não agendados" icon={<Upload className="h-4 w-4 text-slate-500" />} count={naoAgendados.length} onDrop={(id) => void unschedule(id)} onPdfDrop={(file) => void handlePdfUpload(file, { status: "nao_agendado" })}>
                {naoAgendados.map((r) => (
                  <AgendaCard key={r.id} row={r} onEdit={() => openAtendimento(r.id)} onDelete={() => void deleteAtendimentoHandler(r.id)} onMoveToDate={(iso) => void moveToDate(r.id, iso)} onUpdateTag={(tag) => void updateTagAgenda(r.id, tag)} />
                ))}
              </AgendaDropZone>
              <AgendaDropZone title="Manhã" icon={<Sun className="h-4 w-4 text-amber-500" />} count={agendadosManha.length} onDrop={(id) => void scheduleTo(id, "manha")} onPdfDrop={(file) => void handlePdfUpload(file, { status: "agendado", periodo: "manha" })}>
                {agendadosManha.map((r) => (
                  <AgendaCard key={r.id} row={r} onEdit={() => openAtendimento(r.id)} onDelete={() => void deleteAtendimentoHandler(r.id)} onUnschedule={() => void unschedule(r.id)} onMoveToDate={(iso) => void moveToDate(r.id, iso)} onUpdateTag={(tag) => void updateTagAgenda(r.id, tag)} />
                ))}
              </AgendaDropZone>
              <AgendaDropZone title="Tarde" icon={<Moon className="h-4 w-4 text-indigo-500" />} count={agendadosTarde.length} onDrop={(id) => void scheduleTo(id, "tarde")} onPdfDrop={(file) => void handlePdfUpload(file, { status: "agendado", periodo: "tarde" })}>
                {agendadosTarde.map((r) => (
                  <AgendaCard key={r.id} row={r} onEdit={() => openAtendimento(r.id)} onDelete={() => void deleteAtendimentoHandler(r.id)} onUnschedule={() => void unschedule(r.id)} onMoveToDate={(iso) => void moveToDate(r.id, iso)} onUpdateTag={(tag) => void updateTagAgenda(r.id, tag)} />
                ))}
              </AgendaDropZone>
            </div>
          </div>

          {concluidos.length > 0 && (
            <section className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Concluídos
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {concluidos.map((r) => (
                  <AgendaCard key={r.id} row={r} onEdit={() => openAtendimento(r.id)} onDelete={() => void deleteAtendimentoHandler(r.id)} />
                ))}
              </div>
            </section>
          )}

          {tipo === "whirlpool" && (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
              <aside className="space-y-6 rounded-lg border border-border dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm print:hidden">
                <WhirlpoolForm data={whirlpool} setData={setWhirlpool} inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />
                {isWhirlpoolDirty && (
                  <div className="flex items-center gap-2 rounded-md border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    Alterações não salvas — clique em <span className="underline">Salvar na agenda</span> antes de sair.
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => { if (!whirlpool.numeroOS.trim()) { toast.error("Informe o Nº OS antes de salvar."); return; } setSaveSituacaoOpen(true); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                    <Save className="h-4 w-4" /> Salvar na agenda
                  </button>
                  <button onClick={() => handlePrint()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-900 dark:bg-slate-200 dark:text-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-300 transition">
                    <Printer className="h-4 w-4" /> Salvar PDF
                  </button>
                </div>
              </aside>
              <main className="overflow-x-auto">
                <WhirlpoolPreview data={whirlpool} />
              </main>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ── Parecer (VOX / HISENSE / ASSURANT) ──
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <AppHeader
        title={`Parecer ${tipo === "vox" ? "VOX" : tipo === "hisense" ? "HISENSE / GORENJE" : "ASSURANT"}`}
        subtitle={`Vox Grupo · ${userEmail ?? ""}`}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onBack={() => requestLeave(() => setModo("home"), "Você tem alterações não salvas. Trocar de modelo mesmo assim?")}
        onOpenList={openList}
        onSignOut={() => requestLeave(() => { void signOut(); }, "Você tem alterações não salvas. Deseja sair mesmo assim?")}
        isInstalled={isInstalled}
        onInstall={handleInstall}
        extraActions={
          <div className="hidden lg:flex items-center gap-2">
            {tipo === "vox" && (
              <select value={themeId} onChange={(e) => setThemeId(e.target.value)} className="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 px-3 text-xs font-semibold">
                {THEMES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
            <button onClick={saveParecer} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 active:scale-95 transition">
              <Save className="h-4 w-4" /> Salvar
            </button>
            <button onClick={() => handlePrint()} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white px-4 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition">
              <Printer className="h-4 w-4" /> Salvar PDF
            </button>
          </div>
        }
      />
      {sharedOverlays}

      {saveMsg && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-emerald-700 dark:text-emerald-400">{saveMsg}</span>
        </div>
      )}

      {/* Mobile Sticky Action Bar for Parecer Mode */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-2 border-t border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3 backdrop-blur-md lg:hidden shadow-xl print:hidden">
        {tipo === "vox" && (
          <select
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 px-2.5 text-xs font-semibold shadow-2xs"
          >
            {THEMES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        )}
        <button
          onClick={saveParecer}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 active:scale-95 transition"
        >
          <Save className="h-4 w-4" />
          <span>Salvar</span>
        </button>
        <button
          onClick={() => handlePrint()}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white px-3 text-xs font-bold shadow-2xs hover:bg-indigo-700 active:scale-95 transition"
        >
          <Printer className="h-4 w-4" />
          <span>Salvar PDF</span>
        </button>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-3 sm:p-6 pb-20 lg:pb-6 lg:grid-cols-[420px_1fr] print:block print:p-0">
        <aside className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4 sm:p-5 shadow-2xs backdrop-blur-xs print:hidden">
          {tipo === "vox"      && <VoxForm      data={data}     setData={setData}     inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />}
          {tipo === "hisense"  && <HisenseForm  data={hisense}  setData={setHisense}  inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />}
          {tipo === "assurant" && <AssurantForm data={assurant} setData={setAssurant} inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />}
        </aside>
        <main className="overflow-x-auto">
          {tipo === "vox"      && <ParecerPreview  data={data}     theme={theme_obj} />}
          {tipo === "hisense"  && <HisensePreview  data={hisense} />}
          {tipo === "assurant" && <AssurantPreview data={assurant} />}
        </main>
      </div>
    </div>
  );
}
