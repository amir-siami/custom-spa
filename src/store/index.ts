// store/useUserStore.ts
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserEntity {
  name: string;
  userName: string;
  email: string;
  phone: string;
  status?: "Active" | "Not Active" | "";
}

interface UserStore {
  users: UserEntity[];
  currentPage: number;
  setUsers: (users: UserEntity[]) => void;
  addUser: (user: UserEntity) => void;
  updateUser: (index: number, user: UserEntity) => void;
  setCurrentPage: (page: number) => void;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

export const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      users: [],
      currentPage: 1,
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (index, user) =>
        set((state) => ({
          users: state.users.map((u, i) => (i === index ? user : u)),
        })),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "user-storage",
    }
  )
);
