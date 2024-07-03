import create from 'zustand';

const useUserStore = create((set) => ({
  user: true,
  error: null,
  setUser: (user) => set({ user, error: null }),
  setError: (error) => set({ error }),
  clearUser: () => set({ user: null, error: null }),
}));

export default useUserStore;
