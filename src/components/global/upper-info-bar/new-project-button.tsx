"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-page");
  };

  return (
    <Button
      className="rounded-lg font-semibold"
      // disable if user not subscribed
      // disabled={!user.subscription}
      onClick={handleClick}
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
