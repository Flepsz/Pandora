"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { navLinks } from "@/constants";

export default function Navbar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <>
    //   <AnimatePresence>
    //     {isScrolling ? (
    //       <NavbarScroll isScrolling={isScrolling} />
    //     ) : (
    <NavbarFixed />
    //     )}
    //   </AnimatePresence>
    // </>
  );
}

function NavbarFixed() {
  return (
    <nav className="fixed z-10 flex justify-between w-full px-8 py-2 top-4">
      <div className="flex items-center gap-2 text-black">
        <Link href="/">
          <Image
            alt="LogoPandora"
            src="/logoNavbar.svg"
            width={120}
            height={50}
          />
        </Link>
      </div>
      <ul className="flex items-center text-black font-medium dark:text-white">
        {navLinks.map((link) => (
          <li className="hidden flex-col px-5 text-xl font-normal overflow-hidden group relative md:flex">
            <Link
              href={link.href}
              key={link.key}
              className="relative after:bg-[#530082] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer hover:text-zinc-700"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      {/* <ThemeSwitcher /> */}
      <li className="px-6 py-3 ml-2 text-white bg-[#530082] border border-purple-800 rounded-full text-md group relative overflow-hidden">
        <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <Link
          href={"/"}
          className="relative font-semibold text-white group-hover:text-[#530082]"
        >
          Open Box
        </Link>
      </li>
    </nav>
  );
}

function NavbarScroll({ isScrolling }: { isScrolling: boolean }) {
  return (
    <motion.nav
      key={1}
      initial="initial"
      animate={isScrolling ? "animate" : "initial"}
      exit="exit"
      variants={NavAnimations}
      className="fixed z-10 flex justify-between px-4 py-2 rounded-full ts-bg left-1/2 top-10"
    >
      <ul className="flex items-center">
        <li className="px-2 text-black font-medium text-md">
          <Link href={"/pods"}>Home</Link>
        </li>
        <li className="px-2 text-white text-md">
          <Link href={"/"}>Products and Services</Link>
        </li>
        <li className="px-2 text-white text-md">
          <Link href={"/"}>About Us</Link>
        </li>
        <li className="px-4 py-2 ml-2 text-white bg-black rounded-full text-md">
          <Link href={"/"}>Open Box</Link>
        </li>
      </ul>
    </motion.nav>
  );
}

const NavAnimations = {
  initial: {
    y: -50,
    x: "-50%",
    opacity: 0,
  },
  animate: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};
