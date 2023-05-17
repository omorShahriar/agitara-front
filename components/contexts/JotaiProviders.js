"use client";
import { Provider } from "jotai";
export const JotaiCollectionProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};
