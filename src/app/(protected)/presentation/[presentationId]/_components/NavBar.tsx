"use client";
import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Share } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  presentationId: string;
};

const NavBar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentation, setIsPresentation] = useState(false);

  const themeStyle = {
    backgroundColor: currentTheme.backgroundColor,
    color: currentTheme.accentColor,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Link Copied to Clipboard");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full right-0 z-50 flex justify-between items-center p-4 px-7 border-b"
      style={themeStyle}
    >
      <Link passHref href="/dashboard">
        <Button
          variant={"outline"}
          className="flex items-center gap-3"
          style={themeStyle}
        >
          <Home className="h-6 w-6" />
          <span className="hidden sm:inline">Return Hom</span>
        </Button>
      </Link>
      <Link
        href={"/presentation/template-market"}
        className="text-xl hidden sm:block"
      >
        Slides Editor
      </Link>
      <div className="flex items-center gap-4">
        <Button onClick={handleCopy} style={themeStyle} variant={"outline"}>
          <Share className="h-6 w-6" />
        </Button>
        {/* <SellSlider/> */}
        <Button
          variant={"default"}
          className="flex items-center gap-2"
          onClick={() => setIsPresentation(true)}
        >
          <Play className="h-6 w-6" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {/* {isPresentation && <PresentationMode />} */}
    </nav>
  );
};

export default NavBar;
