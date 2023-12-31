"use client";

import ButtonPW from "@/components/ButtonPW";
import ButtonWP from "@/components/ButtonWP";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function OpenBoxPage() {
  // Accessing the router object from Next.js
  const router = useRouter();

  return (
    <Reveal width="100%">
      <div className="flex flex-col w-screen h-screen bg-blackp">
        {/* Heading for user prompt */}
        <h1 className="absolute text-4xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2 text-dough">
          What you are?
        </h1>
        {/* Container for buttons */}
        <div className="w-screen h-screen flexCenter">
          <div className="w-1/6 m-auto">
            {/* Button for Natural Person */}
            <ButtonWP
              onClick={() => router.push("/register/customernp")}
              text="Natural Person"
              href="/register/customernp"
            />
          </div>
          <div className="w-1/6 m-auto">
            {/* Button for Legal Person */}
            <ButtonPW
              onClick={() => router.push("register/customerlp")}
              text="Legal Person"
              href="/register/customerlp"
            />
          </div>
        </div>
        {/* Link to home with Pandora Logo */}
        <Link href="/">
          <Image
            src="/content/logo-white.svg"
            width={50}
            height={50}
            alt="Pandora Logo"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 bottom-10 left-1/2"
          />
        </Link>
      </div>
    </Reveal>
  );
}
