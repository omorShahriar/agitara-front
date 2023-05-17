import "./globals.css";
export const metadata = {
  title: "AGITARA",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
