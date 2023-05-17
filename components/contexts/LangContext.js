import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Create a context
export const ParamsContext = createContext(null);

// Create a custom hook to access the "lng" value from the context
export const useLang = () => {
  const lang = useContext(ParamsContext);
  return lang || ""; // Return an empty string if "lng" is not available
};

// Create a context provider component
export const LangProvider = ({ children }) => {
  const pathname = usePathname();

  return (
    <ParamsContext.Provider value={pathname.split("/")[1]}>
      {children}
    </ParamsContext.Provider>
  );
};
