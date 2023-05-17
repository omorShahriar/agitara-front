"use client";
import { useTheme } from "next-themes";
import Marquee from "react-fast-marquee";

const MarqueeContainer = ({ children }) => {
  const { theme } = useTheme();
  const gradientColor = theme === "dark" ? [24, 24, 27] : [248, 211, 226];
  return (
    <Marquee gradient={false} pauseOnHover speed={50}>
      {children}
    </Marquee>
  );
};

export default MarqueeContainer;
