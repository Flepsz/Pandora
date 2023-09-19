"use client";
import swiperItems from "@/constants/index.js";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRightShort } from "react-icons/bs";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

interface SwiperProps {
	content: Array<{ title: string; content: string; icon: React.ReactElement }>;
}

const SwiperComponent = ({ content }: SwiperProps) => (
	<div className="flex flex-wrap gap-10"></div>
);

export default function FeatureSwiper() {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={3}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log("slide change")}
			direction="horizontal"
			className="flex flex-wrap gap-10"
		>
			{swiperItems.map((item) => (
				<SwiperSlide className="w-80 h-72 py-5 px-5 border border-zinc-200 rounded-xl">
					{React.cloneElement(item.icon, { className: "text-2xl mb-3" })}
					<h1 className="mb-10">{item.title}</h1>
					<p>{item.content}</p>
					<h2 className="flex items-center text-[#530082]">
						Read More
						<BsArrowRightShort className="text-3xl" />
					</h2>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
