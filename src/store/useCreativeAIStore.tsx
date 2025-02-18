import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type creativeAIStore = {
  outlines: OutlineCard[] | [];
  setCurrentAiPrompt: (prompt: string) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAiPrompt: string;
  resetOutlines: () => void;
  noOfUserOutlines: number;
  setNoOfUserOutlines: (no: number) => void;
};

const useCreativeAIStore = create<creativeAIStore>()(
  persist(
    (set) => ({
      currentAiPrompt: "",
      setCurrentAiPrompt: (prompt: string) => {
        set({ currentAiPrompt: prompt });
      },
      noOfUserOutlines: 0,
      setNoOfUserOutlines: (no: number) => {
        set({ noOfUserOutlines: no });
      },
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      resetOutlines: () => {
        set({ outlines: [] });
      },
    }),
    {
      name: "creative-ai",
    }
  )
);

export default useCreativeAIStore;
