import ButtonPW from "@/components/ButtonPW";
import ButtonWP from "@/components/ButtonWP";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<Reveal width="100%">
			<div className="bg-[#1C2023] w-screen h-screen flex flex-col">
				<h1 className="absolute font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2 text-[#FAF5ED] text-4xl">What you wanna do?</h1>
				<div className="w-screen h-screen flexCenter">
					<div className="w-1/6 m-auto">
						<ButtonWP text="Register" href="/register" />
					</div>
					<div className="w-1/6 m-auto">
						<ButtonPW text="Login" href="/download" />
					</div>
				</div>
        <Link href="/">
          <Image src="/content/logo-white.svg" width={50} height={50} alt="Pandora Logo" className="absolute transform -translate-x-1/2 -translate-y-1/2 bottom-10 left-1/2"/>
        </Link>
			</div>
		</Reveal>
	);
}
