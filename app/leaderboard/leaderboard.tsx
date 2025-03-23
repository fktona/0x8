"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import LeaderboardRow from "./leaderboardrow";
import { getLeaderBoard } from "../actions/action";
import LeaderboardRowSkeleton from "./leader-board-sk";
import type { LeaderBoard } from "@/types";
import { useTransition } from "react";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("ETH");
  const [error, setError] = useState<string | null>(null);
  const [boardData, setBoardData] = useState<LeaderBoard[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Use startTransition to handle the async state updates
    startTransition(async () => {
      setError(null);
      try {
        const res = await getLeaderBoard(activeTab);
        if (res && res.length > 0) {
          setBoardData(res);
        } else {
          setBoardData([]);
          setError("No leaderboard data available for this chain.");
        }
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
        setError("Failed to load leaderboard data. Please try again later.");
      } finally {
        console.log("finally");
      }
    });
  }, [activeTab]);

  // Handle tab changes with transitions
  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto bg-black text-white">
      {/* Leaderboard Section */}
      <div className="p-4 ">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row   ">
          <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
            <h4 className="flex items-center text-[20px] font-aktiv-bold font-bold justify-between gap-2">
              PNL Leaderboard
            </h4>

            <div className="flex text-[16px] font-aktiv-medium font-medium lg:ml-4 gap-2">
              <button
                className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 ${
                  activeTab === "BSC" ? "bg-white text-black" : "bg-transparent"
                }`}
                onClick={() => handleTabChange("BSC")}
                disabled={isPending}
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
                className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 ${
                  activeTab === "ETH" ? "bg-white text-black" : "bg-transparent"
                }`}
                onClick={() => handleTabChange("ETH")}
                disabled={isPending}
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
                className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 ${
                  activeTab === "BASE"
                    ? "bg-white text-black"
                    : "bg-transparent"
                }`}
                onClick={() => handleTabChange("BASE")}
                disabled={isPending}
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
          </div>
        </div>

        {/* Leaderboard List */}
        {error && (
          <div className="text-center text-red-500 font-bold">{error}</div>
        )}
        <div className="space-y-2 mt-[30px]">
          {!isPending && boardData.length > 0
            ? boardData.map((item, index) => (
                <LeaderboardRow
                  key={index}
                  rank={index + 1}
                  data={item}
                  activeTab={activeTab}
                />
              ))
            : Array(15)
                .fill(null)
                .map((_, index) =>
                  !error ? <LeaderboardRowSkeleton key={index} /> : null
                )}
        </div>
      </div>
    </div>
  );
}
