"use client";

import { FiChevronDown, FiFilter } from "react-icons/fi";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedCategoriesAtom, sidebarFormAtom } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
const CategoriesDropdown = ({ categories }) => {
  const filter = {
    id: "category-filter",
    name: "Filter By Category",
    options: categories.map((category) => ({
      value: category,
      label: category,
    })),
  };
  const selectedCategories = useAtomValue(selectedCategoriesAtom);
  const selectedCategoriesCount = selectedCategories.length;
  const setSidebarForm = useSetAtom(sidebarFormAtom);
  const handleSelectedCategory = (checked, option) => {
    if (checked) {
      setSidebarForm((prevState) => {
        const selectedCategories = [...prevState.selectedCategories];
        selectedCategories.push(option);
        return { ...prevState, selectedCategories };
      });
    } else {
      setSidebarForm((prevState) => {
        return {
          ...prevState,
          selectedCategories: prevState.selectedCategories.filter(
            (category) => category != option
          ),
        };
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <FiFilter
              className="ml-1 mr-2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <span className="md:block hidden">{filter.name}</span>
            {selectedCategoriesCount > 0 ? (
              <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                {selectedCategoriesCount}
              </span>
            ) : null}
            <FiChevronDown
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:w-56 w-28">
          {filter.options.map((option, optionIdx) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedCategories.includes(option.value)}
              onCheckedChange={(checked) =>
                handleSelectedCategory(checked, option.value)
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategoriesDropdown;
