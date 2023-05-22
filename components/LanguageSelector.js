"use client";

import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "./contexts/LangContext";
const languageFlags = [
  { name: "de", flag: "/germany.jpg" },
  { name: "en", flag: "/unitedStates.jpg" },
];

export default function LanguageSelector() {
  const lang = useLang();
  const pathname = usePathname();
  const [selected, setSelected] = useState(() =>
    lang === "de" ? languageFlags[0] : languageFlags[1]
  );
  const generateCahngeLocaleUrl = (lang) => {
    const p = pathname.split("/");
    p[1] = lang;
    const path = p.join("/");
    return path;
  };

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative ">
          <Listbox.Button className="relative w-full cursor-pointer rounded border    p-2  text-left  focus:outline-none  sm:text-sm">
            <span className=" w-8 ">
              <Image
                className=" w-8 "
                src={selected.flag}
                alt="flag"
                width={40}
                height={24}
                priority
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 bg-white flex items-center flex-col gap-y-4   py-2 absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-theme-blue-deep dark:border-zinc-700  text-base focus:outline-none sm:text-sm">
              {languageFlags.map((language, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className="relative cursor-pointer select-none  "
                  value={language}
                >
                  {({ selected }) => (
                    <div className="flex gap-x-4">
                      <span>
                        {selected ? (
                          <Image
                            className=" w-8 "
                            src={language.flag}
                            alt="flag"
                            width={40}
                            height={24}
                            priority
                          />
                        ) : (
                          <Link href={generateCahngeLocaleUrl(language.name)}>
                            {" "}
                            <Image
                              className=" w-8 "
                              src={language.flag}
                              alt="flag"
                              width={40}
                              height={24}
                              priority
                            />
                          </Link>
                        )}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
