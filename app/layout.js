import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
