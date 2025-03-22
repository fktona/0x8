"use client";

import { useState } from "react";
import Image from "next/image";
import TradesList from "./trade-list";
import { AlTransactionsProps } from "@/types";
import { useTransactionsStore } from "@/store/store";
export default function TradeComponents({
  allTransactions,
}: {
  allTransactions: AlTransactionsProps[];
}) {
  const [activeTab, setActiveTab] = useState("All");

  const { usersTransactions } = useTransactionsStore();

  return (
    <div className=" bg-black text-white">
      {/* Realtime Trades Section */}
      <div className="p-4 lg:py-[38px] py-[20px]">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
          <h4 className="flex  items-center text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
          </h4>
          <div className="flex text-[16px] font-aktiv-medium font-medium ml-4 gap-2">
            <button
              className={`px-[9px] py-[10px] rounded-[10px] ${
                activeTab === "All" ? "bg-white text-black" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            <button
              className={`px-[9px] py-[10px] rounded-[10px]  flex items-center gap-1 ${
                activeTab === "BSC" ? "bg-white text-black" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("BSC")}
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
          {/* 
          <button className="flex items-center gap-1 text-sm">
            <span>Filter Wallets</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>

        {/* Trades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {
            // Filter trades based on active tab
            allTransactions
              .filter((trade) => {
                if (activeTab === "All") return trade;
                return trade.transactions[0].chain === activeTab.toLowerCase();
              })
              .map((trade, index) => (
                <TradesList key={index} trades={trade} />
              ))
          }
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="p-4 border-t border-white/10 flex justify-between text-xs text-gray-400">
        <div>© 2025 0xscan. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#">Privacy</a>
          <a href="#">Terms of Use</a>
        </div>
      </footer> */}
    </div>
  );
}
