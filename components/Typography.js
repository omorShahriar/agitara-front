import React from "react";
import {
  FadeInRightWrapper,
  FadeInTopWrapper,
} from "./InViewAnimatedWrappers/Wrapper";
import { cn } from "@/lib/utils";

export const TypographyH1 = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      {" "}
      <h1
        className={cn([
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className,
        ])}
      >
        {children}
      </h1>
    </FadeInTopWrapper>
  );
};
export const TypographyH2 = ({ children }) => {
  return (
    <FadeInTopWrapper>
      {" "}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {children}
      </h2>
    </FadeInTopWrapper>
  );
};
export const TypographyH3 = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      <h3
        className={cn([
          "scroll-m-20 text-2xl font-semibold tracking-tight",
          className,
        ])}
      >
        {children}
      </h3>
    </FadeInTopWrapper>
  );
};
export const TypographyH4 = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      <h4 className={cn(["scroll-m-20 text-xl font-semibold tracking-tight"])}>
        {children}
      </h4>
    </FadeInTopWrapper>
  );
};
export const TypographyP = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      <p className={cn(["leading-7 [&:not(:first-child)]:mt-6", className])}>
        {children}
      </p>
    </FadeInTopWrapper>
  );
};
export const TypographyLead = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      <p className={cn(["text-xl text-muted-foreground", className])}>
        {children}
      </p>
    </FadeInTopWrapper>
  );
};
export const TypographyLarge = ({ children }) => {
  return (
    <FadeInTopWrapper>
      <div className="text-lg font-semibold">{children}</div>
    </FadeInTopWrapper>
  );
};
export const TypographySmall = ({ children }) => {
  return (
    <FadeInTopWrapper>
      <small className="text-sm font-medium leading-none">{children}</small>
    </FadeInTopWrapper>
  );
};
export const TypographyMuted = ({ children, className }) => {
  return (
    <FadeInTopWrapper>
      <p className={cn(["text-sm text-muted-foreground", className])}>
        {children}
      </p>
    </FadeInTopWrapper>
  );
};
