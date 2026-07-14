import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  setAuth: ({ user, session }) =>
    set({
      user,
      session,
      loading: false,
    }),

  clearAuth: () =>
    set({
      user: null,
      session: null,
      loading: false,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),
}));

export default useAuthStore;
