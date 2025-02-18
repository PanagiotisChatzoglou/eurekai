"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  // Function to add new card BETWEEN 2 existing cards
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="w-full relative overflow-hidden"
      initial={{ height: "0.6rem" }}
      animate={{
        height: showGap ? "3rem" : "0.6rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center justify-center"
          >
            <div className="w-[40%] h-[0.2rem] bg-gray-300">
              <Button
                variant="outline"
                size={"sm"}
                onClick={onAddCard}
                className="rounded-full h-8 w-8 p-0 bg-primary"
                aria-label="Add new card"
              >
                <Plus className="w-5 h-5 text-black" />
              </Button>
              <div className="w-[40%] h-[0.2rem] bg-gray-300"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
