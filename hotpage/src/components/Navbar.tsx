"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import Image from "next/image";
import { navLinks } from "@/constants";

export const isScrollingNavbar = () => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

	const handleScroll = () => {
		if (window.scrollY >= 23) {
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

	return isScrolling
}

export default function Navbar() {

	const isScrolling = isScrollingNavbar()

	return (
		<>
			<AnimatePresence>
				{isScrolling ? (
					<NavbarScroll isScrolling={isScrolling} />
				) : (
					<NavbarFixed />
				)}
			</AnimatePresence>
		</>
	);
}

function NavbarFixed() {
	return (
		<motion.nav
			key={2}
			initial="initial"
			animate="animateF"
			exit="exit"
			variants={NavAnimations}
			transition={{ ease: "linear", duration: 0.5 }}
			className="fixed z-10 flex justify-between w-full px-8 py-2 top-4 left-1/2"
		>
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
				<ul className="flex items-center font-medium text-black dark:text-white">
					{navLinks.map((link) => (
						<li
							className="relative flex-col hidden px-5 overflow-hidden text-xl font-normal group md:flex"
							key={link.key}
						>
							<Link
								href={link.href}
								className="relative after:bg-[#530082] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer hover:text-zinc-700"
							>
								{link.text}
							</Link>
						</li>
					))}
				</ul>
				{/* <ThemeSwitcher /> */}
				<Link href="/openbox" className="px-6 py-3 ml-2 text-white bg-[#530082] border border-purple-800 rounded-full text-md group relative overflow-hidden">
					<div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
					<div
						className="relative font-semibold text-white group-hover:text-[#530082]"
					>
						Open Box
					</div>
				</Link>
		</motion.nav>
	);
}

function NavbarScroll({ isScrolling }: { isScrolling: boolean }) {
	return (
		<motion.nav
			key={1}
			initial="initial"
			animate={isScrolling ? "animate" : "initial"}
			exit="exit"
			transition={{
				ease: "linear",
				duration: 2,
				x: { duration: 1 },
			}}
			variants={NavAnimations}
			className="fixed z-20 flex justify-between px-4 py-2 rounded-full z-1 bg-slate-600 bg-opacity-80 left-1/2 top-10"
		>
			<ul className="flex items-center">
				{navLinks.map((link) => (
						<li
							className="relative hidden px-2 overflow-hidden font-medium text-white text-md group md:flex"
							key={link.key}
						>
							<Link
								href={link.href}
								className="relative after:bg-[#530082] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer hover:text-zinc-200"
							>
								{link.text}
							</Link>
						</li>
					))}
				<li className="px-4 py-2 ml-2 text-white bg-[#530082] border border-purple-800 rounded-full text-md group relative overflow-hidden">
					<div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
					<Link
						href="#"
						className="relative font-semibold text-white group-hover:text-[#530082]"
					>
						Open Box
					</Link>
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
	animateF: {
		y: 0,
		x: "-50%",
		opacity: 1,
		transition: {
			type: "spring",
			damping: 20,
			stiffness: 200,
		},
	},
	exit: {
		y: -50,
		opacity: 0,
		transition: { duration: 0.5, ease: easeInOut }
	},
};
