import { format } from "date-fns";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const generateAdditionalMetaTagsArray = (tags) => {
  if (tags.length === 0) {
    return null;
  } else {
    return tags.map((tag) => ({
      [tag.type]: tag.value,
      content: tag.content,
    }));
  }
};

export const formatDate = (date) => {
  return format(new Date(date), "dd LLL, y");
};

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
