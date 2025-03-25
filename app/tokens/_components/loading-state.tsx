import React from "react";
import Image from "next/image";

export default function LoadingState({
  activeTab,
  isBatchLoading,
  changeTab,
  renderSkeletons,
  isLoading,
}: {
  activeTab: string;
  isBatchLoading: boolean;
  changeTab: (tab: string) => void;
  renderSkeletons: (count: number) => React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Realtime Token Section */}
      <div className="p-4">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
          <h4 className="flex items-center text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
            <span className="text-xs font-normal ml-2 text-green-400">
              Loading data...
            </span>
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

        {/* Tokens Grid with Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">Low caps</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
              </div>
            </div>
            {renderSkeletons(3)}
          </div>

          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">$100k+</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
              </div>
            </div>
            {renderSkeletons(3)}
          </div>

          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">$1M+</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
                <span className="text-sm">BNB</span>
              </div>
            </div>
            {renderSkeletons(3)}
          </div>
        </div>
      </div>
    </div>
  );
}
