import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Typewriter from "@/components/TypeWriter";

export default function MainPage() {
  const textP = "Transform your banking. Enter to Pandora and take control like never before"
  return (
    <section className="relative flex flex-col rounded-b-xl sm:flex-row ">
      <div className="flex-col gap-4 flexCenter py-28 bg-blackp sm:w-1/2 sm:py-0 sm:rounded-bl-3xl">
        <p className="w-5/6 text-3xl font-bold text-dough md:text-4xl xl:text-5xl 2xl:text-6xl ">
          <Typewriter text={textP} delay={50} />
        </p>
        <div className="relative gap-3 px-6 py-2 mt-4 overflow-hidden rounded-lg cursor-pointer flexCenter bg-dough group xl:py-3 xl:px-7 xl:scale-125">
          <div className="absolute inset-0 w-0 bg-[#530082] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <Link
            href="/open-box"
            className="relative text-[#530082] font-bold group-hover:text-dough"
          >
            Open The Box
          </Link>
          <LuDownload color="#530082" size={20} />
        </div>
      </div>
      <div className="sm:w-1/2">
        <Image
          alt="Woman Pandora"
          src="/womanpic.svg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto sm:rounded-br-3xl"
        />
      </div>
      <div className="hidden bg-zinc-50 w-36 h-20 absolute z-10 rounded-tl-full rounded-tr-full m-auto left-0 right-0 bottom-0 flex-col items-center justify-center sm:flex md:w-56 md:h-28 lg:w-64 lg:h-32 dark:bg-[#0a0c0f]">
        <p className="pt-4 text-base font-semibold md:text-xl">Scroll Down</p>
        <IoIosArrowDown size={30} />
      </div>
    </section>
  );
}
