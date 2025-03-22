// import Image from "next/image";

// interface TokenPnlItemProps {
//   token: string;
//   marketCap: string;
//   priceChange: string;
//   priceChangeValue: string;
//   buyPrice: string;
//   sellAmount: string;
//   time: string;
// }

// export default function TokenPnlItem({
//  data
// }: TokenPnlItemProps) {
//   return (
//     <div className="bg-[#1B1B1B] p-[10px] rounded-sm space-y-[13px]">
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2">
//           <Image
//             src={"/ponki.svg"}
//             alt={"BNB"}
//             width={20}
//             height={20}
//             className="rounded-full"
//           />
//           <span className="text-[14px] font-medium">{token}</span>
//           <span className="text-[14px] text-gray-400">MC: {marketCap}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-red-500 text-[14px]">{priceChange}</span>
//           <span className="text-red-500 text-[14px]">{priceChangeValue}</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 text-[12px] text-gray-400 mb-1">
//         <div>Action</div>
//         <div>Buy</div>
//         <div>Got</div>
//         <div>Time</div>
//       </div>

//       <div className="space-y-1">
//         <div className="grid grid-cols-4 text-[14px]">
//           <div className="text-green-500">Buy</div>
//           <div className="text-yellow-500">{buyPrice}</div>
//           <div className="text-yellow-500">{sellAmount}</div>
//           <div className="text-gray-400">{time}</div>
//         </div>
//         <div className="grid grid-cols-4 text-[14px]">
//           <div className="text-red-500">Sell</div>
//           <div className="text-yellow-500">{buyPrice}</div>
//           <div className="text-yellow-500">{sellAmount}</div>
//           <div className="text-gray-400">{time}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { formatNumber, timeAgo } from "@/libs/utils";
import type { TradeTransaction } from "@/types";
import Image from "next/image";

interface TokenPnlItemProps {
  symbol: string;
  transactions?: TradeTransaction[];
}

export default function TokenPnlItem({
  tokenInLogo,
  tokenOutLogo,
  tokenInSymbol,
  tokenOutSymbol,
  tokenOutAmount,
  tokenInName,
  tokenOutAddress,
  tokenInAddress,
  tokenInAmount,
  blockTimestamp,
  chain,
  tokenOutAmountUsd,
  type,
  symbol,
}: TradeTransaction & { symbol: string }) {
  // Format the amounts properly, handling negative values
  const formattedOutAmount = tokenOutAmount?.startsWith("-")
    ? formatNumber(tokenOutAmount.slice(1))
    : formatNumber(tokenOutAmount);

  const formattedInAmount = tokenInAmount ? formatNumber(tokenInAmount) : "0";

  return (
    <div className="bg-[#1B1B1B] p-[10px] rounded-sm space-y-[13px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image
            src={tokenInLogo || "/ponki.svg"}
            alt={symbol || tokenInSymbol || "Token"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-[14px] font-medium">
            {symbol || `${tokenInSymbol}-${tokenOutSymbol}`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-[12px] text-gray-400 mb-1">
        <div>Action</div>
        <div>{type === "buy" ? "Spent" : "Sold"}</div>
        <div>{type === "buy" ? "Got" : "Received"}</div>
        <div>Time</div>
      </div>

      <div className="space-y-1">
        {type === "buy" ? (
          <div className="grid grid-cols-4 text-[14px]">
            <div className="text-green-500">Buy</div>
            <div className="text-yellow-500 uppercase">
              {formattedOutAmount} {tokenOutSymbol}
            </div>
            <div className="text-yellow-500">
              {formattedInAmount} {tokenInSymbol}
            </div>

            <div className="text-gray-400">{timeAgo(blockTimestamp)}</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 text-[14px]">
            <div className="text-red-500">Sell</div>
            <div className="text-yellow-500">
              {formattedOutAmount} {tokenOutSymbol}
            </div>
            <div className="text-yellow-500">
              {formattedInAmount} {tokenInSymbol}
            </div>
            <div className="text-gray-400">{timeAgo(blockTimestamp)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
