"use client";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
const BackLink = ({ children }) => {
  const router = useRouter();
  return (
    <button
      className="group text-xl font-medium flex items-center justify-center gap-x-2 hover:text-emerald-700 transition-all duration-300"
      onClick={() => router.back()}
    >
      <BsArrowLeft
        size={24}
        className=" group-hover:-translate-x-1 transition-transform duration-200 "
      />
      <span>{children}</span>
    </button>
  );
};

export default BackLink;
