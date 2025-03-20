"use client";
import Image from "next/image";
import { useState } from "react";
import LeaderboardRow from "./leaderboardrow";
const leaderboardData = Array(15)
  .fill(null)
  .map((_, index) => ({
    rank: index + 1,
    name: "ROBO",
    walletAddress: "hgkRWt1nFFhgkRWt1nFFurur",
    winLoss: "34/1",
    profit: "+341.19 BNB",
    usdValue: "$23,548.9",
  }));

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("BNB");
  const [activePeriod, setActivePeriod] = useState("Daily");

  // Generate leaderboard data

  return (
    <div className="min-h-screen max-w-[960px] mx-auto bg-black text-white">
      {/* Leaderboard Section */}
      <div className="p-4 ">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row   ">
          <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
            <h4 className="flex items-center text-[20px] font-aktiv-bold font-bold justify-between gap-2">
              PNL Leaderboard
            </h4>

            <div className="flex text-[16px] font-aktiv-medium font-medium lg:ml-4 gap-2">
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
                  activeTab === "BASE"
                    ? "bg-white text-black"
                    : "bg-transparent"
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
          </div>

          <div className="flex rounded-full lg:w-auto w-fit mt-5 lg:mt-0  bg-gray-800 lg:p-1">
            <button
              className={`px-[20px] py-[10px]  flex items-center rounded-full ${
                activePeriod === "Daily" ? "bg-white text-black" : ""
              }`}
              onClick={() => setActivePeriod("Daily")}
            >
              Daily
            </button>
            <button
              className={`px-[20px] py-[10px]  flex items-center rounded-full ${
                activePeriod === "Weekly" ? "bg-white text-black" : ""
              }`}
              onClick={() => setActivePeriod("Weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-[20px] py-[10px]  flex items-center rounded-full ${
                activePeriod === "Monthly" ? "bg-white text-black" : ""
              }`}
              onClick={() => setActivePeriod("Monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2 mt-[30px]">
          {leaderboardData.map((item, index) => (
            <LeaderboardRow
              key={index}
              rank={item.rank}
              name={item.name}
              walletAddress={item.walletAddress}
              winLoss={item.winLoss}
              profit={item.profit}
              usdValue={item.usdValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
