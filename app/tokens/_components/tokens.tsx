"use client";

import { useState } from "react";
import Image from "next/image";
import TokenPanel from "./token-panel";

export default function TokensComponents() {
  const [activeTab, setActiveTab] = useState("BNB");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Realtime Token Section */}
      <div className="p-4">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
          <h4 className="flex  items-center text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
          </h4>
          <div className="flex text-[16px] font-aktiv-medium font-medium ml-4 gap-2">
            <button
              className={`px-[9px] py-[10px] rounded-[10px]  flex items-center gap-1 ${
                activeTab === "BNB" ? "bg-white text-black" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("BNB")}
            >
              <Image
                src={"/bnb.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              BNB
            </button>
            <button
              className={`px-[9px] py-[10px] rounded-[10px]  flex items-center gap-1 ${
                activeTab === "ETH" ? "bg-white text-black" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("ETH")}
            >
              <Image
                src={"/eth.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              ETH
            </button>
            <button
              className={`px-[9px] py-[10px] rounded-[10px]  flex items-center gap-1 ${
                activeTab === "BASE" ? "bg-white text-black" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("BASE")}
            >
              <Image
                src={"/base.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              BASE
            </button>
          </div>

          <div className="ml-auto relative w-full lg:w-[538px]">
            <input
              type="text"
              placeholder="Enter wallet address"
              className="flex lg:w-[538px] w-full h-[49px] p-[10px] flex-col justify-center items-center gap-[10px] rounded-[80px] bg-[rgba(12,12,12,0.93)]"
            />

            <Image
              src="/searchIcon.svg"
              alt="Enter wallet address"
              width={16}
              height={16}
              className="absolute right-[20px] top-[20px]"
            />
          </div>
        </div>{" "}
        {/* Tokens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=" rounded-[12px] border border-white/10 p-2">
            <div className="flex items-center justify-between mb-2 px-3 py-2 ">
              <span className="text-[16px] text-white/80">Low caps</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
                  ₿
                </div>
                <span className="text-sm">BNB</span>
              </div>
            </div>
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="MAYA"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
          </div>

          <div className=" rounded-[12px] border border-white/10 p-2">
            <div className="flex items-center justify-between mb-2 px-3 py-2 ">
              <span className="text-[16px] text-white/80">$100k+</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
                  ₿
                </div>
                <span className="text-sm">BNB</span>
              </div>
            </div>
            <TokenPanel
              tokenName="MAYA"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
          </div>

          <div className=" rounded-[12px] border border-white/10 p-2">
            <div className="flex items-center justify-between mb-2 px-3 py-2 ">
              <span className="text-[16px] text-white/80">$1M+</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
                  ₿
                </div>
                <span className="text-sm">BNB</span>
              </div>
            </div>
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="MAYA"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
            <TokenPanel
              tokenName="PONKE"
              marketCap="56.6K"
              priceChange="-30.1%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
