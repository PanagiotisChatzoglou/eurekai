"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import RecentPrompts from "../GenerateAI/RecentPrompts";
import usePromptStore from "@/store/usePromptStore";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts, setPage } = usePromptStore();

  //   useEffect(() => {
  //     setPage("create");
  //   }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div className="text-center space-y-2" variants={itemVariants}>
        <h1 className="text-3xl font-bold">Create a new project</h1>
        <p className="text-gray-600">
          Choose the type of project you want to create.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid gap-3 md:grid-cols-3"
      >
        {/* DISPLAY CARD FOR CREATE OPTIONS */}
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
              rotate: 1,
            }}
            className={`${
              option.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div
              className="w-full p-4 flex flex-col gap-y-5 items-start bg-white dark:bg-black rounded-xl"
              whileHover={{
                transition: { duration: 0.1 },
              }}
            >
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-lg font-semibold">{option.title}</p>
                  <p
                    className={`${
                      option.highlight ? "text-vivid" : "text-primary"
                    } text-3xl `}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className="text-sm">{option.description}</p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pass in the option to set the state
                and change our page */}
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit rounded-xl font-bold"
                  size={"sm"}
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? "Create" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
