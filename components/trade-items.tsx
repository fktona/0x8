"use client";

import { useTransition, useState } from "react";
import ProfileLink from "./profile-link";
import Image from "next/image";
import DexLink from "./dex-link";
import { cn, formatNumber, timeAgo } from "@/libs/utils";
import type { TokenMetaData, TradeTransaction } from "@/types";
import TruncatedText from "./forced-trucate";

function TradeItems({
  item,
}: {
  item:
    | (TradeTransaction & {
        name: string;
        imageUrl: string;
      })
    | undefined;
}) {
  const [pending, startTransition] = useTransition();
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetaData | null>(
    null
  );

  const tokenValue = (token: string, amount: string) => {
    if (token.startsWith("-")) {
      token = token.startsWith("-") ? token.slice(1) : token;
      amount = amount.startsWith("-") ? amount.slice(1) : amount;
    }
    const value = Number.parseFloat(amount) / Number.parseFloat(token);
    return value;
  };

  if (!item) return null;
  return (
    <div className="flex w-full flex-wrap text-[10px] justify-start 2xl:justify-between items-center gap-[6px] text-white/80 font-light">
      <ProfileLink walletAddress={item.wallet}>
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          width={20}
          height={20}
          className="rounded-full w-5 h-5"
        />
      </ProfileLink>

      <TruncatedText
        text={item.name}
        maxLength={10}
        forceTruncate={true}
        className="text-white/80 font-light w-10"
      />

      <span
        className={
          item.type === "buy" ? "text-green-500 w-8" : "text-red-500 w-8"
        }
      >
        {item.type === "buy" ? "Bought" : "Sold"}
      </span>

      <span
        className={cn(
          item.type == "buy" ? "text-green-500" : "text-red-500",
          ""
        )}
      >
        {item.type === "buy"
          ? `${formatNumber(item.tokenOutAmount)} `
          : `${formatNumber(item.tokenOutAmount)} `}
        <TruncatedText
          text={item.type === "buy" ? item.tokenOutSymbol : item.tokenInSymbol}
          maxLength={4}
          forceTruncate={true}
        />
      </span>

      <span className="text-white/80">Of</span>

      <DexLink
        tokenAddress={
          item.type === "buy" ? item.tokenInAddress : item.tokenOutAddress
        }
        chain={item.chain}
      >
        <div className="flex items-center gap-1 w-10">
          <Image
            src={
              item.type === "buy"
                ? item?.tokenInLogo ?? `/${item.chain}.svg`
                : item?.tokenOutLogo || `/${item.chain}.svg`
            }
            alt={item.type == "buy" ? item?.tokenInSymbol : item.tokenOutSymbol}
            width={16}
            height={16}
            className="rounded-full"
          />
          <TruncatedText
            text={
              item.type == "buy" ? item?.tokenInSymbol : item.tokenOutSymbol
            }
            className="text-white/80"
            maxLength={3}
            forceTruncate={true}
          />
        </div>
      </DexLink>

      <span className="text-white/80">at</span>
      <span className="text-yellow-500">
        $
        {(() => {
          const value =
            item.type == "buy"
              ? tokenValue(item.tokenInAmount, item.tokenInAmountUsd)
              : tokenValue(item.tokenOutAmount, item.tokenOutAmountUsd);

          // Handle very small numbers with scientific notation
          if (value > 0 && value < 0.0001) {
            return value.toExponential(2);
          }

          return value.toFixed(5);
        })()}
      </span>
      <span className="text-white/80">{timeAgo(item.blockTimestamp)}</span>
    </div>
  );
}

export default TradeItems;
