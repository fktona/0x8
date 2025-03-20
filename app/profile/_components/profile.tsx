"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TradeItem from "./item";
import TokenHolding from "./holdings";
import TokenPnlItem from "./pnl";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState("1d");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("BNB");

  // Generate holdings data
  const holdings = Array(8)
    .fill(null)
    .map(() => ({
      token: "PONKE",
      value: "$34,908,876.90",
    }));

  // Add BNB as first holding
  holdings[0] = {
    token: "BNB",
    value: "$34,908,876.90",
  };

  // Generate trades data
  const trades = Array(8)
    .fill(null)
    .map((_, index) => ({
      type: index % 3 === 0 ? "Sell" : "Buy",
      amount: "45.5M",
      token: "PONKE",
      price: "23.4",
      currency: "BNB",
      time: "2hr",
    }));

  // Generate PNL data
  const pnlData = Array(15)
    .fill(null)
    .map(() => ({
      token: "PONKE",
      marketCap: "56.6K",
      priceChange: "-30.1%",
      priceChangeValue: "-$234.78",
      buyPrice: "23.56 BNB",
      sellAmount: "34.5M",
      time: "10m",
    }));

  return (
    <div className="min-h-screen  text-white flex flex-col">
      {/* Profile Header */}
      <div className="relative min-h-[191px]">
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-center mb-6">
            <button
              className="flex text-[31px] items-center gap-2 text-lg"
              onClick={() => router.back()}
            >
              Profile
            </button>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-yellow-400 text-black rounded-[13px] px-4 py-2">
                Alerts{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 19V20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V4.29C16.97 5.17 19 7.9 19 11V17L21 19ZM14 21C14 21.5304 13.7893 22.0391 13.4142 22.4142C13.0391 22.7893 12.5304 23 12 23C11.4696 23 10.9609 22.7893 10.5858 22.4142C10.2107 22.0391 10 21.5304 10 21"
                    fill="black"
                  />
                </svg>
              </button>
              <button className="flex items-center gap-2 bg-gray-800 text-white rounded-[13px]  px-4 py-2">
                Copy Trade{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.8127 4.125L10.3943 7.5434C10.2732 7.66447 10.1089 7.73249 9.93766 7.73249C9.76641 7.73249 9.60217 7.66447 9.48106 7.5434L8.45677 6.5191C8.33566 6.39803 8.17141 6.33001 8.00016 6.33001C7.82891 6.33001 7.66467 6.39803 7.54356 6.5191L4.771 9.29167"
                    stroke="white"
                    stroke-width="1.29167"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.1875 2.1875V11.7458C2.1875 12.4692 2.1875 12.8308 2.32829 13.1073C2.45213 13.3503 2.64972 13.5479 2.89275 13.6717C3.16917 13.8125 3.53083 13.8125 4.25417 13.8125H13.8125"
                    stroke="white"
                    stroke-width="1.29167"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full inset-0  bgg2 z-0 h-[191px]"></div>

          {/* Profile Info */}
          <div className="w-full flex  flex-col lg:justify-between relative z-20 items-start ">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-[135px] h-[135px] rounded-full flex items-center justify-center ">
                <Image
                  src={"/profile-placeholder.svg"}
                  alt={"BNB"}
                  width={300}
                  height={300}
                  className="rounded-full w-full h-full relative -top-[40%] object-center object-cover"
                />
              </div>

              <div className="mt-[25px] relative">
                <div className="flex font-aktiv-regular  items-center gap-[30px]">
                  <h2 className="text-[32px]">ROBO</h2>
                  <Image
                    src={"/x.svg"}
                    alt={"X"}
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <Image
                    src={"/telegram.svg"}
                    alt={"X"}
                    width={29}
                    height={29}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex lg:text-[16px] text-[12px] lg:mt-[25px] font-aktiv-medium font-medium lg:gap-[31px] gap-2">
              <button
                className={`px-[9px] lg:py-[10px] py-1.5 rounded-[10px]  flex items-center gap-1 ${
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
              {["1d", "3d", "7d", "14d", "30d"].map((period) => (
                <button
                  key={period}
                  className={` px-[9px] lg:py-[10px] py-1.5 rounded-[10px] lg:hidden ${
                    activePeriod === period ? "bg-white/25" : "bg-transparent"
                  }`}
                  onClick={() => setActivePeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Token Filters */}
            <div className="lg:flex justify-between hidden items-center mt-[25px]">
              <div className="flex gap-2">
                {["1d", "3d", "7d", "14d", "30d"].map((period) => (
                  <button
                    key={period}
                    className={`px-[10px] py-[10px] rounded-[10px] text-[16px] ${
                      activePeriod === period ? "bg-white/25" : "bg-transparent"
                    }`}
                    onClick={() => setActivePeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 text-[18px] font-aktiv-regular  grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Holdings */}
        <div className="bg-[#0C0C0C] max-w-[450px] border border-white/10 rounded-lg overflow-hidden">
          <div className="flex items-center py-[17.11px] justify-between p-3 border-b border-white/10">
            <h3 className="font-medium">TOP HOLDINGS</h3>
            <span className="text-white/80">{holdings[0].value}</span>
          </div>

          <div className="">
            {holdings.map((holding, index) => (
              <TokenHolding
                key={index}
                token={holding.token}
                value={holding.value}
              />
            ))}
          </div>
        </div>

        {/* DEFI Trades */}
        <div className="bg-[#0C0C0C] border font-aktiv-regular text-[16px] border-white/10 rounded-lg overflow-hidden">
          <div className="flex items-center w-full gap-4 justify-between p-3 border-b border-white/10">
            <h3 className="font-medium">DEFI TRADES</h3>

            <div className="ml-auto relative">
              <input
                type="text"
                placeholder="Enter wallet address"
                className="flex lg:w-[538px] h-[38px] p-[10px] flex-col justify-center items-center gap-[10px] rounded-[80px] bg-[rgba(12,12,12,0.93)]"
              />

              <Image
                src="/searchIcon.svg"
                alt="Enter wallet address"
                width={16}
                height={16}
                className="absolute right-[20px] lg:top-[20px] top-3"
              />
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {trades.map((trade, index) => (
              <TradeItem
                key={index}
                type={trade.type}
                amount={trade.amount}
                token={trade.token}
                price={trade.price}
                currency={trade.currency}
                time={trade.time}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Token PNL Section */}
      <div className="p-4">
        <div className="bg-[#111] border border-white/10  rounded-lg overflow-hidden mb-6">
          <div className="flex font-aktiv-regular text-[16px] items-center py-[12px] justify-between p-3 border-b border-white/10">
            <div className="flex items-center gap-4">
              <h3 className="font-aktiv-regular">Token PNL</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 bg-white/5  px-[10px] py-[12px] rounded text-sm">
                  Most Recent <span>▼</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500">224</span>
                <span>/</span>
                <span className="text-red-500">298</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">+234.45</span>
                <Image
                  src={"/bnb.svg"}
                  alt={"BNB"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                >
                  <path
                    d="M8.5 11L4.5 15M4.5 15L8.5 19M4.5 15H16.5M12.5 3L16.5 7M16.5 7L12.5 11M16.5 7H4.5"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>$23,548.9</span>
              </div>
            </div>
          </div>

          {/* Token PNL Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 px-[8px] py-[10px] gap-x-[11px] gap-y-[15px]">
            {pnlData.map((item, index) => (
              <TokenPnlItem
                key={index}
                token={item.token}
                marketCap={item.marketCap}
                priceChange={item.priceChange}
                priceChangeValue={item.priceChangeValue}
                buyPrice={item.buyPrice}
                sellAmount={item.sellAmount}
                time={item.time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
