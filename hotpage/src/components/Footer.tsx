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
		<h4 className="text-xl font-bold">{title}</h4>
		<ul className="flex flex-col gap-2 text-base font-normal">
			{links.map((link) => (
				<Link href="/" key={link} className="text-zinc-700 dark:text-zinc-200 hover:text-[#530082] dark:hover:text-[#530082]">
					{link}
				</Link>
			))}
		</ul>
	</div>
);

export default function Footer() {
	return (
		<footer className="footer bg-zinc-100 dark:bg-zinc-900">
			<section className="flex flex-col w-4/5 gap-12">
				<div className="flex flex-col items-start">
					<Image src="/logoNavbar.svg" width={115} height={38} alt="Pandora" />
				</div>
				<div className="flex flex-wrap gap-12 text-justify">
					<FooterColumn
						title={footerLinks[0].title}
						links={footerLinks[0].links}
					/>
					<div className="flex flex-col flex-1 gap-4">
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
					<div className="flex flex-col flex-1 gap-4">
						<h4 className="text-xl font-bold">{footerLinks[4].title}</h4>
            <IconsFooter />
					</div>
					<div className="flex flex-col flex-1 gap-4">
						<Image src="/google-play-badge.svg" alt="Google Play Download" width={150} height={50} />
						<Image src="/app-store-badge.svg" alt="Google Play Download" width={150} height={50} />
					</div>
				</div>
			</section>
      <div className="w-11/12 h-2 border-t-2 mt-4 border-[#dedfe4]"></div>
			<UnderFooter />
		</footer>
	);
}
