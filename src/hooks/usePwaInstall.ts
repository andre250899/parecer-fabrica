import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export interface UsePwaInstallReturn {
  isInstalled: boolean;
  installMessage: string;
  handleInstall: () => Promise<void>;
}

export function usePwaInstall(): UsePwaInstallReturn {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installMessage, setInstallMessage] = useState("");
  const [isInstalled, setIsInstalled] = useState(false);

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

  return { isInstalled, installMessage, handleInstall };
}
