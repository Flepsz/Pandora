"use client";
import Image from "next/image";
import React from "react";
import ButtonWP from "./ButtonWP";
import ButtonPW from "./ButtonPW";
import Forms from "./forms/Forms";

interface RegisterLoginPageI {
	isRegister?: boolean;
	isCustomerNP?: boolean;
}

export default function RegisterLoginPage({
	isRegister,
	isCustomerNP,
}: RegisterLoginPageI) {
	return (
		<div className="flex h-[calc(100vh-6rem)] bg-blackp">
			<section className="w-[45%] h-full hidden md:block">
				<div className="h-full">
					<Image
						src="/neymar.svg"
						width={500}
						height={500}
						alt="Neymar Jr"
						className="object-cover w-full h-full"
					/>
				</div>
			</section>
			<section className="w-full">
				<Forms isRegister={isRegister} isCustomerNP={isCustomerNP} />
			</section>
		</div>
	);
}
