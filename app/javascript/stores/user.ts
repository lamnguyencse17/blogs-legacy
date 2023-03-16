import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';

export interface UserData {
  id: number;
  username: string;
  email: string;
}

interface UserState {
  user?: UserData;
  setUser: (newUser: UserData) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    setUser: (newUser) => {
      set(
        produce((state) => {
          state.user = newUser;
        }),
        false,
        SET_USER
      );
    },
    resetUser: () => {
      set(
        produce((state) => {
          state.user = undefined;
        }),
        false,
        RESET_USER
      );
    },
  }))
);

export default useUserStore;
