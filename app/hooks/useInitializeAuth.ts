import { useEffect, useState } from "react";
import { useAuthStore } from "~/store/auth-store";
import { supabase } from "~/supabase-client";

export function useInitializeAuth() {
  const setUser = useAuthStore((s) => s.setUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();

      const session = data.session;
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: profile?.name,
          role: profile?.role,
          accessToken: session.access_token,
        });
      }

      setInitialized(true);
    }

    loadSession();
  }, [setUser]);

  return initialized;
}
