"use client";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
const BackLink = ({ children }) => {
  const pathname = usePathname();

  return (
    <Button
      variant="ghost"
      asChild
      className="group text-xl font-medium flex items-center justify-center gap-x-2 hover:text-emerald-700 transition-all duration-300"
    >
      <Link href={pathname.split("/").slice(0, 3).join("/")}>
        {" "}
        <BsArrowLeft
          size={24}
          className=" group-hover:-translate-x-1 transition-transform duration-200 "
        />
        <span>{children}</span>
      </Link>
    </Button>
  );
};

export default BackLink;
