import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

export default function EmptyState({
  activeTab,
  changeTab,
  isBatchLoading,
  isLoading,
  setInitialFetch,
  hasFetched,
  setIsLoading,
}: {
  activeTab: string;
  changeTab: (tab: string) => void;
  isBatchLoading: boolean;
  isLoading: boolean;
  setInitialFetch: (value: boolean) => void;
  hasFetched: React.MutableRefObject<boolean>;
  setIsLoading: (value: boolean) => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Realtime Token Section */}
      <div className="p-4">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
          <h4 className="flex items-center text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
          </h4>
          <div className="flex text-[16px] font-aktiv-medium font-medium ml-4 gap-2">
            <button
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "BSC"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("BSC")}
              disabled={isBatchLoading || isLoading}
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
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "ETH"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("ETH")}
              disabled={isBatchLoading || isLoading}
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
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "BASE"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("BASE")}
              disabled={isBatchLoading || isLoading}
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
              placeholder="Enter Token Name / Address / Symbol or wallet address"
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

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="relative w-32 h-32 mb-8">
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute inset-2 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "0.2s" }}
            ></div>
            <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-3 text-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            No Trades Found
          </motion.h2>

          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-md text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            There are currently no trades available for {activeTab}. Check back
            soon or try another chain.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => changeTab(activeTab === "ETH" ? "BSC" : "ETH")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Try Another Chain
            </button>
            <button
              onClick={() => {
                setInitialFetch(false);
                hasFetched.current = false;
                setIsLoading(true);
              }}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-16 opacity-30">
            <div className="rounded-[12px] border border-white/10 p-2 h-32"></div>
            <div className="rounded-[12px] border border-white/10 p-2 h-32"></div>
            <div className="rounded-[12px] border border-white/10 p-2 h-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
