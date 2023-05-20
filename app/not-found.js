import { TypographyLarge, TypographyMuted } from "@/components/Typography";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <TypographyLarge> The page doesn&lsquo;t exist</TypographyLarge>
      <TypographyMuted>
        go back to{" "}
        <Link href="/" className="hover:underline">
          homepage
        </Link>{" "}
      </TypographyMuted>
    </div>
  );
};

export default notFound;
