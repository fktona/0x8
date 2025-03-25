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
  TokenMetaData,
  TokenTradeSummary,
  TradeTransaction,
} from "@/types";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { useTransactionsStore } from "@/store/store";
import { useEffect, useState, useTransition } from "react";
import { getTokenMetadata } from "@/app/actions/action";

export default function TokenPnlItem({
  tokenSymbol,
  tokenAddress,
  realizedPnlPercentage,
  realizedPnlUSD,
  totalTokenSold,
  avgBuyTimeSeconds,
  totalBaseTokenSpent,
  totalBaseTokenReceived,
  totalTokenBought,
  activeTab,
}: ExtendedTokenTradeSummary & { activeTab: string }) {
  // Format the amounts properly, handling negative values
  const [pending, startTransition] = useTransition();
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetaData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  // Create a cache to store token metadata by tokenAddress and chain
  const [metadataCache, setMetadataCache] = useState<
    Record<string, TokenMetaData>
  >({});

  const cacheKey = `${tokenAddress}_${activeTab}`;

  useEffect(() => {
    // Check if we already have this token metadata in cache
    if (metadataCache[cacheKey]) {
      setTokenMetadata(metadataCache[cacheKey]);
      return;
    }

    if (!tokenMetadata) {
      startTransition(async () => {
        try {
          const data = await getTokenMetadata(tokenAddress, activeTab);
          setTokenMetadata(data);
          // Update cache with the new data
          setMetadataCache((prev) => ({
            ...prev,
            [cacheKey]: data,
          }));
        } catch (err) {
          console.error("Failed to fetch token metadata:", err);
          setError(
            err instanceof Error ? err.message : "Unknown error occurred"
          );
          setTokenMetadata(null);
        }
      });
    }
  }, [tokenAddress, activeTab, tokenMetadata, metadataCache]);

  const { transactions, isLoading, usersTransactions } = useTransactionsStore();
  const logo = transactions.find((t) => t.tokenInAddress === tokenAddress);
  console.timeLog;
  const checkLoss = realizedPnlPercentage.toString().startsWith("-");

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
          {pending ? (
            <span className="text-[14px] text-gray-400 bg-gray-400 w-4 h-2 animate-pulse"></span>
          ) : tokenMetadata?.data?.marketCap ? (
            <span className="text-[14px] text-gray-400">
              MC: {formatNumber(metadataCache[cacheKey]?.data?.marketCap)}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={
              checkLoss
                ? "text-red-500 text-[14px]"
                : "text-green-500 text-[14px]"
            }
          >
            {realizedPnlPercentage.toString()}%
          </span>
          <span className="">${realizedPnlUSD}</span>
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
            {formatNumber(totalBaseTokenReceived)}{" "}
            {activeTab === "bsc" ? "BNB" : "ETH"}
          </div>
          <div className="text-yellow-500">
            {formatNumber(totalTokenBought)} {tokenSymbol}
          </div>
          {/* <div className="text-gray-400">{time}</div> */}
        </div>
        <div className="grid grid-cols-4 text-[14px] ">
          <div className="text-red-500">Sell</div>
          <div className="text-yellow-500">
            {formatNumber(totalBaseTokenSpent)}{" "}
            {activeTab === "bsc" ? "BNB" : "ETH"}
          </div>
          <div className="text-yellow-500">
            {formatNumber(totalTokenSold)} {tokenSymbol}
          </div>
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
