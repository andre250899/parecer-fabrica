import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Printer, Save, FolderOpen, LogOut, ArrowLeft, Camera, X, Search } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
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
      tipo === "vox" ? data.numeroOS : tipo === "hisense" ? hisense.numeroOS : assurant.sinistro;
    const clienteNome =
      tipo === "vox" ? data.clienteNome : tipo === "hisense" ? hisense.clienteNome : `Sinistro ${assurant.sinistro}`;
    const payload = tipo === "vox" ? data : tipo === "hisense" ? hisense : assurant;
    if (!numeroOS.trim()) {
      setSaveMsg(tipo === "assurant" ? "Informe o Nº do Sinistro antes de salvar." : "Informe o Nº OS antes de salvar.");
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

  // Model picker screen
  if (!tipo) {
    return (
      <div className="min-h-screen bg-slate-100">
        <header className="border-b bg-white px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Gerador de Parecer Técnico</h1>
            <p className="text-xs text-slate-500">Vox Grupo · {userEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openList} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <FolderOpen className="h-4 w-4" /> Meus pareceres
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Escolha o modelo de parecer</h2>
          <p className="mb-8 text-sm text-slate-600">Cada modelo tem layout e campos específicos.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { id: "vox" as const, name: "VOX", desc: "Parecer técnico corporativo Vox — com 6 opções de design e orçamento.", color: "from-blue-600 to-blue-800" },
              { id: "hisense" as const, name: "HISENSE / GORENJE", desc: "Relatório de atendimento com galeria de 8 fotos e medições de tensão.", color: "from-red-600 to-red-800" },
              { id: "assurant" as const, name: "ASSURANT", desc: "Análise técnica de sinistro com fotos do defeito, cotação e residência.", color: "from-slate-700 to-slate-900" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setTipo(m.id)}
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

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div>
            <div className="flex items-center gap-3">
              <button onClick={() => setTipo(null)} className="rounded-md border border-slate-300 bg-white p-1.5 hover:bg-slate-50" title="Trocar modelo">
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
          {tipo === "vox" ? (
            <><span className="font-semibold">Design ativo:</span> {theme.name} — {theme.description}</>
          ) : (
            <><span className="font-semibold">Modelo:</span> {tipo === "hisense" ? "Hisense / Gorenje" : "Assurant"} — layout fixo conforme padrão do fabricante.</>
          )}
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
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por Nº OS/Sinistro, cliente ou tipo..."
                className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            {(() => {
              const q = searchTerm.trim().toLowerCase();
              const filtered = q
                ? savedList.filter((r) =>
                    [r.numero_os, r.cliente_nome ?? "", r.tipo]
                      .join(" ")
                      .toLowerCase()
                      .includes(q),
                  )
                : savedList;
              return savedList.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum parecer salvo ainda.</p>
              ) : filtered.length === 0 ? (
                <p className="text-sm text-slate-500">Nenhum resultado para "{searchTerm}".</p>
              ) : (
              <ul className="divide-y divide-slate-200">
                {filtered.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        <span className="mr-2 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] uppercase text-slate-700">{row.tipo}</span>
                        {row.tipo === "assurant" ? "Sinistro" : "OS"} {row.numero_os}
                      </p>
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
              );
            })()}
          </div>
        </div>
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
        <input className={inputCls} value={data.motivo1} onChange={(e) => upd("motivo1", e.target.value)} />
        <label className={labelCls + " mt-3"}>Motivo (2)</label>
        <input className={inputCls} value={data.motivo2} onChange={(e) => upd("motivo2", e.target.value)} />
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
