"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useTheme } from "@/context/theme-context";

export default function Header() {
  const [activeSection, setActiveSection] = useState("Home");
  //doing seperation between the header bg and links for the animation effect to work
  const { theme } = useTheme();
  return (
    <header className="z-[999] relative">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed z-50 hidden md:-top-5 lg:-top-5 md:hidden lg:block sm:hidden"
      >
        <Image
          src="/profile.png"
          width={150}
          height={150}
          alt="Picture"
          className={theme === "dark" ? "invert" : ""}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-80"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className="fixed flex top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex md:hidden lg:hidden items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 w-[22rem] flex-wrap gap-5">
          {links.map((link) => (
            <motion.li
              className="relative flex items-center justify-center h-3/4"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex items-center justify-center w-full px-3 py-3 transition hover:text-gray-950 dark:text-gray-500",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => setActiveSection(link.name)}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="absolute inset-0 bg-gray-100 rounded-full -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
        <ul className="md:flex lg:flex w-full justify-center items-center text-[0.9rem] font-medium text-gray-500 sm:w-auto hidden">
          {links.map((link, index) => (
            <React.Fragment key={link.hash}>
              <motion.li
                className="flex items-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className="px-4 py-3 hover:text-gray-950 dark:hover:text-gray-500 dark:md:text-gray-200"
                  href={link.hash}
                >
                  {link.name}
                </Link>
              </motion.li>
              {index < links.length - 1 && (
                <motion.div
                  className="h-[12px] w-[1px] bg-gray-400 mx-1"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                ></motion.div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </header>
  );
}
