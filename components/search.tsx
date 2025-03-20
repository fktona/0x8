import React from "react";
import Image from "next/image";
function Search() {
  return (
    <div className="w-full relative">
      <div className="relative w-full  md:max-w-[85%] h-[57px]  mx-auto ">
        <input
          type="text"
          placeholder="Enter wallet address"
          className="rounded-[80px] md:h-[57px] h-[36px] font-aktiv-thin text-[11px] lg:text-[14px] w-full bg-[rgba(45,45,45,0.54)] shadow-[0px_5px_4px_0px_#000] flex  p-[10px] flex-col justify-center items-center gap-[10px] self-stretch"
        />
        <Image
          src="/searchIcon.svg"
          alt="search"
          width={16}
          height={16}
          className="absolute right-[20px] md:top-[20px] top-2.5"
        />
      </div>
    </div>
  );
}

export default Search;
