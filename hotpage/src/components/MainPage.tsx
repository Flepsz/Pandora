import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

export default function MainPage() {
  return (
    <section className="flex rounded-b-xl relative">
      <div className="flexCenter flex-col w-1/2 gap-4 bg-[#1C2023] rounded-bl-3xl">
        <p className="text-4xl font-bold w-3/4 text-[#FAF5ED] xl:text-5xl 2xl:text-6xl">
          Transform your banking. Enter to{" "}
          <span className="text-[#8A05BE]">Pandora</span> and take control like
          never before
        </p>
        <div className="flexCenter gap-3 bg-[#FAF5ED] py-2 px-6 rounded-lg cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 w-0 bg-[#530082] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <Link
            href="/open-box"
            className="relative text-[#530082] font-bold group-hover:text-[#FAF5ED]"
          >
            Open The Box
          </Link>
          <LuDownload color="#530082" size={20} />
        </div>
      </div>
      <div className="w-1/2 rounded-br-3xl">
        <Image
          alt="Woman Pandora"
          src="/womanpic.svg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <div className="bg-zinc-50 w-64 h-32 absolute z-10 rounded-tl-full rounded-tr-full m-auto left-0 right-0 bottom-0 flex flex-col items-center justify-center">
        <p className="text-xl font-semibold pt-4">Scroll Down</p>
        <IoIosArrowDown size={30} />
      </div>
    </section>
  );
}
