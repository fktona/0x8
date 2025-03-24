"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileLink from "@/components/profile-link";
import { AlTransactionsProps, TradeTransaction } from "@/types";
import { cn, copyToClipboard, formatNumber, timeAgo } from "@/libs/utils";

interface TradeProps {
  trades: AlTransactionsProps;
}

export default function TradesList({ trades }: TradeProps) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ProfileLink walletAddress={trades.wallet}>
            <Image
              src={trades?.imageUrl || "/profile-placeholder.svg"}
              alt={"BNB"}
              width={30}
              height={30}
              className="rounded-full"
            />
          </ProfileLink>

          <span className="text-sm">{trades.name}</span>
          {trades.twitter && (
            <a
              href={`https://x.com/${trades.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={"/x.svg"} alt="X" width={16} height={16} />
            </a>
          )}
          {trades.telegram && (
            <a
              href={`https://t.me/${trades.telegram}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/telegram.svg"}
                alt="Telegram"
                width={20}
                height={20}
              />
            </a>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => copyToClipboard(trades?.wallet)}
            className="text-sm mr-3"
          >
            {trades.wallet.slice(0, 5)}***{trades.wallet.slice(-5)}
          </button>
          {trades.chains.includes("bsc") && (
            <Image
              src={"/bnb.svg"}
              alt={"BNB"}
              width={20}
              height={20}
              className="rounded-full opacity-50 hover:opacity-100"
            />
          )}
          {trades.chains.includes("eth") && (
            <Image
              src={"/eth.svg"}
              alt={"ETH"}
              width={20}
              height={20}
              className="rounded-full  opacity-50 hover:opacity-100"
            />
          )}
          {trades.chains.includes("base") && (
            <Image
              src={"/base.svg"}
              alt={"base"}
              width={20}
              height={20}
              className="rounded-full  opacity-50 hover:opacity-100"
            />
          )}
        </div>
      </div>

      <div className="divide-y divide-white/5 h-[320px] lg:h-[390px] overflow-y-auto scrollbar custom-scrollbar">
        {trades.transactions.map((trade, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className={
                  trade.type === "buy"
                    ? "text-green-500 uppercase"
                    : "text-red-500 uppercase"
                }
              >
                {trade.type}
              </span>
              <span
                className={cn(
                  "uppercase",
                  trade.type == "buy" ? "text-green-500" : "text-red-500"
                )}
              >{`${
                trade.type == "buy"
                  ? formatNumber(trade.tokenOutAmount)
                  : formatNumber(trade.tokenInAmount)
              } ${trade.chain}`}</span>
            </div>

            <div className="flex items-center  w-[120px] gap-2">
              <span className="text-yellow-500">
                {trade.type == "buy"
                  ? formatNumber(trade.tokenInAmountUsd)
                  : formatNumber(trade.tokenInAmountUsd)}
              </span>
              <Image
                src={
                  trade.type === "buy"
                    ? trade?.tokenInLogo ?? `${trade.chain}.svg`
                    : trade?.tokenOutLogo || `${trade.chain}.svg`
                }
                alt={
                  trade.type == "buy"
                    ? trade?.tokenInSymbol
                    : trade.tokenInSymbol
                }
                width={16}
                height={16}
                className="rounded-full"
              />
              <span>
                {trade.type == "buy"
                  ? trade?.tokenInSymbol
                  : trade?.tokenInSymbol}
              </span>
            </div>

            <span className="text-white/80">
              {timeAgo(trade.blockTimestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
