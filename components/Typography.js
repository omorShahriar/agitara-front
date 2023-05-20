import React from "react";

import { cn } from "@/lib/utils";

export const TypographyH1 = ({ children, className }) => {
  return (
    <h1
      className={cn([
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      ])}
    >
      {children}
    </h1>
  );
};
export const TypographyH2 = ({ children }) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
};
export const TypographyH3 = ({ children, className }) => {
  return (
    <h3
      className={cn([
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      ])}
    >
      {children}
    </h3>
  );
};
export const TypographyH4 = ({ children, className }) => {
  return (
    <h4 className={cn(["scroll-m-20 text-xl font-semibold tracking-tight"])}>
      {children}
    </h4>
  );
};
export const TypographyP = ({ children, className }) => {
  return (
    <p className={cn(["leading-7 [&:not(:first-child)]:mt-6", className])}>
      {children}
    </p>
  );
};
export const TypographyLead = ({ children, className }) => {
  return (
    <p className={cn(["text-xl text-muted-foreground", className])}>
      {children}
    </p>
  );
};
export const TypographyLarge = ({ children }) => {
  return <p className="text-lg font-semibold">{children}</p>;
};
export const TypographySmall = ({ children }) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};
export const TypographyMuted = ({ children, className }) => {
  return (
    <p className={cn(["text-sm text-muted-foreground", className])}>
      {children}
    </p>
  );
};
