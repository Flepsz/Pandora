import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <section className="flex rounded">
      <div className="flexCenter flex-col w-1/2 bg-[#1C2023]">
        <p className="text-4xl font-bold w-3/4 text-[#FAF5ED]">
          Transform your banking. Enter to <span className="text-[#8A05BE]">Pandora</span> and take control
          like never before
        </p>
        <div>
          <Link href="/open-box">Open The Box</Link>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          alt="Woman Pandora"
          src="/womanpic.svg"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
