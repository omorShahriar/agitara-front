"use client";
import SearchBar from "./SearchBar";
import CategoriesDropdown from "./CategoriesDropdown";
import { useAtomValue, useSetAtom } from "jotai";
import { sidebarFormAtom } from "@/app/store";
const FilterPanel = ({ categories, searchPlaceholder }) => {
  const sidebarForm = useAtomValue(sidebarFormAtom);
  const setSidebarForm = useSetAtom(sidebarFormAtom);
  const handleCategoryDelete = (e, categoryTag) => {
    e.preventDefault();
    setSidebarForm((prevState) => {
      return {
        ...prevState,
        selectedCategories: prevState.selectedCategories.filter(
          (category) => categoryTag != category
        ),
      };
    });
  };
  return (
    <div className="bg-white shadow-md rounded-md ">
      {" "}
      <div className=" flex justify-between md:p-4 p-2 gap-x-2 sticky top-[80px] left-0">
        <CategoriesDropdown categories={categories} />
        <div className="hidden md:block">
          <div className="flex flex-wrap items-center -m-1 max-w-2xl ">
            {sidebarForm.selectedCategories &&
              sidebarForm.selectedCategories.map((category) => (
                <div className="m-1" key={category}>
                  <a
                    className="text-xs hover:scale-110  hover:bg-red-100 hover:text-red-600 inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1"
                    href="#"
                  >
                    {category}
                    <svg
                      className="h-2 w-2 ml-2 mt-1 text-sm hover:cursor-pointer"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                      onClick={(e) => handleCategoryDelete(e, category)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </a>
                </div>
              ))}
          </div>
        </div>
        <SearchBar placeholder={searchPlaceholder} />
      </div>
      <div className="flex md:hidden gap-x-1 justify-center pb-2">
        {sidebarForm.selectedCategories &&
          sidebarForm.selectedCategories.map((category) => (
            <div className="m-1" key={category}>
              <a
                className="text-xs hover:scale-110  hover:bg-red-100 hover:text-red-600 inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1"
                href="#"
              >
                {category}
                <svg
                  className="h-2 w-2 ml-2 mt-1 text-sm hover:cursor-pointer"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                  onClick={(e) => handleCategoryDelete(e, category)}
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterPanel;
