"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw } from "lucide-react";
import useScratchStore from "@/store/useStartScratchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardList from "../Common/CardList";
import { v4 as uuidv4 } from "uuid";
import { OutlineCard } from "@/lib/types";
import { toast } from "sonner";
import { createProject } from "@/actions/project";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const [editText, setEditText] = useState("");
  const { outlines, resetOutlines, addOutlines, addMultipleOutlines } =
    useScratchStore();
  const { setProject } = useSlideStore();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const router = useRouter();

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    const newcard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutlines(newcard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast.error("Please add at least one card to generate ideas");
      return;
    }

    const res = await createProject(outlines?.[0]?.title, outlines);

    if (res.status !== 200) {
      toast.error("Error generating ideas", {
        description: res.error || "Failed to create project",
      });
      return;
    }

    if (res.data) {
      setProject(res.data);
      resetOutlines();

      toast.success("Project created successfully");

      router.push(`presentation/${res.data.id}/select-theme`);
    } else {
      toast.error("Error generating ideas");
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant={"outline"} className="mb-4">
        <ChevronLeft className="mr-2" /> Back
      </Button>
      <h1 className="text-3xl font-bold text-center">Prompt</h1>
      <motion.div
        className="p-4 bg-gray-700 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex  flex-col justify-between gap-3 items-center  rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter A Prompt and Generate Ideas"
            className="border-0 focus-visible:ring-0 bg-transparent shadow-none p-0 flex-grow"
          />
          <div className="flex items-center gap-4">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className="w-fit gap-2 shadow-xl">
                <SelectValue placeholder="select cards to create" />
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
              variant={"destructive"}
              onClick={resetCards}
              size={"icon"}
              aria-label="Reset Card"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
      <CardList
        outlines={outlines}
        addOutline={addOutlines}
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
      <Button
        onClick={handleAddCard}
        variant={"secondary"}
        className="w-full bg-slate-900"
      >
        Add Card
      </Button>
      {outlines.length > 0 && (
        <Button onClick={handleGenerate} className="w-full">
          Generate Ideas
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
