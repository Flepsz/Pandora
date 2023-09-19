"use client"
import React, { ReactElement } from "react";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

export default function IconsFooter(): ReactElement {
  const defaultColor = "#1C2023";
  const hoverColor = "#530082";

  const handleIconMouseOver = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.currentTarget.style.color = hoverColor;
  };

  const handleIconMouseOut = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.currentTarget.style.color = defaultColor;
  };

  return (
    <div className="flex gap-2 cursor-pointer">
      <AiFillFacebook
        size={40}
        onMouseOver={handleIconMouseOver}
        onMouseOut={handleIconMouseOut}
      />
      <AiFillInstagram
        size={40}
        onMouseOver={handleIconMouseOver}
        onMouseOut={handleIconMouseOut}
      />
      <AiFillLinkedin
        size={40}
        onMouseOver={handleIconMouseOver}
        onMouseOut={handleIconMouseOut}
      />
      <AiOutlineTwitter
        size={40}
        onMouseOver={handleIconMouseOver}
        onMouseOut={handleIconMouseOut}
      />
    </div>
  );
}
