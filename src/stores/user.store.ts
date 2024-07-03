import { create } from 'zustand';

interface UserState {}
interface LoginState {
  logged: boolean;
  setLogged: (logged: boolean) => void;
}

export const useUserState = create<UserState>()((set) => ({}));
export const useLoginState = create<LoginState>()((set) => ({
  logged: false,
  setLogged: (logged) => set({ logged }),
}));
