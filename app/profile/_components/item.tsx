import DexLink from "@/components/dex-link";
import { formatNumber, removeWrapped, timeAgo } from "@/libs/utils";
import { TradeTransaction } from "@/types";
import Image from "next/image";

export default function TradeItem({
  tokenInLogo,
  tokenOutLogo,
  tokenInSymbol,
  tokenOutSymbol,
  tokenInAmount,
  tokenOutAmountUsd,
  tokenOutAmount,
  blockTimestamp,
  tokenInAddress,
  tokenOutAddress,
  chain,
  type,
}: Partial<TradeTransaction>) {
  return (
    <div className="flex items-center justify-between p-3">
      <div
        className={`text-sm ${
          type === "buy"
            ? "text-green-500 capitalize"
            : "text-red-500 capitalize"
        }`}
      >
        {type}
      </div>
      <DexLink
        chain={chain as string}
        tokenAddress={
          type === "buy"
            ? (tokenInAddress as string)
            : (tokenOutAddress as string)
        }
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{`${
            type == "buy"
              ? formatNumber(tokenInAmount)
              : formatNumber(tokenOutAmount)
          } `}</span>
          <Image
            src={
              (type === "buy" ? tokenInLogo : tokenOutLogo) ||
              (chain ? `/${chain.toLowerCase()}.svg` : "/default.svg")
            }
            alt={(type == "buy" ? tokenInSymbol : tokenOutSymbol) || "logo"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-sm">
            {type === "buy"
              ? removeWrapped(tokenInSymbol)
              : removeWrapped(tokenOutSymbol)}
          </span>
        </div>
      </DexLink>

      <div className="flex items-center gap-2">
        <span className="text-sm">{formatNumber(tokenOutAmountUsd)}</span>
        <Image
          src={
            (type === "buy" ? tokenOutLogo : tokenInLogo) ||
            (chain ? `/${chain.toLowerCase()}.svg` : "/default.svg")
          }
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm">
          {type === "buy"
            ? removeWrapped(tokenOutSymbol)
            : removeWrapped(tokenInSymbol)}
        </span>
      </div>

      <div className="text-sm text-gray-400">
        {timeAgo(blockTimestamp as string)}
      </div>
    </div>
  );
}
