"use client";

import { useState } from "react";
import Image from "next/image";
import TokenPanel from "./token-panel";
import { useTransactionsStore } from "@/store/store";
import { GroupedTransactions, TradeTransaction } from "@/types";
import { copyToClipboard, groupByTokenInSymbol } from "@/libs/utils"; // Import the new grouping function
import ProfileLink from "@/components/profile-link";
import { Copy } from "lucide-react";

export default function TokensComponents() {
  const [activeTab, setActiveTab] = useState("BNB");
  const { transactions } = useTransactionsStore();

  // Group transactions by tokenOutSymbol
  const groupedTransactions = groupByTokenInSymbol(transactions);

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
                alt={"ETH"}
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
                alt={"BASE"}
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
        </div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(groupedTransactions)
            .sort(
              ([tokenOutSymbolA], [tokenOutSymbolB]) =>
                tokenOutSymbolB.length - tokenOutSymbolA.length
            )
            .map(([tokenOutSymbol, transactions]) => (
              <div
                key={tokenOutSymbol}
                className="rounded-[12px] border border-white/10 p-2"
              >
                <div className="flex items-center justify-between mb-2 px-3 py-2">
                  <button
                    onClick={() =>
                      copyToClipboard(transactions[0].tokenInAddress)
                    }
                    className="text-[16px] flex items-center justify-center gap-1 text-white/80"
                  >
                    {transactions[0].tokenInAddress.slice(0, 5)}***
                    {transactions[0].tokenInAddress.slice(-6)} <Copy />
                  </button>
                  <div className="text-[16px] flex items-center justify-center gap-1 text-white/80">
                    <Image
                      src={
                        transactions[0].tokenInLogo ||
                        transactions[0].tokenOutLogo ||
                        "/profile-placeholder.svg"
                      }
                      alt={"BNB"}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="text-[16px] flex items-center justify-center gap-1 text-white/80">
                      {tokenOutSymbol}
                    </span>
                  </div>
                </div>
                {/* Map the grouped transactions into TokenPanel components */}
                <div className="w-full h-[300px] overflow-y-auto custom-scrollbar bg-[#1B1B1B] border border-white/10 rounded-lg">
                  <div className="grid grid-cols-4 text-xs text-gray-400 p-2 ">
                    <div>Traders</div>
                    <div>Bought</div>
                    <div>Got</div>
                    <div>Time</div>
                  </div>

                  {transactions.map((transaction, index) => (
                    <TokenPanel
                      key={index}
                      {...transaction} // Assuming this property exists
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
