import Image from "next/image";

export default function AppShow() {
  return (
    <section className="flexCenter flex-col">
      <div className="flexCenter flex-col w-3/5 mt-16 gap-4 m-auto text-center">
        <p className="text-2xl font-light text-[#6A686A] dark:text-zinc-400">More than a bank</p>
        <h1 className="text-6xl text-[#383838] font-bold dark:text-dough">
          A Super <span className="text-[#530082]">App</span> that simplifies your Life
        </h1>
        <p className="text-2xl font-light text-[#6A686A] dark:text-zinc-400">
          Digital account, online shopping, airline tickets, investments,
          telemedicine, and much more. All of this without changing apps.
        </p>
      </div>
      <Image src="./phoneapp.svg" alt="App Pandora" width="0" height="0" className="w-full sm:w-3/4 2xl:w-2/4 animate-float" />
    </section>
  );
}
