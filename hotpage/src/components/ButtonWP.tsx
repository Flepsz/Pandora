import Link from "next/link";
import React from "react";

interface ButtonWPI {
  text: string;
	href: string;
}

export default function ButtonWP({ text, href }: ButtonWPI) {
	return (
		<Link
			href={href}
			className="relative gap-3 px-6 py-2 overflow-hidden rounded-lg cursor-pointer flexCenter bg-dough group xl:py-3 xl:px-7 xl:scale-125"
		>
			<div className="absolute inset-0 w-0 bg-[#530082] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
			<div className="relative text-[#530082] font-bold group-hover:text-dough">
				{text}
			</div>
		</Link>
	);
}
