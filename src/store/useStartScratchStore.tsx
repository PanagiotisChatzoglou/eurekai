import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
  outlines: OutlineCard[];
  addOutlines: (outlines: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  resetOutlines: () => void;
};

const useScratchStore = create<OutlineStore>()(
  devtools(
    persist(
      (set) => ({
        outlines: [],
        resetOutlines: () => {
          set({ outlines: [] });
        },
        addOutlines: (outline: OutlineCard) => {
          set((state) => ({
            outlines: [...state.outlines, outline],
          }));
        },
        addMultipleOutlines: (outlines: OutlineCard[]) => {
          set(() => ({
            outlines: [...outlines],
          }));
        },
      }),
      { name: "scratch" }
    )
  )
);

export default useScratchStore;
