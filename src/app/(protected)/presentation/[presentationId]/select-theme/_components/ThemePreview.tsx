"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes } from "@/lib/constants";

type Props = {};

const ThemePreview = (props: Props) => {
  const { project, currentTheme, setCurrentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
  const router = useRouter();
  const params = useParams();
  const controls = useAnimation();

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  });

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const leftCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3 className="text-xl font-semibold">Quick Start Guid</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Choose Theme</li>
          <li>Customize Colors and fonts</li>
          <li>Add Content</li>
          <li>Preview & Share</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lg"
        style={{ backgroundColor: selectedTheme.accentColor }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            Το Smart Layout λειτουργεί ως ένα πλαίσιο κειμένου
          </p>
        </div>
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            Το Smart Layout λειτουργεί ως ένα πλαίσιο κειμένου
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="h-12 px-6 text-lg "
          style={{ backgroundColor: selectedTheme.accentColor }}
        >
          Κυρίως Κουμπί
        </Button>
        <Button
          variant={"outline"}
          className="h-12 px-6 text-lg "
          style={{ backgroundColor: selectedTheme.accentColor }}
        >
          Δευτερεων Κουμπί
        </Button>
      </div>
    </div>
  );

  const rightCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold"
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className="list-disc list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive Design</li>
          <li>Modes</li>
          <li>Customize</li>
          <li>Accesibilty</li>
        </ul>
      </div>
      <Button
        variant={"outline"}
        className="w-full h-12 text-lg"
        style={{ backgroundColor: selectedTheme.accentColor }}
      >
        Explore Features
      </Button>
    </div>
  );

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div
      className="h-screen w-full flex"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-12 flex flex-col items-center min-h-screen">
          <Button
            variant={"outline"}
            style={{
              backgroundColor: selectedTheme.accentColor + "10",
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + "10",
            }}
            className="mb-12 self-start"
            size="lg"
            onClick={() => router.push("/create-page")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <div className="w-full flex justify-center items-center relative flex-grow">
            <ThemeCard
              title="Quick Start"
              description="Start Learning"
              content={leftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
            />
            {/* <ThemeCard
              title="Quick Start"
              description="Start Learning"
              content={leftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
            /> */}
          </div>
        </div>
      </div>

      <ThemePicker
        selectedTheme={selectedTheme}
        themes={themes}
        onThemeSelect={applyTheme}
      />
    </div>
  );
};

export default ThemePreview;
