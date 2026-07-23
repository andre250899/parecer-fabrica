import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Printer, Save, FolderOpen, LogOut, ArrowLeft, Camera, X } from "lucide-react";
import { useEffect, useState } from "react";
import ParecerPreview from "@/components/ParecerPreview";
import HisensePreview from "@/components/HisensePreview";
import AssurantPreview from "@/components/AssurantPreview";
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
  fileToCompressedDataUrl,
  type HisenseData,
  type AssurantData,
  type ParecerTipo,
} from "@/lib/parecer-extras";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "description", content: "Gere pareceres técnicos profissionais com 6 opções de design e exporte para PDF." },
      { property: "og:title", content: "Gerador de Parecer Técnico — Vox Grupo" },
      { property: "og:description", content: "Gere pareceres técnicos profissionais com 6 opções de design e exporte para PDF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Gerador de Parecer Técnico — Vox Grupo" },
      { name: "twitter:description", content: "Gere pareceres técnicos profissionais com 6 opções de design e exporte para PDF." },
    ],
  }),
  component: Index,
});

function Index() {
  const [tipo, setTipo] = useState<ParecerTipo | null>(null);
  const [data, setData] = useState<ParecerData>(defaultParecer);
  const [hisense, setHisense] = useState<HisenseData>(defaultHisense);
  const [assurant, setAssurant] = useState<AssurantData>(defaultAssurant);
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installMessage, setInstallMessage] = useState("");
  const [isInstalled, setIsInstalled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [savedList, setSavedList] = useState<Array<{ id: string; numero_os: string; cliente_nome: string | null; updated_at: string; tipo: string }>>([]);
  const [showList, setShowList] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const navigate = useNavigate();
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

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
    if (!tipo) return;
    const { data: rows, error } = await supabase
      .from("pareceres")
      .select("id, numero_os, cliente_nome, updated_at, tipo")
      .eq("tipo", tipo)
      .order("updated_at", { ascending: false });
    if (!error && rows) setSavedList(rows);
  };

  const openList = async () => {
    await loadList();
    setShowList(true);
  };

  const saveParecer = async () => {
    if (!tipo) return;
    const numeroOS =
      tipo === "vox" ? data.numeroOS : tipo === "hisense" ? hisense.numeroOS : assurant.numeroOS;
    const clienteNome =
      tipo === "vox" ? data.clienteNome : tipo === "hisense" ? hisense.clienteNome : assurant.consumidorNome;
    const payload = tipo === "vox" ? data : tipo === "hisense" ? hisense : assurant;
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
      setTipo(t);
      if (t === "vox") setData(row.data as unknown as ParecerData);
      else if (t === "hisense") setHisense(row.data as unknown as HisenseData);
      else setAssurant(row.data as unknown as AssurantData);
      setShowList(false);
    }
  };

  const deleteParecer = async (id: string) => {
    if (!confirm("Excluir este parecer?")) return;
    await supabase.from("pareceres").delete().eq("id", id);
    await loadList();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
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

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide";

  if (!authChecked) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Gerador de Parecer Técnico</h1>
            <p className="text-xs text-slate-500">Vox Grupo · {userEmail}</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
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
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleInstall}
                disabled={isInstalled}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {isInstalled ? "Instalado" : "Instalar app"}
              </button>
              {installMessage && <p className="max-w-72 text-right text-[11px] leading-snug text-slate-600">{installMessage}</p>}
            </div>
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
          <span className="font-semibold">Design ativo:</span> {theme.name} — {theme.description}
          {saveMsg && <span className="ml-3 font-semibold text-emerald-700">{saveMsg}</span>}
        </div>
      </header>

      {showList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden" onClick={() => setShowList(false)}>
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Meus pareceres salvos</h2>
              <button onClick={() => setShowList(false)} className="text-sm text-slate-500 hover:text-slate-900">Fechar</button>
            </div>
            {savedList.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum parecer salvo ainda.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {savedList.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">OS {row.numero_os}</p>
                      <p className="text-xs text-slate-500">
                        {row.cliente_nome ?? "—"} · atualizado {new Date(row.updated_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadParecer(row.id)} className="rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800">Abrir</button>
                      <button onClick={() => deleteParecer(row.id)} className="rounded-md border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

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
        </aside>

        {/* PREVIEW */}
        <main className="overflow-x-auto">
          <ParecerPreview data={data} theme={theme} />
        </main>
      </div>
    </div>
  );
}
