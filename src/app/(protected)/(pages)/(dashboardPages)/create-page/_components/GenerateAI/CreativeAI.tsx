"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, noop } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompts from "./RecentPrompts";
import { toast } from "sonner";
import { OutlineCard } from "@/lib/types";
import { generateCreativePrompt } from "@/actions/chatgpt";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const { setProject } = useSlideStore();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  // edit text by clicking on the selected outline
  const [editText, setEditText] = useState("");
  const [noOfCards, setNoOfCards] = useState(0);
  const { prompts, addPrompt } = usePromptStore();

  //CREATE A CONTROLLED COMP. INPUT FOR THE AI PROMPT
  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    addOutline,
    addMultipleOutlines,
    resetOutlines,
    noOfUserOutlines,
    setNoOfUserOutlines,
  } = useCreativeAIStore();

  const router = useRouter();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      toast.error("Error", {
        description: "Please enter a prompt",
      });
      return;
    }

    setIsGenerating(true);
    const res = await generateCreativePrompt(currentAiPrompt, noOfUserOutlines);

    //USE OPEN AI
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];

      res.data.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      toast.success("Success", {
        description: "Generated Successfully",
      });
    } else {
      toast.error("Error", {
        description: "Failed to generate",
      });
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (outlines.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to generate slides",
      });
      return;
    }
    try {
      const res = await createProject(
        currentAiPrompt,
        outlines.slice(0, noOfCards)
      );

      if (res.status !== 200 || !res.data) {
        throw new Error("Failed to generate");
      }

      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);

      addPrompt({
        id: uuidv4(),
        title: currentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      toast.success("Success", {
        description: "Generated Successfully",
      });

      setCurrentAiPrompt("");
      resetOutlines();
      setNoOfUserOutlines(0);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to generate",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOutlineNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 10) {
      setNoOfUserOutlines(Number(e.target.value));
    }
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <motion.div
      className="space-y-4 w-full mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-5 w-5" /> Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Generate with <span className="text-vivid text-5xl">EurekAI</span>
        </h1>
        <p className="text-gray-600 font-semibold text-2xl">
          From Confusion to Clarity – Instantly!
        </p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="bg-gray-700 p-4 rounded-xl"
      >
        <div className="flex flex-col  justify-between gap-3 items-center rounded-xl">
          <Input
            value={currentAiPrompt || ""}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
            required
            placeholder="Enter your Inspiration & Generate Knowledge ..."
            className=" border-0 bg-transparent text-white w-full flex-grow"
          />
          <Input
            value={noOfUserOutlines || ""}
            onChange={handleOutlineNoChange}
            required
            placeholder="How many outlines do you want to generate?"
            maxLength={1}
            type="number"
            max={10}
            className=" border-0 bg-transparent text-white w-full flex-grow"
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select No. of Cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0">No Cards</SelectItem>
                ) : (
                  Array.from({ length: outlines.length }, (_, i) => i + 1).map(
                    (n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} {n === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    )
                  )
                )}
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              onClick={resetCards}
              size="icon"
              aria-label="Reset Card"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={generateOutline}
          className="text-xl flex gap-3 items-center"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        editText={editText}
        setEditText={setEditText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      {outlines.length > 0 && (
        <Button
          onClick={handleGenerate}
          className="w-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreativeAI;
