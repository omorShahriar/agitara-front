import { TypographyLarge } from "@/components/Typography";
import React from "react";

const notFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <TypographyLarge> The page doesn&lsquo;t exist</TypographyLarge>
    </div>
  );
};

export default notFound;
