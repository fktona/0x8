"use client";

import { useState } from "react";
import Image from "next/image";

interface TradeProps {
  walletAddress: string;
  coinType: "BNB" | "ETH" | "BASE";
}

export default function TradesList({ walletAddress, coinType }: TradeProps) {
  const [trades] = useState(generateTrades(coinType));

  return (
    <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image
            src={"profile-placeholder.svg"}
            alt={"BNB"}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm">ROBO</span>
          <Image
            src={"/x.svg"}
            alt={"X"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <Image
            src={"/bnb.svg"}
            alt={"BNB"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <Image
            src={"/eth.svg"}
            alt={"ETH"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <Image
            src={"/base.svg"}
            alt={"BASE"}
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <span className="text-sm">{walletAddress}</span>
          {coinType === "BNB" && (
            <Image
              src={"/bnb.svg"}
              alt={"BNB"}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          {coinType === "ETH" && (
            <Image
              src={"/eth.svg"}
              alt={"ETH"}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          {coinType === "BASE" && (
            <Image
              src={"/base.svg"}
              alt={"BASE"}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  trade.type === "Buy" ? "text-green-500" : "text-red-500"
                }
              >
                {trade.type}
              </span>
              <span>{`165 ${coinType}`}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500">25.56m</span>
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>PONKE</span>
            </div>

            <div className="text-gray-400">35s ago</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateTrades(coinType: string) {
  const types = ["Buy", "Sell"];
  const trades = [];

  // Generate 8 trades with alternating buy/sell
  for (let i = 0; i < 8; i++) {
    trades.push({
      type: i % 2 === 0 ? "Buy" : "Sell",
      amount: 165,
      coin: coinType,
      price: "25.56m",
      token: "PONKE",
      time: "35s ago",
    });
  }

  return trades;
}
