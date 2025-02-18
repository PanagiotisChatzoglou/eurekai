import usePromptStore from "@/store/usePromptStore";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import { toast } from "sonner";

type Props = {};

const RecentPrompts = (props: Props) => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAIStore();

  //Attempt to keep track of the current AI prompt
  // and return all the existing state when users edits a prompt
  const handleEdit = (id: string) => {
    const prompt = prompts.find((p) => p?.id === id);
    if (prompt) {
      setPage("creative-ai");
      addMultipleOutlines(prompt?.outlines);
      setCurrentAiPrompt(prompt?.title);
    } else {
      toast.error("Error loading prompt", {
        description: "Prompt not found",
      });
    }
  };

  return (
    <motion.div variants={containerVariants} className="space-y-4">
      <motion.h2 variants={itemVariants} className="text-2xl text-center">
        Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full mx-auto "
      >
        {prompts.map((prompt, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="p-4 flex items-center justify-between transition-colors duration-300">
              <div className="max-w-[70%]">
                <h3 className="text-xl line-clamp-1">{prompt?.title}</h3>
                <p className="text-sm text-gray-500">
                  {timeAgo(prompt?.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-vivid">Creative AI</span>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                  onClick={() => handleEdit(prompt?.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
