import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import IconsFooter from "./IconsFooter";
import UnderFooter from "./UnderFooter";


interface ColumnProps {
	title: string;
	links: Array<string>;
}

const FooterColumn = ({ title, links }: ColumnProps) => (
	<div className="footer_column">
		<h4 className="font-bold text-xl">{title}</h4>
		<ul className="flex flex-col gap-2 font-normal text-base">
			{links.map((link) => (
				<Link href="/" key={link} className="hover:text-[#530082]">
					{link}
				</Link>
			))}
		</ul>
	</div>
);

export default function Footer() {
	return (
		<footer className="flexCenter footer m-auto">
			<section className="flex flex-col gap-12 w-full">
				<div className="flex items-start flex-col">
					<Image src="/logoNavbar.svg" width={115} height={38} alt="Pandora" />
				</div>
				<div className="flex flex-wrap gap-12">
					<FooterColumn
						title={footerLinks[0].title}
						links={footerLinks[0].links}
					/>
					<div className="flex-1 flex flex-col gap-4">
						<FooterColumn
							title={footerLinks[1].title}
							links={footerLinks[1].links}
						/>
					</div>
					<FooterColumn
						title={footerLinks[2].title}
						links={footerLinks[2].links}
					/>
					<FooterColumn
						title={footerLinks[3].title}
						links={footerLinks[3].links}
					/>
					<div className="flex-1 flex flex-col gap-4">
						<h4 className="font-bold text-xl">{footerLinks[4].title}</h4>
            <IconsFooter />
					</div>
				</div>
			</section>
      <div className="w-full h-2 border-t-2 border-[#dedfe4]"></div>
			<UnderFooter />
		</footer>
	);
}
