import { create } from "zustand";
import { persist } from "zustand/middleware"; // ✅ Fix: Correct spelling

const useAppStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),

      // ✅ Exam State
      currExam: null,
      setExam: (examData) => set({ currExam: examData }),
      clearExam: () => set({ currExam: null }),
    }),
    {
      name: "app-storage", // ✅ LocalStorage Key
    }
  )
);

export default useAppStore;
