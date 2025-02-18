import { Theme } from "@/lib/types";
import React from "react";
import { AnimationControls, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  variant: "left" | "main" | "right";
  theme: Theme;
  controls: AnimationControls;
};

const ThemeCard = ({
  title,
  description,
  content,
  variant,
  theme,
  controls,
}: Props) => {
  //Create animation for cards
  const variants = {
    left: {},
    right: {},
    main: {},
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className="absolute w-full max-w-3xl"
      style={{ zIndex: variant === "main" ? 10 : 0 }}
    >
      <Card
        className="h-full shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: theme.slideBackgroundColor,
          border: `1px solid ${theme.accentColor}`,
        }}
      >
        <div className="flex flex-col md:flex-row">
          <CardContent className="flex-1 p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-lg">{description}</p>
            </div>
            {content}
          </CardContent>
          <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg ">
            <Image
              src="/eurekai.png"
              alt="Theme Preview"
              layout="fill"
              objectFit="cover"
              className="transition-trasform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
