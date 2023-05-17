"use client";
import { BsChevronUp } from "react-icons/bs";
import { Fragment } from "react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import BreadCrumb from "./BreadCrumb";
import { useState, useEffect } from "react";
import Container from "./layout/Container";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import AccountBox from "./AccountBox";
const MobileMenu = ({ navElements, session }) => {
  const [open, setOpen] = useState(false);
  const toggleButton = () => {
    setOpen((open) => !open);
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    if (!open) {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  return (
    <div className="pt-2 ">
      <BreadCrumb open={open} onClick={toggleButton} />
      {open && (
        <div className=" w-full h-[calc(100vh-77.5px)] fixed z-[1000] top-[77.5px] left-0 border-t-2 border-t-black bg-white dark:bg-zinc-900 overflow-y-scroll ">
          <Container>
            <div className=" mt-6 flex gap-x-6 justify-center items-center">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <div className=" pt-12 ">
              {" "}
              {navElements.map((element) => {
                if (element.__component == "menu.dropdown") {
                  return (
                    <Disclosure className="relative" key={element.label}>
                      {({ open, close }) => (
                        <>
                          <Disclosure.Button className="  flex gap-x-4 items-center  px-3 py-2   focus:outline-none  text-xl font-semibold">
                            <span>{element.label}</span>
                            <BsChevronUp
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 `}
                            />
                          </Disclosure.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Disclosure.Panel className="">
                              <div className=" ">
                                <div className="relative flex flex-col gap-y-4 bg-white dark:bg-zinc-800 p-5 rounded-md">
                                  {" "}
                                  {element.MenuSection.map((section) => {
                                    return (
                                      <div
                                        key={section.label}
                                        className=" border-b-2 border-b-zinc-700 dark:border-b-zinc-300 last:border-b-0 "
                                      >
                                        <p className="  font-bold mb-3 ">
                                          {section.label}
                                        </p>
                                        <ul className="flex flex-col gap-y-21 pb-4">
                                          {section.links.map((link) => (
                                            <li
                                              key={link.label}
                                              className="  font-semibold "
                                            >
                                              <Link
                                                href={link.href}
                                                onClick={toggleButton}
                                              >
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  );
                }
                return (
                  <li
                    key={element.label}
                    className="px-3 py-2 text-xl font-semibold list-none"
                  >
                    <Link href={element.href} onClick={toggleButton}>
                      {element.label}
                    </Link>
                  </li>
                );
              })}
            </div>
            <div className=" mt-6 flex gap-x-6 justify-center items-center">
              <AccountBox session={session} />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
