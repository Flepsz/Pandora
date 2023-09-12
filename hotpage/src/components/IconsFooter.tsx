"use client";
import {
	AiFillFacebook,
	AiOutlineTwitter,
	AiFillLinkedin,
	AiFillInstagram,
} from "react-icons/ai";

export default function IconsFooter() {
	return (
		<div className="flex gap-2 cursor-pointer">
			<AiFillFacebook
				size={40}
				onMouseOver={({ target }) => (target.style.color = "#530082")}
				onMouseOut={({ target }) => (target.style.color = "#1C2023")}
			/>
			<AiFillInstagram
				size={40}
				onMouseOver={({ target }) => (target.style.color = "#530082")}
				onMouseOut={({ target }) => (target.style.color = "#1C2023")}
			/>
			<AiFillLinkedin
				size={40}
				onMouseOver={({ target }) => (target.style.color = "#530082")}
				onMouseOut={({ target }) => (target.style.color = "#1C2023")}
			/>
			<AiOutlineTwitter
				size={40}
				onMouseOver={({ target }) => (target.style.color = "#530082")}
				onMouseOut={({ target }) => (target.style.color = "#1C2023")}
			/>
		</div>
	);
}
