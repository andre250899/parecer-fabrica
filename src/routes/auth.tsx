import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Zap } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Parecer Técnico Vox" },
      { name: "description", content: "Acesse sua conta para salvar e gerenciar pareceres técnicos." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("As senhas não coincidem. Verifique os campos digitados.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setInfo("Conta criada com sucesso. Você já pode entrar.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Se este email estiver cadastrado, enviamos um link para redefinir a senha.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  const modeLabel = {
    login: "Entre para acessar seus pareceres",
    signup: "Crie sua conta gratuita",
    forgot: "Recupere sua senha por email",
  }[mode];

  const btnLabel = loading
    ? "Aguarde..."
    : mode === "login"
      ? "Entrar"
      : mode === "signup"
        ? "Criar conta"
        : "Enviar link de recuperação";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/10 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 shadow-2xl">
          {/* Logo / Brand */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-lg shadow-indigo-500/30">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Parecer Técnico Vox
              </h1>
              <p className="mt-1 text-sm text-slate-500">{modeLabel}</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="seu@email.com"
              />
            </div>

            {mode !== "forgot" && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  placeholder="••••••••"
                />
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  placeholder="Repita sua senha"
                />
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 animate-fade-in">
                {error}
              </p>
            )}
            {info && (
              <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-700 animate-fade-in">
                {info}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 hover:brightness-110 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Aguarde...
                </span>
              ) : (
                btnLabel
              )}
            </button>
          </form>

          {/* Secondary actions */}
          <div className="mt-5 flex flex-col gap-2 text-center text-xs text-slate-500">
            {mode === "login" && (
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setError(null);
                  setInfo(null);
                }}
                className="hover:text-indigo-600 transition hover:underline"
              >
                Esqueci minha senha
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setInfo(null);
              }}
              className="hover:text-indigo-600 transition hover:underline"
            >
              {mode === "login" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-white/30">
          Vox Grupo — Sistema de Pareceres Técnicos
        </p>
      </div>
    </div>
  );
}