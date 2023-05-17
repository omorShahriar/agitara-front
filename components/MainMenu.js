"use client";
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

const MainMenu = ({ navElements }) => {
  return (
    <>
      {" "}
      {navElements.map((element) => {
        if (element.__component == "menu.dropdown") {
          return (
            <Popover className="relative" key={element.label}>
              {({ open, close }) => (
                <>
                  <Popover.Button className=" group inline-flex items-center  px-3 py-2   focus:outline-none  text-xl font-semibold transition-colors duration-200 hover:text-theme-purple-light ">
                    <span>{element.label}</span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ">
                        <div className="relative grid gap-x-8 grid-cols-fluid  bg-white dark:bg-zinc-800 p-7 ">
                          {" "}
                          {element.MenuSection.map((section) => {
                            return (
                              <div
                                key={section.label}
                                className=" border-r-2 border-r-zinc-700 dark:border-r-zinc-300 last:border-r-0 "
                              >
                                <p className=" text-2xl font-bold mb-4 ">
                                  {section.label}
                                </p>
                                <ul className="flex flex-col gap-y-1">
                                  {section.links.map((link) => (
                                    <li
                                      key={link.label}
                                      className="  font-semibold "
                                    >
                                      <Link
                                        href={link.href}
                                        onClick={close}
                                        className="transition-colors duration-200 hover:text-theme-purple-deep "
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
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          );
        }
        return (
          <li
            key={element.label}
            className="px-3 py-2 text-xl font-semibold transition-colors duration-200 hover:text-emerald-700 "
          >
            <Link href={element.href} id={element.label}>
              {element.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default MainMenu;
