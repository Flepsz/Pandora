import Image from "next/image";
import React from "react";

export default function RegisterPage() {
	return (
		<div className="flex">
			<section className="w-[50%]">
				<Image
					src="/neymar.svg"
					width={0}
					height={0}
					alt="Neymar Jr"
          
					className="w-full h-screen rounded-e-[5rem]"
				/>
			</section>
			<section className="w-full m-12 bg-white rounded-3xl"></section>
		</div>
	);
}
