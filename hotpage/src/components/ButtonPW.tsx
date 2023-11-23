import Link from "next/link";
import React from "react";

interface ButtonPWI {
  text: string;
  href: string;
	onClick?: () => void;
}

export default function ButtonPW({ text, href, onClick }: ButtonPWI) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="flexCenter gap-3 text-white bg-[#530082] py-2 px-6 rounded-lg cursor-pointer group relative overflow-hidden xl:py-3 xl:px-7 xl:scale-125"
		>
			<div className="absolute inset-0 w-0 bg-dough transition-all duration-[250ms] ease-out group-hover:w-full"></div>
			<div className="relative font-bold text-white group-hover:text-[#530082]">
				{text}
			</div>
		</Link>
	);
}
