"use client";

import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { searchFormAtom } from "@/app/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const SearchBar = ({ placeholder = "Search Collection" }) => {
  const setSearchForm = useSetAtom(searchFormAtom);

  const [value, setValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    setSearchForm(value);
  };
  const initialRender1 = useRef(true);
  useEffect(() => {
    if (initialRender1.current) {
      initialRender1.current = false;
      return;
    }
    if (!value) {
      setSearchForm("");
    }
  }, [value, setSearchForm]);
  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="xl:w-96">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              name="query"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              aria-describedby="button-addon2"
            />
            <Button type="submit" id="button-addon2" disabled={!value}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
