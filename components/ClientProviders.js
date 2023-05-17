"use client";
import { LangProvider } from "@/components/contexts/LangContext";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const ClientProviders = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <DarkModeProvider> {children}</DarkModeProvider>
        </LangProvider>
      </QueryClientProvider>
    </>
  );
};

export default ClientProviders;
