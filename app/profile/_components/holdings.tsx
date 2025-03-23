import { formatNumber2 } from "@/libs/utils";
import { TokenHoldings } from "@/types";
import Image from "next/image";
import { FC } from "react";
import { useTransactionsStore } from "@/store/store";
import { tr } from "framer-motion/client";

interface TokenHoldingProps {
  chain: string;
  data?: TokenHoldings;
  loading?: boolean;
}

const TokenHolding: FC<TokenHoldingProps> = ({
  data,
  loading = false,
  chain,
}) => {
  const { transactions, isLoading, usersTransactions } = useTransactionsStore();
  const logo = transactions.find(
    (t) => t.tokenInAddress === data?.tokenAddress
  );
  console.log(usersTransactions);
  if (loading || isLoading) {
    return (
      <div className="flex text-[14px] items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded-full bg-gray-700 animate-pulse" />
          <div className="w-16 h-5 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="w-20 h-5 bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex text-[14px] items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <Image
          src={logo?.tokenInLogo || `/${chain}.svg`}
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm font-medium">${data?.tokenSymbol}</span>
      </div>

      <div className="text-sm">
        ${formatNumber2(data?.tokenBalanceUSD.toString() || "0")}
      </div>
    </div>
  );
};

export default TokenHolding;
