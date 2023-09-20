"use client";
import swiperItems from "@/constants/index.js";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRightShort } from "react-icons/bs";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeatureSwiper() {
	return (
		<section className="mx-6">
			<Swiper
				modules={[Pagination, A11y]}
				spaceBetween={10}
				slidesPerView={3}
				pagination={{ clickable: true }}
				breakpoints={{
					540: {
						slidesPerView: 1,
					},
					639: {
						slidesPerView: 2,
					},
					1000: {
						slidesPerView: 3,
					},
					1500: {
						slidesPerView: 4,
					},
				}}
			>
				{swiperItems.map((item) => (
					<SwiperSlide className="w-96 py-5 px-5 border border-zinc-200 rounded-xl mb-8">
						{React.cloneElement(item.icon, { className: "text-2xl mb-3 text-[#530082]" })}
						<h1 className="mb-10">{item.title}</h1>
						<p>{item.content}</p>
						<h2 className="flex items-center font-semibold mt-6 text-[#530082]">
							Read More
							<BsArrowRightShort className="text-3xl" />
						</h2>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
