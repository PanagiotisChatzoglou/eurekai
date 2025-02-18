"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  createdAt,
  projectId,
  title,
  isDelete,
  slideData,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error!", {
        description: "Project not found",
      });
      return;
    }
    try {
      const response = await recoverProject(projectId);
      if (response.status !== 200) {
        toast.error("Error!", {
          description:
            response.error || "An error occurred while recovering the project",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Project Recovered Successfully");
    } catch (error) {
      //   setLoading(false);
      toast.error("Error!", {
        description: "An error occurred while recovering the project",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error!", {
        description: "Project not found",
      });
      return;
    }
    try {
      const response = await deleteProject(projectId);
      if (response.status !== 200) {
        toast.error("Error!", {
          description:
            response.error || "An error occurred while deleting the project",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Project Deleted Successfully");
    } catch (error) {
      //   setLoading(false);
      toast.error("Error!", {
        description: "An error occurred while recovering the project",
      });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-4 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview
          theme={theme}
          //   slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3>{title}This is the correct title</h3>
          <div className="flex w-full gap-2 items-center justify-between">
            <p className="text-sm" suppressHydrationWarning>
              {timeAgo(createdAt)}
            </p>
            {isDelete ? (
              <AlertDialogBox
                loading={loading}
                className="bg-green-500 text-white"
                description="Recover and Restore your Project"
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button size="sm" variant="ghost" disabled={loading}>
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                loading={loading}
                className="bg-red-500 text-white"
                description="Send to Trash"
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button size="sm" variant="ghost" disabled={loading}>
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
