import { LogOut, FolderOpen, Moon, Sun, Download, Calendar, Package, ArrowLeft } from "lucide-react";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenList?: () => void;
  onSignOut?: () => void;
  onBack?: () => void;
  isInstalled?: boolean;
  onInstall?: () => void;
  extraActions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function AppHeader({
  title,
  subtitle,
  isDark,
  onToggleTheme,
  onOpenList,
  onSignOut,
  onBack,
  isInstalled,
  onInstall,
  extraActions,
  children,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors print:hidden shadow-xs">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-start">
          <div className="flex min-w-0 items-center gap-2.5">
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
                title="Voltar"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg">
                {title}
              </h1>
              {subtitle && (
                <p className="truncate text-[11px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Dark mode, Install & SignOut on mobile inline */}
          <div className="flex items-center gap-1.5 sm:hidden">
            {!isInstalled && onInstall && (
              <button
                onClick={onInstall}
                title="Instalar App no dispositivo"
                aria-label="Instalar App"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 active:scale-95 transition"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onToggleTheme}
              title={isDark ? "Modo claro" : "Modo escuro"}
              aria-label={isDark ? "Modo claro" : "Modo escuro"}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-95 transition"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>
            {onSignOut && (
              <button
                onClick={onSignOut}
                title="Sair"
                aria-label="Sair"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-95 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>

          {children}
        </div>

        {/* Action bar (Mobile & Desktop) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {extraActions}

          {!isInstalled && onInstall && (
            <button
              onClick={onInstall}
              title="Instalar App no dispositivo"
              className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50 dark:bg-purple-950/40 px-3 text-xs font-bold text-purple-700 dark:text-purple-300 shadow-2xs hover:bg-purple-100 dark:hover:bg-purple-900/60 active:scale-95 transition"
            >
              <Download className="h-4 w-4" />
              <span>Instalar App</span>
            </button>
          )}

          {/* Desktop theme toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "Modo claro" : "Modo escuro"}
            aria-label={isDark ? "Modo claro" : "Modo escuro"}
            className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span>Claro</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-indigo-600" />
                <span>Escuro</span>
              </>
            )}
          </button>

          {onOpenList && (
            <button
              onClick={onOpenList}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
            >
              <FolderOpen className="h-4 w-4 text-indigo-500" />
              <span className="hidden xs:inline">Atendimentos</span>
              <span className="xs:hidden">Salvos</span>
            </button>
          )}

          {onSignOut && (
            <button
              onClick={onSignOut}
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
            >
              <LogOut className="h-4 w-4 text-red-500" />
              <span>Sair</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export { Calendar, Package };
