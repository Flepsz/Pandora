import { underFooter } from "@/constants";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

export default function UnderFooter() {
	return (
		<section className="flexCenter w-full flex-col text-[#161616]">
			<ul className="flex flex-row gap-2 text-xs flex-wrap mb-5">
				{underFooter[0].links.map((link) => (
					<Link href="/" key={link} className="hover:text-[#530082]">
						{link}
					</Link>
				))}
			</ul>
			<p className="text-xs mb-1 hover:text-[#530082] cursor-default">{underFooter[0].copyright}</p>
			<p className="text-xs flex gap-0.5 hover:text-[#530082] cursor-default">
				<IoLocationOutline />
				{underFooter[0].address}
			</p>
		</section>
	);
}
