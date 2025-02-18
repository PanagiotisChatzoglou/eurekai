"use client";

import { OutlineCard } from "@/lib/types";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};

const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers,
  onDragOver,
  dragOverStyles,
}: Props) => {
  // Make the outline title change to editable input field
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
    >
      {/* draggable card element */}
      <div
        style={dragOverStyles}
        draggable
        onDragOver={onDragOver}
        {...dragHandlers}
      >
        <UICard
          className={`p-5 cursor-grab active:cursor-grabbing 
            ${isEditing || isSelected ? "border-primary bg-transparent" : ""}
            `}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                className=""
              />
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`p-3 rounded-xl ${
                    isEditing || isSelected ? "bg-primary text-white" : ""
                  }`}
                >
                  {card.order}
                </span>
                <span className="">{card.title}</span>
              </div>
            )}
            {/* FIXED JAVASCRIPT  BUBBLING EVENT ERROR
                by just adding stopPropagation to the button ... :)
            */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete ${card.title}`}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
