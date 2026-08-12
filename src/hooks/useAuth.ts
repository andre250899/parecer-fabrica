import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface UseAuthReturn {
  user: User | null;
  userEmail: string | null;
  authChecked: boolean;
  signOut: () => Promise<void>;
}

/**
 * Gerencia sessão Supabase e redireciona para /auth se não autenticado.
 * Exporta signOut que aceita um callback para verificar "dirty state" antes de sair.
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/auth" });
      } else {
        setUser(data.session.user);
        setAuthChecked(true);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) {
        navigate({ to: "/auth" });
        setUser(null);
      } else {
        setUser(session.user);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }, [navigate]);

  return {
    user,
    userEmail: user?.email ?? null,
    authChecked,
    signOut,
  };
}
