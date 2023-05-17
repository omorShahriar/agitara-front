import { ThemeProvider } from "next-themes";

export function DarkModeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <div className="bg-white dark:bg-zinc-900 transition-colors duration-200 flex flex-col min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}
