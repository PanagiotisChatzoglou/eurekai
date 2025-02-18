import { HomeIcon, NutOff } from "lucide-react";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10">
      <NutOff />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="">404 - Page Not Found</p>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
