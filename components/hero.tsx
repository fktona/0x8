import { cn } from "@/libs/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
function Hero() {
  return (
    <div className="relative flex h-full pb-[91px] flex-col lg:flex-row  items-center justify-between ">
      <div className="uppercase font-aktiv-bold   font-extrabold lg:text-[52px] md:text-[36px] text-[31px]">
        <ul className="flex gap-1 font-normal">
          {["Multichain", "BNB", "ETH", "Base"].map((token, index) => (
            <li
              key={index}
              className={cn(
                "lg:text-[12.26px] text-[10px] font-aktiv-regular lg:rounded-full lg:mt-[80px] md:mt-[43px] mt-[27px] bg-white/[0.08] text-white/[0.56]  rounded-[55px] px-[9.5px] lg:py-[5.5px] py-1  flex justify-center gap-[5px] items-center",
                index === 0 && "bg-white/[0.24]"
              )}
            >
              {token}
            </li>
          ))}
        </ul>
        <h1>Track the leading</h1>
        <h1 className="text-[#FFD238] flex items-center justify-start gap-[8px]">
          memecoin
          <Image
            alt="min"
            src="/hero-g1.svg"
            width={"500"}
            height={"300"}
            className="lg:w-[170px]   md:h-[40px] h-[26px]"
          />
        </h1>
        <h1>traders in real time</h1>
        <Link href="/trades">
          <button className="bg-white hover:bg-white/80 md:mt-[36px] mt-[25px] text-[16px] font-medium text-[#000] rounded-[80px] px-[20px] py-[10px] lg:px-[42px] lg:py-[17px]">
            Get started
          </button>
        </Link>
      </div>
      <div className="relative md:block -right-[40px] 2xl:-right-[80px] hidden h-[400px] w-[500px] ">
        <Image alt="hero" src="/hero-g2.svg" fill />
      </div>
      <div className="relative  md:hidden h-[212px] w-full flex justify-center mt-[54px]">
        <Image alt="hero" src="/hd-g2mb.svg" fill />
      </div>
    </div>
  );
}

export default Hero;
