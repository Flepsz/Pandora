import Link from "next/link";
import React from "react";

interface ButtonPWI {
  text: string;
  href: string;
}

export default function ButtonPW({ text, href }: ButtonPWI) {
	return (
		<Link
			href={href}
			className="flexCenter gap-3 text-white bg-[#530082] py-2 px-6 rounded-lg cursor-pointer group relative overflow-hidden xl:py-3 xl:px-7 xl:scale-125"
		>
			<div className="absolute inset-0 w-0 bg-[#FAF5ED] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
			<div className="relative font-bold text-white group-hover:text-[#530082]">
				{text}
			</div>
		</Link>
	);
}
