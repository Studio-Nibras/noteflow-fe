import { useEffect } from "react";
import { supabase } from "../services/supabase";
import useAuthStore from "../store/authStore";

export default function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    // Ambil session saat aplikasi pertama kali dibuka
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setAuth({
          user: session.user,
          session,
        });
      } else {
        clearAuth();
      }
    };

    init();

    // Dengarkan perubahan auth (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({
          user: session.user,
          session,
        });
      } else {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth, clearAuth]);
}
