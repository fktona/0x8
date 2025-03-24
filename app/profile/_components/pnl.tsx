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
import type {
  ExtendedTokenTradeSummary,
  TokenTradeSummary,
  TradeTransaction,
} from "@/types";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { useTransactionsStore } from "@/store/store";

export default function TokenPnlItem({
  tokenAddress,
  tokenSymbol,
  pnlPercentage,
  pnlUSD,
  totalTokenSold,
  totalBuyTokenAmount,
  totalSellTokenAmount,
  avgBuyTimeSeconds,
  sellTokenName,
  buyTokenSymbol,
  sellTokenSymbol,
  activeTab,
}: ExtendedTokenTradeSummary & { activeTab: string }) {
  // Format the amounts properly, handling negative values

  const { transactions, isLoading, usersTransactions } = useTransactionsStore();
  const logo = transactions.find((t) => t.tokenInAddress === tokenAddress);

  const checkLoss = pnlPercentage.toString().startsWith("-");

  return (
    <div className="bg-[#1B1B1B] p-[10px] rounded-sm space-y-[13px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image
            src={logo?.tokenInLogo || `/${activeTab?.toLowerCase()}.svg`}
            alt={"BNB"}
            width={20}
            height={20}
            className="rounded-full"
          />

          <span className="text-[14px] font-medium">{tokenSymbol}</span>
          {/* <span className="text-[14px] text-gray-400">MC: {marketCap}</span> */}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={
              checkLoss
                ? "text-red-500 text-[14px]"
                : "text-green-500 text-[14px]"
            }
          >
            {pnlPercentage.toString().startsWith("-")
              ? pnlPercentage.toString().slice(1)
              : pnlPercentage.toString()}
            %
          </span>
          <span className="">
            ${pnlUSD.startsWith("-") ? pnlUSD.slice(1) : pnlUSD}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-[12px] text-gray-400 mb-1">
        <div>Action</div>
        <div>Buy</div>
        <div>Got</div>
        <div>Time</div>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-4 text-[14px]">
          <div className="text-green-500">Buy</div>
          <div className="text-yellow-500 ">
            {formatNumber(totalBuyTokenAmount)} {tokenSymbol}
          </div>
          <div className="text-yellow-500">
            {/* {formatNumber(totalBuyTokenAmount)} */}
          </div>
          {/* <div className="text-gray-400">{time}</div> */}
        </div>
        <div className="grid grid-cols-4 text-[14px] ">
          <div className="text-red-500">Sell</div>
          <div className="text-yellow-500">
            {formatNumber(totalSellTokenAmount)} {sellTokenSymbol}
          </div>
          <div className="text-yellow-500">{formatNumber(totalTokenSold)}</div>
          <div className="text-gray-400">
            {timeAgo(
              new Date(Date.now() - avgBuyTimeSeconds * 1000).toISOString()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
