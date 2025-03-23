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
import type { TokenTradeSummary, TradeTransaction } from "@/types";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { useTransactionsStore } from "@/store/store";

interface TokenPnlItemProps {
  symbol: string;
  transactions?: TradeTransaction[];
  activeTab: string;
}

export default function TokenPnlItem({
  tokenAddress,
  tokenName,
  tokenSymbol,
  totalBuys,
  totalSells,
  pnlPercentage,
  pnlUSD,
  totalTokenBought,
  totalTokenSold,
  totalTokenBoughtUSD,
  totalTokenSoldUSD,
  activeTab,
}: TokenTradeSummary & { activeTab: string }) {
  // Format the amounts properly, handling negative values

  console.log({
    tokenAddress,

    tokenSymbol,
    totalBuys,
    totalSells,
    pnlPercentage,
    pnlUSD,
    totalTokenBought,
    totalTokenSold,
    totalTokenBoughtUSD,
    totalTokenSoldUSD,
    activeTab,
  });
  const { transactions, isLoading, usersTransactions } = useTransactionsStore();
  const logo = transactions.find((t) => t.tokenInAddress === tokenAddress);

  const calPnlPercentage = parseFloat(
    (
      ((-1 * parseFloat(totalTokenSoldUSD) - parseFloat(totalTokenBoughtUSD)) /
        parseFloat(totalTokenBoughtUSD)) *
      100
    ).toFixed(2)
  );
  const calPnlUSD =
    -1 * parseFloat(totalTokenSoldUSD) - parseFloat(totalTokenBoughtUSD);

  const checkLoss = calPnlUSD < 0 ? true : false;

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
            {calPnlPercentage}%
          </span>
          <span className="">${formatNumber(calPnlUSD)}</span>
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
          <div className="text-yellow-500">
            ${formatNumber(totalTokenBoughtUSD)} USD
          </div>
          <div className="text-yellow-500">
            {formatNumber(totalTokenBought)}
          </div>
          {/* <div className="text-gray-400">{time}</div> */}
        </div>
        <div className="grid grid-cols-4 text-[14px]">
          <div className="text-red-500">Sell</div>
          <div className="text-yellow-500">
            {formatNumber(totalTokenSoldUSD)} USD
          </div>
          <div className="text-yellow-500">{formatNumber(totalTokenSold)}</div>
          {/* <div className="text-gray-400">{time}</div> */}
        </div>
      </div>
    </div>
  );
}
