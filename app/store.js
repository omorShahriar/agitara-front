import { atom } from "jotai";

export const sidebarFormAtom = atom({
  selectedCategories: [],
});
export const searchFormAtom = atom("");

export const selectedCategoriesAtom = atom((get) => {
  const sidebarForm = get(sidebarFormAtom);
  return sidebarForm.selectedCategories;
});
