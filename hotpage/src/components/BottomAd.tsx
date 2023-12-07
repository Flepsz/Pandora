import React from "react";
import ButtonPW from "./ButtonPW";

export default function BottomAd() {
	return (
		<section className="bg-[#1C2023] h-[40rem] flexCenter flex-col gap-14">
      <h1 className="text-6xl font-bold text-dough">Your life without limits</h1>
			<div className="w-36">
				<ButtonPW text="Open" href="/openbox" />
			</div>
		</section>
	);
}
