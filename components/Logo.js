"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
const Logo = () => {
  const { theme } = useTheme();
  return (
    <div className="logo ">
      <Link href="/" id="brand-logo">
        {" "}
        <Image
          src={"/logo.png"}
          width={200}
          height={120}
          className={cn({ hidden: theme === "dark" })}
          alt="agitara logo"
        />
        <Image
          src={"/logo-dark.png"}
          width={200}
          height={120}
          alt="agitara logo"
          className={cn({ hidden: theme !== "dark" })}
        />
      </Link>
    </div>
  );
};

export default Logo;
