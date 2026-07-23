import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Download,
  Printer,
  Save,
  FolderOpen,
  LogOut,
  ArrowLeft,
  Camera,
  X,
  Search,
  Calendar,
  Upload,
  GripVertical,
  Clock,
  Sun,
  Moon,
  CheckCircle2,
  Trash2,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ParecerPreview from "@/components/ParecerPreview";
import HisensePreview from "@/components/HisensePreview";
import AssurantPreview from "@/components/AssurantPreview";
import WhirlpoolPreview from "@/components/WhirlpoolPreview";
import SignaturePad from "@/components/SignaturePad";
import AttachmentField from "@/components/AttachmentField";
import { supabase } from "@/integrations/supabase/client";
import {
  THEMES,
  defaultParecer,
  emptyItem,
  type ParecerData,
  type OrcamentoItem,
} from "@/lib/parecer-types";
import {
  defaultHisense,
  defaultAssurant,
  defaultWhirlpool,
  emptyWhirlpoolPeca,
  fileToCompressedDataUrl,
  type HisenseData,
  type AssurantData,
  type WhirlpoolData,
  type WhirlpoolPeca,
  type ParecerTipo,
} from "@/lib/parecer-extras";
import {
  listarAtendimentos,
  salvarAtendimento,
  atualizarStatusAtendimento,
  deletarAtendimento,
} from "@/lib/atendimentos.functions";
import { extrairDadosWhirlpool } from "@/lib/pdf-extract.functions";
import { toast } from "sonner";

const SITUACAO_LABEL: Record<string, string> = {
  em_aberto: "Em aberto",
  concluido: "Concluído",
  realizar_pedido: "Realizar pedido",
  cancelado: "Cancelado",
};

const SITUACAO_STYLE: Record<string, { border: string; bg: string; badge: string; dot: string; label: string }> = {
  em_aberto: { border: "border-amber-400", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-800", dot: "bg-amber-500", label: "Em aberto" },
  concluido: { border: "border-emerald-500", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500", label: "Concluído" },
  realizar_pedido: { border: "border-sky-500", bg: "bg-sky-50", badge: "bg-sky-100 text-sky-800", dot: "bg-sky-500", label: "Realizar pedido" },
  cancelado: { border: "border-rose-500", bg: "bg-rose-50", badge: "bg-rose-100 text-rose-700", dot: "bg-rose-500", label: "Cancelado" },
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "description", content: "Gere pareceres técnicos profissionais VOX, HISENSE, ASSURANT e WHIRLPOOL, com agenda e extração de PDF." },
      { property: "og:title", content: "Gerador de Parecer Técnico — Vox Grupo" },
      { property: "og:description", content: "Gere pareceres técnicos profissionais VOX, HISENSE, ASSURANT e WHIRLPOOL, com agenda e extração de PDF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "twitter:description", content: "Gere pareceres técnicos profissionais VOX, HISENSE, ASSURANT e WHIRLPOOL, com agenda e extração de PDF." },
    ],
  }),
  component: Index,
});

function Index() {
  const [modo, setModo] = useState<"home" | "parecer" | "whirlpool">("home");
  const [tipo, setTipo] = useState<ParecerTipo | null>(null);
  const [data, setData] = useState<ParecerData>(defaultParecer);
  const [hisense, setHisense] = useState<HisenseData>(defaultHisense);
  const [assurant, setAssurant] = useState<AssurantData>(defaultAssurant);
  const [whirlpool, setWhirlpool] = useState<WhirlpoolData>(defaultWhirlpool);
  const [whirlpoolAtendimentoId, setWhirlpoolAtendimentoId] = useState<string | null>(null);
  const [whirlpoolBaseline, setWhirlpoolBaseline] = useState<string>(() =>
    JSON.stringify(defaultWhirlpool),
  );
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installMessage, setInstallMessage] = useState("");
  const [isInstalled, setIsInstalled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [savedList, setSavedList] = useState<Array<{ id: string; numero_os: string; cliente_nome: string | null; updated_at: string; tipo: string }>>([]);
  const [showList, setShowList] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [agendaSearch, setAgendaSearch] = useState("");
  const [agendaDate, setAgendaDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [saveSituacaoOpen, setSaveSituacaoOpen] = useState(false);
  const [leaveGuard, setLeaveGuard] = useState<{ action: () => void; message: string } | null>(null);
  const [postSaveAction, setPostSaveAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  const isWhirlpoolDirty =
    modo === "whirlpool" &&
    tipo === "whirlpool" &&
    JSON.stringify(whirlpool) !== whirlpoolBaseline;

  const confirmLeaveIfDirty = (message?: string) => {
    // Legacy sync guard kept as no-op fallback — modal-based requestLeave handles UX.
    return !isWhirlpoolDirty;
  };

  const requestLeave = (action: () => void, message?: string) => {
    if (!isWhirlpoolDirty) {
      action();
      return;
    }
    setLeaveGuard({
      action,
      message:
        message ??
        "Você tem alterações não salvas neste atendimento. O que deseja fazer?",
    });
  };

  const discardWhirlpoolChanges = () => {
    try {
      const base = JSON.parse(whirlpoolBaseline) as WhirlpoolData;
      setWhirlpool(base);
    } catch {
      setWhirlpool(defaultWhirlpool);
    }
  };

  useEffect(() => {
    if (!isWhirlpoolDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isWhirlpoolDirty]);

  const fetchAtendimentos = useServerFn(listarAtendimentos);
  const saveAtendimento = useServerFn(salvarAtendimento);
  const moveAtendimento = useServerFn(atualizarStatusAtendimento);
  const removeAtendimento = useServerFn(deletarAtendimento);
  const extractPdf = useServerFn(extrairDadosWhirlpool);

  const atendimentosQuery = useQuery({
    queryKey: ["atendimentos"],
    queryFn: fetchAtendimentos,
    enabled: authChecked && modo === "whirlpool",
  });

  useEffect(() => {
    if (modo === "whirlpool") {
      setAgendaDate(new Date().toISOString().split("T")[0]);
    }
  }, [modo]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth" });
      } else {
        setUserEmail(data.session.user.email ?? null);
        setAuthChecked(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) navigate({ to: "/auth" });
      else setUserEmail(session.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadList = async () => {
    let query = supabase
      .from("pareceres")
      .select("id, numero_os, cliente_nome, updated_at, tipo")
      .order("updated_at", { ascending: false });
    if (tipo) query = query.eq("tipo", tipo);
    const { data: rows, error } = await query;
    if (!error && rows) setSavedList(rows);
  };

  const openList = async () => {
    setSearchTerm("");
    await loadList();
    setShowList(true);
  };

  const saveParecer = async () => {
    if (!tipo) return;
    const numeroOS =
      tipo === "vox" ? data.numeroOS : tipo === "hisense" ? hisense.numeroOS : tipo === "assurant" ? assurant.sinistro : whirlpool.numeroOS;
    const clienteNome =
      tipo === "vox" ? data.clienteNome : tipo === "hisense" ? hisense.clienteNome : tipo === "assurant" ? `Sinistro ${assurant.sinistro}` : whirlpool.consumidor;
    const payload = tipo === "vox" ? data : tipo === "hisense" ? hisense : tipo === "assurant" ? assurant : whirlpool;
    if (!numeroOS.trim()) {
      setSaveMsg("Informe o Nº OS antes de salvar.");
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { error } = await supabase.from("pareceres").upsert(
      {
        user_id: userData.user.id,
        numero_os: numeroOS.trim(),
        cliente_nome: clienteNome || null,
        tipo,
        data: payload as unknown as never,
      },
      { onConflict: "user_id,tipo,numero_os" },
    );
    setSaveMsg(error ? `Erro: ${error.message}` : `Parecer OS ${numeroOS} salvo com sucesso.`);
    setTimeout(() => setSaveMsg(""), 4000);
  };

  const loadParecer = async (id: string) => {
    const { data: row, error } = await supabase.from("pareceres").select("data, tipo").eq("id", id).maybeSingle();
    if (!error && row) {
      const t = row.tipo as ParecerTipo;
      if (t === "whirlpool") {
        setWhirlpool(row.data as unknown as WhirlpoolData);
        setWhirlpoolAtendimentoId(id);
        setWhirlpoolBaseline(JSON.stringify(row.data));
        setTipo("whirlpool");
        setModo("whirlpool");
      } else {
        setTipo(t);
        setModo("parecer");
        if (t === "vox") setData(row.data as unknown as ParecerData);
        else if (t === "hisense") setHisense(row.data as unknown as HisenseData);
        else setAssurant(row.data as unknown as AssurantData);
      }
      setShowList(false);
    }
  };

  const deleteParecer = async (id: string) => {
    if (!confirm("Excluir este parecer?")) return;
    await supabase.from("pareceres").delete().eq("id", id);
    await loadList();
  };

  const signOut = async () => {
    requestLeave(async () => {
      await supabase.auth.signOut();
      navigate({ to: "/auth" });
    }, "Você tem alterações não salvas neste atendimento. O que deseja fazer antes de sair da conta?");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true);

    if (standalone) {
      setIsInstalled(true);
      setInstallMessage("App já instalado neste dispositivo.");
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallMessage("Pronto para instalar neste navegador.");
    };

    const onInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
      setInstallMessage("App instalado com sucesso.");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (isInstalled) {
      setInstallMessage("App já instalado neste dispositivo.");
      return;
    }

    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstallMessage("Instalação iniciada.");
        setInstallPrompt(null);
      } else {
        setInstallMessage("Instalação cancelada. Você pode tentar novamente pelo botão.");
      }
      return;
    }

    const isAppleMobile = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    setInstallMessage(
      isAppleMobile
        ? "No iPhone/iPad: toque em Compartilhar e depois em Adicionar à Tela de Início."
        : "Se o aviso não abrir, publique/abra o link público e use o menu do navegador em Instalar app.",
    );
  };

  const formatDate = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

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

  const addItem = () => setData((d) => ({ ...d, itens: [...d.itens, emptyItem()] }));
  const removeItem = (i: number) =>
    setData((d) => ({ ...d, itens: d.itens.filter((_, idx) => idx !== i) }));

  const updWhirlpool = <K extends keyof WhirlpoolData>(k: K, v: WhirlpoolData[K]) =>
    setWhirlpool((d) => ({ ...d, [k]: v }));

  const updWhirlpoolPeca = (i: number, k: keyof WhirlpoolPeca, v: string) =>
    setWhirlpool((d) => {
      const pecas = [...d.pecas];
      pecas[i] = { ...pecas[i], [k]: v };
      return { ...d, pecas };
    });

  const addWhirlpoolPeca = () =>
    setWhirlpool((d) => ({ ...d, pecas: [...d.pecas, emptyWhirlpoolPeca()] }));
  const removeWhirlpoolPeca = (i: number) =>
    setWhirlpool((d) => ({ ...d, pecas: d.pecas.filter((_, idx) => idx !== i) }));

  const handlePdfUpload = async (
    file: File,
    target?: { status: "nao_agendado" | "agendado"; periodo?: "manha" | "tarde" },
  ) => {
    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Envie um arquivo PDF.");
      return;
    }
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
      const existente = atendimentosQuery.data?.find(
        (a) => a.tipo === "whirlpool" && a.numero_os.trim() === numeroOsNovo,
      );
      if (existente) {
        const [ay, am, ad] = agendaDate.split("-");
        const dataBR = ay && am && ad ? `${ad}/${am}/${ay}` : agendaDate;
        const destino =
          status === "agendado"
            ? `${dataBR} — ${periodo === "manha" ? "Manhã" : "Tarde"}`
            : "Não agendados";
        const ok = window.confirm(
          `Já existe um atendimento com a OS ${numeroOsNovo} na sua agenda.\n\nDeseja atualizar esse atendimento para:\n${destino}?\n\n(Cancelar mantém o atendimento existente sem alterações.)`,
        );
        if (!ok) {
          setPdfUploading(false);
          return;
        }
        await saveAtendimento({
          data: {
            id: existente.id,
            numero_os: numeroOsNovo,
            tipo: "whirlpool",
            cliente_nome: extracted.consumidor || existente.cliente_nome || null,
            dados: dadosFinal as unknown as Record<string, unknown>,
            status,
            data_agenda: status === "agendado" ? agendaDate : "",
            periodo: status === "agendado" ? (periodo as "manha" | "tarde") : "",
          },
        });
        queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
        toast.success(`OS ${numeroOsNovo} atualizada.`);
        return;
      }
      const novo = await saveAtendimento({
        data: {
          numero_os: extracted.numeroOS || "SEM-OS",
          tipo: "whirlpool",
          cliente_nome: extracted.consumidor || null,
          dados: dadosFinal as unknown as Record<string, unknown>,
          status,
          data_agenda: status === "agendado" ? agendaDate : "",
          periodo: status === "agendado" ? (periodo as "manha" | "tarde") : "",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
      toast.success(
        status === "agendado"
          ? `OS ${extracted.numeroOS || novo.numero_os} agendada no período da ${periodo === "manha" ? "manhã" : "tarde"}.`
          : `OS ${extracted.numeroOS || novo.numero_os} adicionada aos não agendados.`,
      );
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Erro ao processar PDF.");
    } finally {
      setPdfUploading(false);
    }
  };

  const openAtendimento = (id: string) => {
    const row = atendimentosQuery.data?.find((a) => a.id === id);
    if (!row) return;
    requestLeave(() => {
      const dados = (row.dados as unknown as WhirlpoolData) ?? defaultWhirlpool;
      setWhirlpool(dados);
      setWhirlpoolBaseline(JSON.stringify(dados));
      setWhirlpoolAtendimentoId(row.id);
      setTipo("whirlpool");
      setModo("whirlpool");
    }, "Abrir outro atendimento vai descartar as alterações não salvas do atual. O que deseja fazer?");
  };

  const saveWhirlpoolAtendimento = async (
    situacao: "em_aberto" | "concluido" | "realizar_pedido" | "cancelado",
  ) => {
    if (!whirlpool.numeroOS.trim()) {
      toast.error("Informe o Nº OS antes de salvar.");
      return;
    }
    const osTrim = whirlpool.numeroOS.trim();
    let idAlvo = whirlpoolAtendimentoId ?? undefined;
    if (!idAlvo) {
      const existente = atendimentosQuery.data?.find(
        (a) => a.tipo === "whirlpool" && a.numero_os.trim() === osTrim,
      );
      if (existente) {
        const ok = window.confirm(
          `Já existe um atendimento com a OS ${osTrim} na sua agenda.\n\nDeseja substituir o atendimento existente pelos dados atuais?\n\n(Cancelar mantém o atendimento existente sem alterações.)`,
        );
        if (!ok) {
          setSaveSituacaoOpen(false);
          return;
        }
        idAlvo = existente.id;
      }
    }
    const result = await saveAtendimento({
      data: {
        id: idAlvo,
        numero_os: osTrim,
        tipo: "whirlpool",
        cliente_nome: whirlpool.consumidor || null,
        dados: whirlpool as unknown as Record<string, unknown>,
        status: "agendado",
        data_agenda: agendaDate,
        periodo: whirlpool.periodo === "MANHÃ" ? "manha" : whirlpool.periodo === "TARDE" ? "tarde" : "",
        situacao,
      },
    });
    setWhirlpoolAtendimentoId(result.id);
    setWhirlpoolBaseline(JSON.stringify(whirlpool));
    setSaveSituacaoOpen(false);
    queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
    toast.success(`Atendimento ${whirlpool.numeroOS} salvo como ${SITUACAO_LABEL[situacao]}.`);
    if (postSaveAction) {
      const act = postSaveAction;
      setPostSaveAction(null);
      act();
    }
  };

  const scheduleTo = async (id: string, periodo: "manha" | "tarde") => {
    const row = atendimentosQuery.data?.find((a) => a.id === id);
    const dadosAtuais = (row?.dados as Record<string, unknown> | undefined) ?? {};
    const [y, m, d] = agendaDate.split("-");
    const dataBR = y && m && d ? `${d}/${m}/${y}` : "";
    const periodoLabel = periodo === "manha" ? "MANHÃ" : "TARDE";
    const novosDados = { ...dadosAtuais, dataAgenda: dataBR, periodo: periodoLabel };
    if (row) {
      await saveAtendimento({
        data: {
          id,
          numero_os: row.numero_os,
          tipo: row.tipo,
          cliente_nome: row.cliente_nome ?? null,
          dados: novosDados,
          status: "agendado",
          data_agenda: agendaDate,
          periodo,
        },
      });
    } else {
      await moveAtendimento({ data: { id, status: "agendado", data_agenda: agendaDate, periodo } });
    }
    if (whirlpoolAtendimentoId === id) {
      setWhirlpool((d) => ({ ...d, dataAgenda: dataBR, periodo: periodoLabel }));
    }
    queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
    toast.success("Atendimento agendado.");
  };

  const unschedule = async (id: string) => {
    const row = atendimentosQuery.data?.find((a) => a.id === id);
    const dadosAtuais = (row?.dados as Record<string, unknown> | undefined) ?? {};
    const novosDados = { ...dadosAtuais, dataAgenda: "", periodo: "" };
    if (row) {
      await saveAtendimento({
        data: {
          id,
          numero_os: row.numero_os,
          tipo: row.tipo,
          cliente_nome: row.cliente_nome ?? null,
          dados: novosDados,
          status: "nao_agendado",
          data_agenda: "",
          periodo: "",
        },
      });
    } else {
      await moveAtendimento({ data: { id, status: "nao_agendado", data_agenda: "", periodo: "" } });
    }
    if (whirlpoolAtendimentoId === id) {
      setWhirlpool((d) => ({ ...d, dataAgenda: "", periodo: "" }));
    }
    queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
    toast.success("Atendimento movido para não agendados.");
  };

  const deleteAtendimentoHandler = async (id: string) => {
    if (!confirm("Excluir este atendimento?")) return;
    await removeAtendimento({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["atendimentos"] });
    if (whirlpoolAtendimentoId === id) {
      setWhirlpool(defaultWhirlpool);
      setWhirlpoolAtendimentoId(null);
    }
    toast.success("Atendimento excluído.");
  };

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide";

  if (!authChecked) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Carregando...</div>;
  }

  const allSaved = [...savedList];
  const filteredList = searchTerm.trim()
    ? allSaved.filter((r) =>
        [r.numero_os, r.cliente_nome ?? "", r.tipo]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()),
      )
    : allSaved;

  const listModal = showList && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm print:hidden"
      onClick={() => setShowList(false)}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2.5">
              <FolderOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Meus pareceres salvos</h2>
              <p className="text-xs text-white/70">
                {filteredList.length} {filteredList.length === 1 ? "parecer" : "pareceres"} no total
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowList(false)}
            className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por Nº OS, Sinistro, cliente ou tipo..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {savedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-5">
                <FolderOpen className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700">Nenhum parecer salvo ainda</p>
              <p className="mt-1 text-sm text-slate-500">Salve seu primeiro parecer para vê-lo listado aqui.</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-5">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700">Nenhum resultado encontrado</p>
              <p className="mt-1 text-sm text-slate-500">Não encontramos pareceres para "{searchTerm}".</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredList.map((row) => (
                <li
                  key={row.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tipoBadge(row.tipo)}`}>
                        {row.tipo}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {new Date(row.updated_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="text-base font-bold text-slate-900">
                      {row.tipo === "assurant" ? "Sinistro" : "OS"} {row.numero_os}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-600">
                      {row.cliente_nome ?? "Sem cliente informado"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Atualizado {new Date(row.updated_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => loadParecer(row.id)}
                      className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => deleteParecer(row.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      title="Excluir"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  const leaveModal = leaveGuard && (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm print:hidden"
      onClick={() => setLeaveGuard(null)}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
          <div className="rounded-lg bg-white/20 p-2">
            <Save className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold">Alterações não salvas</h3>
            <p className="text-[11px] text-white/85">Proteja seu trabalho antes de sair</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-slate-700">{leaveGuard.message}</p>
          <div className="mt-5 flex flex-col gap-2">
            <button
              onClick={() => {
                if (!whirlpool.numeroOS.trim()) {
                  toast.error("Informe o Nº OS antes de salvar.");
                  return;
                }
                setPostSaveAction(() => leaveGuard.action);
                setLeaveGuard(null);
                setSaveSituacaoOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              <Save className="h-4 w-4" /> Salvar agora
            </button>
            <button
              onClick={() => {
                const act = leaveGuard.action;
                discardWhirlpoolChanges();
                setLeaveGuard(null);
                act();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" /> Descartar alterações e sair
            </button>
            <button
              onClick={() => setLeaveGuard(null)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Continuar editando
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Home screen
  if (modo === "home") {
    return (
      <div className="min-h-screen bg-slate-100">
        {listModal}
        {leaveModal}
        <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Gerador de Parecer Técnico</h1>
            <p className="text-xs text-slate-500">Vox Grupo · {userEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModo("whirlpool")}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Calendar className="h-4 w-4" /> Agenda
            </button>
            <button onClick={openList} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <FolderOpen className="h-4 w-4" /> Meus pareceres
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Escolha o modelo de parecer</h2>
          <p className="mb-8 text-sm text-slate-600">Cada modelo tem layout e campos específicos. O Whirlpool inclui agenda e importação de PDF.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { id: "vox" as const, name: "VOX", desc: "Parecer técnico corporativo Vox — com 6 opções de design e orçamento.", color: "from-blue-600 to-blue-800" },
              { id: "hisense" as const, name: "HISENSE / GORENJE", desc: "Relatório de atendimento com galeria de 8 fotos e medições de tensão.", color: "from-red-600 to-red-800" },
              { id: "assurant" as const, name: "ASSURANT", desc: "Análise técnica de sinistro com fotos do defeito, cotação e residência.", color: "from-slate-700 to-slate-900" },
              { id: "whirlpool" as const, name: "WHIRLPOOL", desc: "Agenda de atendimentos com importação de OS por PDF e laudo técnico.", color: "from-cyan-600 to-blue-700" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  if (m.id === "whirlpool") setModo("whirlpool");
                  else {
                    setTipo(m.id);
                    setModo("parecer");
                  }
                }}
                className={`group rounded-xl bg-gradient-to-br ${m.color} p-6 text-left text-white shadow-lg transition hover:scale-[1.02]`}
              >
                <div className="text-2xl font-extrabold tracking-wide">{m.name}</div>
                <p className="mt-3 text-sm text-white/90">{m.desc}</p>
                <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/90 group-hover:text-white">Abrir →</div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Whirlpool agenda screen
  if (modo === "whirlpool") {
    const rows = atendimentosQuery.data ?? [];
    // Date helpers for the agenda date navigation
    const shiftAgendaDate = (days: number) => {
      const [y, m, d] = (agendaDate || new Date().toISOString().slice(0, 10)).split("-").map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1);
      dt.setDate(dt.getDate() + days);
      const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
      setAgendaDate(iso);
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
    const q = agendaSearch.trim().toLowerCase();
    const filtered = q
      ? rows.filter((r) =>
          [r.numero_os, r.cliente_nome ?? "", r.tipo, (r.dados as { consumidor?: string })?.consumidor ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
      : rows;
    const naoAgendados = filtered.filter((r) => r.status === "nao_agendado");
    const agendadosManha = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "manha");
    const agendadosTarde = filtered.filter((r) => r.status === "agendado" && r.data_agenda === agendaDate && r.periodo === "tarde");
    const concluidos = filtered.filter((r) => r.status === "concluido");

    return (
      <div className="min-h-screen bg-slate-100">
        {listModal}
        {leaveModal}
        <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur print:hidden">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => requestLeave(() => setModo("home"), "Você tem alterações não salvas neste atendimento. Sair para o menu inicial?")} className="rounded-md border border-slate-300 bg-white p-1.5 hover:bg-slate-50" title="Voltar">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Agenda Whirlpool</h1>
                <p className="text-xs text-slate-500">Vox Grupo · {userEmail}</p>
              </div>
              <div className="ml-3 flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-3 py-2 text-white shadow-lg ring-2 ring-amber-300/40">
                <button
                  onClick={() => shiftAgendaDate(-1)}
                  className="rounded-lg bg-white/15 p-1.5 hover:bg-white/25"
                  title="Dia anterior"
                  aria-label="Dia anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <label className="relative flex cursor-pointer flex-col items-center px-3 leading-tight">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? "text-amber-300" : "text-white/80"}`}>
                    {isToday ? "★ Hoje" : "Agenda"}
                  </span>
                  <span className="whitespace-nowrap text-base font-extrabold tracking-tight md:text-lg drop-shadow">
                    {formatAgendaDateLong(agendaDate)}
                  </span>
                  <input
                    type="date"
                    value={agendaDate}
                    onChange={(e) => setAgendaDate(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Escolher data"
                    title="Escolher data"
                  />
                </label>
                <button
                  onClick={() => shiftAgendaDate(1)}
                  className="rounded-lg bg-white/15 p-1.5 hover:bg-white/25"
                  title="Próximo dia"
                  aria-label="Próximo dia"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {pdfUploading && (
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600">
                  <Upload className="h-4 w-4 animate-pulse" /> Lendo PDF...
                </span>
              )}
              <button
                onClick={() => {
                  requestLeave(() => {
                    setWhirlpool(defaultWhirlpool);
                    setWhirlpoolBaseline(JSON.stringify(defaultWhirlpool));
                    setWhirlpoolAtendimentoId(null);
                    setTipo("whirlpool");
                    setModo("whirlpool");
                  }, "Criar um novo atendimento vai descartar as alterações não salvas do atual. Continuar?");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" /> Novo atendimento
              </button>
              <button onClick={openList} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <FolderOpen className="h-4 w-4" /> Meus pareceres
              </button>
              <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          </div>
        </header>

        {!isInstalled && (
          <button
            onClick={handleInstall}
            title={installMessage || "Instalar app no dispositivo"}
            aria-label="Instalar app"
            className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg ring-1 ring-white/40 transition-transform hover:scale-105 hover:shadow-xl print:hidden"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <main className="mx-auto max-w-[1600px] p-6 print:hidden">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={agendaSearch}
                onChange={(e) => setAgendaSearch(e.target.value)}
                placeholder="Buscar atendimentos por OS, cliente, endereço..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => shiftAgendaDate(-1)}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                aria-label="Dia anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-500" />
                <input
                  type="date"
                  value={agendaDate}
                  onChange={(e) => setAgendaDate(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <button
                onClick={() => shiftAgendaDate(1)}
                className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                aria-label="Próximo dia"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
              <span className="font-semibold text-slate-600">Situação:</span>
              {(["concluido", "em_aberto", "realizar_pedido", "cancelado"] as const).map((s) => {
                const st = SITUACAO_STYLE[s];
                return (
                  <span key={s} className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${st.badge}`}>
                    <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>
                );
              })}
            </div>
            <button
              onClick={() => shiftAgendaDate(-1)}
              className="absolute -left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:bg-slate-50 md:inline-flex"
              title="Dia anterior"
              aria-label="Dia anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => shiftAgendaDate(1)}
              className="absolute -right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:scale-105 hover:bg-slate-50 md:inline-flex"
              title="Próximo dia"
              aria-label="Próximo dia"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div
              className="grid grid-cols-1 gap-6 lg:grid-cols-3"
              onTouchStart={(e) => {
                (e.currentTarget as HTMLDivElement).dataset.tx = String(e.touches[0].clientX);
                (e.currentTarget as HTMLDivElement).dataset.ty = String(e.touches[0].clientY);
              }}
              onTouchEnd={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const startX = Number(el.dataset.tx || 0);
                const startY = Number(el.dataset.ty || 0);
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const dx = endX - startX;
                const dy = endY - startY;
                if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  shiftAgendaDate(dx < 0 ? 1 : -1);
                }
              }}
            >
            {/* Não agendados */}
            <DropZone
              title="Não agendados"
              icon={<Upload className="h-4 w-4 text-slate-500" />}
              count={naoAgendados.length}
              onDrop={(id) => unschedule(id)}
              onPdfDrop={(file) => handlePdfUpload(file, { status: "nao_agendado" })}
            >
              {naoAgendados.length === 0 && (
                <p className="text-sm text-slate-500">Arraste um PDF de OS para cá ou um card agendado para desagendar.</p>
              )}
              {naoAgendados.map((r) => (
                <AgendaCard
                  key={r.id}
                  row={r}
                  draggable
                  onEdit={() => openAtendimento(r.id)}
                  onDelete={() => deleteAtendimentoHandler(r.id)}
                />
              ))}
            </DropZone>

            {/* Manhã */}
            <DropZone
              title="Manhã"
              icon={<Sun className="h-4 w-4 text-amber-500" />}
              count={agendadosManha.length}
              onDrop={(id) => scheduleTo(id, "manha")}
              onPdfDrop={(file) => handlePdfUpload(file, { status: "agendado", periodo: "manha" })}
            >
              {agendadosManha.length === 0 && (
                <p className="text-sm text-slate-500">Arraste um card ou um PDF de OS para agendar na manhã.</p>
              )}
              {agendadosManha.map((r) => (
                <AgendaCard
                  key={r.id}
                  row={r}
                  draggable
                  onEdit={() => openAtendimento(r.id)}
                  onDelete={() => deleteAtendimentoHandler(r.id)}
                  onUnschedule={() => unschedule(r.id)}
                />
              ))}
            </DropZone>

            {/* Tarde */}
            <DropZone
              title="Tarde"
              icon={<Moon className="h-4 w-4 text-indigo-500" />}
              count={agendadosTarde.length}
              onDrop={(id) => scheduleTo(id, "tarde")}
              onPdfDrop={(file) => handlePdfUpload(file, { status: "agendado", periodo: "tarde" })}
            >
              {agendadosTarde.length === 0 && (
                <p className="text-sm text-slate-500">Arraste um card ou um PDF de OS para agendar na tarde.</p>
              )}
              {agendadosTarde.map((r) => (
                <AgendaCard
                  key={r.id}
                  row={r}
                  draggable
                  onEdit={() => openAtendimento(r.id)}
                  onDelete={() => deleteAtendimentoHandler(r.id)}
                  onUnschedule={() => unschedule(r.id)}
                />
              ))}
            </DropZone>
          </div>
          </div>

          {/* Concluídos */}
          {concluidos.length > 0 && (
            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Concluídos
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {concluidos.map((r) => (
                  <AgendaCard
                    key={r.id}
                    row={r}
                    onEdit={() => openAtendimento(r.id)}
                    onDelete={() => deleteAtendimentoHandler(r.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Whirlpool form inline */}
          {tipo === "whirlpool" && (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
              <aside className="space-y-6 rounded-lg border border-border bg-white p-5 shadow-sm print:hidden">
                <WhirlpoolForm data={whirlpool} setData={setWhirlpool} inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />
                {isWhirlpoolDirty && (
                  <div className="flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    Alterações não salvas — clique em <span className="underline">Salvar na agenda</span> antes de sair.
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!whirlpool.numeroOS.trim()) {
                        toast.error("Informe o Nº OS antes de salvar.");
                        return;
                      }
                      setSaveSituacaoOpen(true);
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <Save className="h-4 w-4" /> Salvar na agenda
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Printer className="h-4 w-4" /> Imprimir
                  </button>
                </div>
              </aside>
              <main className="overflow-x-auto">
                <WhirlpoolPreview data={whirlpool} />
              </main>
            </div>
          )}

          {saveSituacaoOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Salvar atendimento como…</h3>
                  <p className="mt-1 text-xs text-slate-500">Escolha a situação do atendimento OS {whirlpool.numeroOS}.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {(["concluido", "em_aberto", "realizar_pedido", "cancelado"] as const).map((s) => {
                    const st = SITUACAO_STYLE[s];
                    return (
                      <button
                        key={s}
                        onClick={() => saveWhirlpoolAtendimento(s)}
                        className={`flex items-center justify-between rounded-lg border-2 ${st.border} ${st.bg} px-4 py-3 text-left transition hover:brightness-95`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`h-3 w-3 rounded-full ${st.dot}`} />
                          <span className="text-sm font-semibold text-slate-900">{st.label}</span>
                        </span>
                        <Save className="h-4 w-4 text-slate-500" />
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => { setSaveSituacaoOpen(false); setPostSaveAction(null); }}
                  className="mt-4 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Parecer screen (vox/hisense/assurant)
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <div className="flex items-center gap-3">
              <button onClick={() => requestLeave(() => setModo("home"), "Você tem alterações não salvas. Trocar de modelo mesmo assim?")} className="rounded-md border border-slate-300 bg-white p-1.5 hover:bg-slate-50" title="Trocar modelo">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h1 className="text-lg font-bold text-slate-900">
                Parecer {tipo === "vox" ? "VOX" : tipo === "hisense" ? "HISENSE / GORENJE" : "ASSURANT"}
              </h1>
            </div>
            <p className="text-xs text-slate-500">Vox Grupo · {userEmail}</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            {tipo === "vox" && <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>}
            <button
              onClick={saveParecer}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Salvar
            </button>
            <button
              onClick={openList}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              Meus pareceres
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Imprimir / PDF
            </button>
            <button
              onClick={signOut}
              title="Sair"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-2 text-xs text-slate-600">
          {tipo === "vox" ? (
            <><span className="font-semibold">Design ativo:</span> {theme.name} — {theme.description}</>
          ) : (
            <><span className="font-semibold">Modelo:</span> {tipo === "hisense" ? "Hisense / Gorenje" : "Assurant"} — layout fixo conforme padrão do fabricante.</>
          )}
          {saveMsg && <span className="ml-3 font-semibold text-emerald-700">{saveMsg}</span>}
        </div>
      </header>

      {listModal}
        {leaveModal}

      {!isInstalled && (
        <button
          onClick={handleInstall}
          title={installMessage || "Instalar app no dispositivo"}
          aria-label="Instalar app"
          className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg ring-1 ring-white/40 transition-transform hover:scale-105 hover:shadow-xl print:hidden"
        >
          <Download className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-6 lg:grid-cols-[420px_1fr] print:block print:p-0">
        {/* FORM */}
        <aside className="space-y-6 rounded-lg border border-border bg-white p-5 shadow-sm print:hidden">
          {tipo === "vox" && (<>
          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Ordem de Serviço</h2>
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
                <input className={inputCls} value={data.dataParecer} onChange={(e) => updDate("dataParecer", e.target.value)} placeholder="DD/MM/AAAA" inputMode="numeric" />
              </div>
            </div>
            <label className={labelCls + " mt-3"}>Garantia</label>
            <input className={inputCls} value={data.garantia} onChange={(e) => upd("garantia", e.target.value)} />
            <label className={labelCls + " mt-3"}>Responsável Técnico</label>
            <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
          </section>
          </>)}

          {tipo === "hisense" && (
            <HisenseForm data={hisense} setData={setHisense} inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />
          )}
          {tipo === "assurant" && (
            <AssurantForm data={assurant} setData={setAssurant} inputCls={inputCls} labelCls={labelCls} formatDate={formatDate} />
          )}
        </aside>

        {/* PREVIEW */}
        <main className="overflow-x-auto">
          {tipo === "vox" && <ParecerPreview data={data} theme={theme} />}
          {tipo === "hisense" && <HisensePreview data={hisense} />}
          {tipo === "assurant" && <AssurantPreview data={assurant} />}
        </main>
      </div>
    </div>
  );
}

function tipoBadge(t: string) {
  if (t === "vox") return "bg-blue-100 text-blue-800";
  if (t === "hisense") return "bg-red-100 text-red-800";
  if (t === "whirlpool") return "bg-cyan-100 text-cyan-800";
  return "bg-slate-200 text-slate-800";
}

// ============ Agenda components ============
function AgendaCard({
  row,
  draggable,
  onEdit,
  onDelete,
  onUnschedule,
  onDragStart,
}: {
  row: { id: string; numero_os: string; cliente_nome: string | null; status: string; data_agenda: string | null; periodo: string | null; dados: unknown; situacao?: string | null };
  draggable?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUnschedule?: () => void;
  onDragStart?: () => void;
}) {
  const dados = (row.dados as { consumidor?: string; endereco?: string; bairro?: string; cidade?: string; produto?: string; periodo?: string }) ?? {};
  const sit = (row.situacao || "em_aberto") as keyof typeof SITUACAO_STYLE;
  const st = SITUACAO_STYLE[sit] ?? SITUACAO_STYLE.em_aberto;
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", `atendimento:${row.id}`);
        onDragStart?.();
      }}
      className={`group cursor-grab rounded-lg border-l-4 ${st.border} border-y border-r border-slate-200 ${st.bg} p-3 shadow-sm transition hover:shadow-md active:cursor-grabbing`}
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {draggable && <GripVertical className="h-3.5 w-3.5 text-slate-400" />}
          <button
            type="button"
            draggable={false}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit();
            }}
            title="Abrir para edição"
            className="inline-flex cursor-pointer items-center gap-1 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white transition hover:bg-cyan-700"
          >
            OS {row.numero_os}
            <FileText className="h-3 w-3" />
          </button>
          <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${st.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onUnschedule && (
            <button onClick={onUnschedule} title="Desagendar" className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              <Clock className="h-3.5 w-3.5" />
            </button>
          )}
          <button onClick={onDelete} title="Excluir" className="rounded p-1 text-slate-500 hover:bg-red-50 hover:text-red-600">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-900">{dados.consumidor || row.cliente_nome || "Sem consumidor"}</p>
      <p className="text-xs text-slate-600 line-clamp-1">{dados.endereco}</p>
      <p className="text-xs text-slate-500 line-clamp-1">
        {dados.bairro} {dados.cidade && `· ${dados.cidade}`}
      </p>
      {dados.produto && <p className="mt-1 text-[10px] font-medium text-cyan-700 line-clamp-1">{dados.produto}</p>}
    </div>
  );
}

function DropZone({
  title,
  icon,
  count,
  children,
  onDrop,
  onPdfDrop,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
  onDrop: (id: string) => void;
  onPdfDrop?: (file: File) => void;
}) {
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
      className={`rounded-xl border-2 p-4 shadow-sm transition ${dragOver ? "border-cyan-500 bg-cyan-50/50" : "border-slate-200 bg-white"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900">
          {icon} {title}
        </h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// ============ Whirlpool Form ============
function WhirlpoolForm({
  data,
  setData,
  inputCls,
  labelCls,
  formatDate,
}: {
  data: WhirlpoolData;
  setData: React.Dispatch<React.SetStateAction<WhirlpoolData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}) {
  const upd = <K extends keyof WhirlpoolData>(k: K, v: WhirlpoolData[K]) => setData((d) => ({ ...d, [k]: v }));
  const updPeca = (i: number, k: keyof WhirlpoolPeca, v: string) =>
    setData((d) => {
      const pecas = [...d.pecas];
      pecas[i] = { ...pecas[i], [k]: v };
      return { ...d, pecas };
    });
  const addPeca = () => setData((d) => ({ ...d, pecas: [...d.pecas, emptyWhirlpoolPeca()] }));
  const removePeca = (i: number) => setData((d) => ({ ...d, pecas: d.pecas.filter((_, idx) => idx !== i) }));

  const [advanced, setAdvanced] = useState(false);
  const toggleAdvanced = () => {
    if (advanced) {
      setAdvanced(false);
      toast.info("Edição avançada bloqueada.");
      return;
    }
    const pwd = window.prompt("Digite a senha de administrador:");
    if (pwd === null) return;
    if (pwd === "V271088") {
      setAdvanced(true);
      toast.success("Edição avançada liberada.");
    } else {
      toast.error("Senha incorreta.");
    }
  };
  const lockCls = advanced ? inputCls : `${inputCls} bg-slate-100 text-slate-500 cursor-not-allowed`;

  return (
    <>
      <div className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
        <div className="text-xs text-amber-900">
          <strong>Modo:</strong>{" "}
          {advanced ? (
            <span className="text-emerald-700">Edição avançada (todos os campos)</span>
          ) : (
            <span>Edição básica (campos limitados)</span>
          )}
        </div>
        <button
          onClick={toggleAdvanced}
          className={`rounded-md px-3 py-1 text-xs font-semibold ${
            advanced ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          {advanced ? "Bloquear edição" : "Edição avançada"}
        </button>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Ordem de Serviço</h2>
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
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Consumidor</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className={labelCls}>Nome</label><input disabled={!advanced} className={lockCls} value={data.consumidor} onChange={(e) => upd("consumidor", e.target.value)} /></div>
          <div><label className={labelCls}>CPF/CNPJ</label><input disabled={!advanced} className={lockCls} value={data.cnpjCpf} onChange={(e) => upd("cnpjCpf", e.target.value)} /></div>
          <div><label className={labelCls}>CEP</label><input disabled={!advanced} className={lockCls} value={data.cep} onChange={(e) => upd("cep", e.target.value)} /></div>
          <div className="col-span-2"><label className={labelCls}>Endereço</label><input disabled={!advanced} className={lockCls} value={data.endereco} onChange={(e) => upd("endereco", e.target.value)} /></div>
          <div><label className={labelCls}>Complemento</label><input disabled={!advanced} className={lockCls} value={data.complemento} onChange={(e) => upd("complemento", e.target.value)} /></div>
          <div><label className={labelCls}>Bairro</label><input disabled={!advanced} className={lockCls} value={data.bairro} onChange={(e) => upd("bairro", e.target.value)} /></div>
          <div><label className={labelCls}>Cidade</label><input disabled={!advanced} className={lockCls} value={data.cidade} onChange={(e) => upd("cidade", e.target.value)} /></div>
          <div><label className={labelCls}>UF</label><input disabled={!advanced} className={lockCls} value={data.uf} onChange={(e) => upd("uf", e.target.value)} /></div>
          <div className="col-span-2"><label className={labelCls}>Telefones</label><input disabled={!advanced} className={lockCls} value={`${data.foneResidencia} ${data.foneComercial} ${data.foneOutros}`.trim()} onChange={(e) => upd("foneOutros", e.target.value)} /></div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Produto</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Produto</label><input className={inputCls} value={data.produto} onChange={(e) => upd("produto", e.target.value)} /></div>
          <div><label className={labelCls}>Marca</label><input className={inputCls} value={data.marca} onChange={(e) => upd("marca", e.target.value)} /></div>
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
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Anexos do Atendimento</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <AttachmentField
            label="Nota Fiscal"
            value={data.anexoNotaFiscal}
            onChange={(v) => upd("anexoNotaFiscal", v)}
            accent="emerald"
          />
          <AttachmentField
            label="Etiqueta"
            value={data.anexoEtiqueta}
            onChange={(v) => upd("anexoEtiqueta", v)}
            accent="blue"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">Peças / Orçamento</h2>
          <button onClick={addPeca} className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold hover:bg-slate-100">+ Peça</button>
        </div>
        <div className="space-y-3">
          {data.pecas.map((p, i) => (
            <div key={i} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Peça #{i + 1}</span>
                {data.pecas.length > 1 && (
                  <button onClick={() => removePeca(i)} className="text-xs text-red-600 hover:underline">Remover</button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="Qtd" className={inputCls} value={p.quantidade} onChange={(e) => updPeca(i, "quantidade", e.target.value)} />
                <input placeholder="Código" className={inputCls} value={p.codigo} onChange={(e) => updPeca(i, "codigo", e.target.value)} />
                <input placeholder="Valor" className={inputCls} value={p.valor} onChange={(e) => updPeca(i, "valor", e.target.value)} />
                <input placeholder="FCTA" className={inputCls} value={p.fcta} onChange={(e) => updPeca(i, "fcta", e.target.value)} />
                <input placeholder="OCOR" className={inputCls} value={p.ocor} onChange={(e) => updPeca(i, "ocor", e.target.value)} />
              </div>
              <input placeholder="Descrição" className={`${inputCls} mt-2 w-full`} value={p.descricao} onChange={(e) => updPeca(i, "descricao", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Total Peças</label><input className={inputCls} value={data.totalPecas} onChange={(e) => upd("totalPecas", e.target.value)} /></div>
          <div><label className={labelCls}>Mão de Obra</label><input className={inputCls} value={data.maoDeObra} onChange={(e) => upd("maoDeObra", e.target.value)} /></div>
          <div><label className={labelCls}>Total Orçamento</label><input disabled={!advanced} className={lockCls} value={data.totalOrcamento} onChange={(e) => upd("totalOrcamento", e.target.value)} /></div>
          <div><label className={labelCls}>Valor Orçamento</label><input disabled={!advanced} className={lockCls} value={data.valorOrcamento} onChange={(e) => upd("valorOrcamento", e.target.value)} /></div>
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

// ============ HISENSE FORM ============
function PhotoField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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
    <div className="rounded-md border border-slate-200 p-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase text-slate-600">{label}</span>
        {value && (
          <button onClick={() => onChange("")} className="text-red-600 hover:text-red-800" title="Remover">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      {value ? (
        <img src={value} alt={label} className="h-24 w-full rounded object-cover" />
      ) : (
        <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100">
          <Camera className="h-5 w-5" />
          <span className="text-[10px]">{busy ? "Processando..." : "Tirar foto / anexar"}</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}

function HisenseForm({
  data, setData, inputCls, labelCls, formatDate,
}: {
  data: HisenseData;
  setData: React.Dispatch<React.SetStateAction<HisenseData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}) {
  const upd = <K extends keyof HisenseData>(k: K, v: HisenseData[K]) => setData((d) => ({ ...d, [k]: v }));
  const updFoto = (i: number, v: string) =>
    setData((d) => ({ ...d, fotos: d.fotos.map((f, idx) => (idx === i ? { ...f, dataUrl: v } : f)) }));
  return (
    <>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Identificação</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Nº OS</label><input className={inputCls} value={data.numeroOS} onChange={(e) => upd("numeroOS", e.target.value)} /></div>
          <div><label className={labelCls}>Assistência Téc.</label><input className={inputCls} value={data.assistenciaTec} onChange={(e) => upd("assistenciaTec", e.target.value)} /></div>
          <div className="col-span-2"><label className={labelCls}>Nome do Cliente</label><input className={inputCls} value={data.clienteNome} onChange={(e) => upd("clienteNome", e.target.value)} /></div>
          <div><label className={labelCls}>Modelo do Prod.</label><input className={inputCls} value={data.modeloProduto} onChange={(e) => upd("modeloProduto", e.target.value)} /></div>
          <div><label className={labelCls}>Nº de Série</label><input className={inputCls} value={data.numeroSerie} onChange={(e) => upd("numeroSerie", e.target.value)} /></div>
          <div><label className={labelCls}>ART ou Batch</label><input className={inputCls} value={data.artBatch} onChange={(e) => upd("artBatch", e.target.value)} /></div>
          <div><label className={labelCls}>Marca</label>
            <select className={inputCls} value={data.marcaProduto} onChange={(e) => upd("marcaProduto", e.target.value as "gorenje" | "hisense")}>
              <option value="hisense">Hisense</option>
              <option value="gorenje">Gorenje</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <label className={labelCls}>Defeito Relatado pelo Cliente</label>
        <textarea rows={3} className={inputCls} value={data.defeitoRelatado} onChange={(e) => upd("defeitoRelatado", e.target.value)} />
        <label className={labelCls + " mt-3"}>Diagnóstico Técnico</label>
        <textarea rows={3} className={inputCls} value={data.diagnosticoTec} onChange={(e) => upd("diagnosticoTec", e.target.value)} />
        <label className={labelCls + " mt-3"}>Instalação Correta? (irregularidades)</label>
        <textarea rows={2} className={inputCls} value={data.instalacaoCorreta} onChange={(e) => upd("instalacaoCorreta", e.target.value)} />
        <label className={labelCls + " mt-3"}>Peças Necessárias para Reparo</label>
        <textarea rows={2} className={inputCls} value={data.pecasNecessarias} onChange={(e) => upd("pecasNecessarias", e.target.value)} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Fotos (8)</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.fotos.map((f, i) => (
            <PhotoField key={i} label={f.legenda} value={f.dataUrl} onChange={(v) => updFoto(i, v)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Tensão (Volts)</h2>
        <div className="grid grid-cols-3 gap-2">
          <div><label className={labelCls}>F1+F2</label><input className={inputCls} value={data.tensaoF1F2} onChange={(e) => upd("tensaoF1F2", e.target.value)} /></div>
          <div><label className={labelCls}>F1+Terra</label><input className={inputCls} value={data.tensaoF1Terra} onChange={(e) => upd("tensaoF1Terra", e.target.value)} /></div>
          <div><label className={labelCls}>F2+Terra</label><input className={inputCls} value={data.tensaoF2Terra} onChange={(e) => upd("tensaoF2Terra", e.target.value)} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Anotações Técnicas</label>
        <textarea rows={3} className={inputCls} value={data.anotacoes} onChange={(e) => upd("anotacoes", e.target.value)} />
      </section>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Cidade</label><input className={inputCls} value={data.cidade} onChange={(e) => upd("cidade", e.target.value)} /></div>
          <div><label className={labelCls}>Data</label><input className={inputCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataParecer} onChange={(e) => upd("dataParecer", formatDate(e.target.value))} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Técnico Responsável</label>
        <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
      </section>
    </>
  );
}

// ============ ASSURANT FORM ============
function AssurantForm({
  data, setData, inputCls, labelCls, formatDate,
}: {
  data: AssurantData;
  setData: React.Dispatch<React.SetStateAction<AssurantData>>;
  inputCls: string;
  labelCls: string;
  formatDate: (r: string) => string;
}) {
  const upd = <K extends keyof AssurantData>(k: K, v: AssurantData[K]) => setData((d) => ({ ...d, [k]: v }));
  const updFoto = (i: number, v: string) =>
    setData((d) => ({ ...d, fotos: d.fotos.map((f, idx) => (idx === i ? { ...f, dataUrl: v } : f)) }));
  return (
    <>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Ordem de Serviço</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Sinistro</label><input className={inputCls} value={data.sinistro} onChange={(e) => upd("sinistro", e.target.value)} /></div>
          <div><label className={labelCls}>Assistência</label><input className={inputCls} value={data.assistencia} onChange={(e) => upd("assistencia", e.target.value)} /></div>
          <div><label className={labelCls}>CNPJ</label><input className={inputCls} value={data.cnpj} onChange={(e) => upd("cnpj", e.target.value)} /></div>
          <div><label className={labelCls}>Serial</label><input className={inputCls} value={data.serial} onChange={(e) => upd("serial", e.target.value)} /></div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Produto</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Marca</label><input className={inputCls} value={data.produtoMarca} onChange={(e) => upd("produtoMarca", e.target.value)} /></div>
          <div><label className={labelCls}>Modelo</label><input className={inputCls} value={data.produtoModelo} onChange={(e) => upd("produtoModelo", e.target.value)} /></div>
        </div>
      </section>
      <section>
        <label className={labelCls}>Parecer Técnico após Análise</label>
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
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Fotos do Defeito (4)</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.fotos.map((f, i) => (
            <PhotoField key={i} label={f.legenda} value={f.dataUrl} onChange={(v) => updFoto(i, v)} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <PhotoField label="Cotação do Orçamento 1 (até 30 dias)" value={data.cotacaoImgs[0] ?? ""} onChange={(v) => upd("cotacaoImgs", [v, data.cotacaoImgs[1] ?? ""])} />
          <PhotoField label="Cotação do Orçamento 2 (até 30 dias)" value={data.cotacaoImgs[1] ?? ""} onChange={(v) => upd("cotacaoImgs", [data.cotacaoImgs[0] ?? "", v])} />
        </div>
        <div className="mt-3">
          <PhotoField label="Foto Residência do Segurado" value={data.residenciaImg} onChange={(v) => upd("residenciaImg", v)} />
        </div>
      </section>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Cidade</label><input className={inputCls} value={data.cidade} onChange={(e) => upd("cidade", e.target.value)} /></div>
          <div><label className={labelCls}>Data</label><input className={inputCls} placeholder="DD/MM/AAAA" inputMode="numeric" value={data.dataParecer} onChange={(e) => upd("dataParecer", formatDate(e.target.value))} /></div>
        </div>
        <label className={labelCls + " mt-3"}>Técnico Responsável</label>
        <input className={inputCls} value={data.responsavel} onChange={(e) => upd("responsavel", e.target.value)} />
      </section>
    </>
  );
}
