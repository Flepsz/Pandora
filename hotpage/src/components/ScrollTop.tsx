"use client";

import { isScrollingNavbar } from "./Navbar";

export default function ScrollTop() {
  const isScrolling = isScrollingNavbar()

	const scrollBackToTop = () => {
		document.documentElement.style.scrollBehavior = "smooth";
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
	return (
		<button
			className={` ${isScrolling ? `fixed z-40 bottom-4 right-4 p-3 bg-[#530082] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#471c5f] hover:shadow-lg focus:bg-[#530082] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#300d44] active:shadow-lg transition duration-150 ease-in-out` : `hidden`}`}
			onClick={scrollBackToTop}
		>
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				className="w-4 h-4"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
			>
				<path
					fill="currentColor"
					d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
				></path>
			</svg>
		</button>
	);
}
