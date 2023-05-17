import React from "react";

const Header = ({ children }) => {
  return (
    <div className=" my-12 font-bold flex items-center justify-center w-full md:h-80 h-40 rounded-md bg-black text-white">
      <h1 className="md:text-6xl text-4xl font-bold leading-normal text-center capitalize">
        {children}
      </h1>
    </div>
  );
};

export default Header;
