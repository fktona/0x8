import { TokenPanelProps } from "./tokens";
import TokenTransaction from "./transactions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TokenPanelSkeleton from "./skeleton";
import { formatNumber } from "@/libs/utils";
import DexLink from "@/components/dex-link";

interface PanelProps {
  tokenName: string;
  marketCap: string;
  priceChange: number;
  data: TokenPanelProps[];
  isLoading?: boolean;
}

export default function TokenPanel({
  tokenName,
  marketCap,
  priceChange,
  data,
  isLoading = false,
}: PanelProps) {
  const [showSkeleton, setShowSkeleton] = useState(isLoading);

  useEffect(() => {
    // If it's no longer loading, wait a bit before hiding skeleton for smooth transition
    if (!isLoading && showSkeleton) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      setShowSkeleton(true);
    }
  }, [isLoading, showSkeleton]);

  const formattedPriceChange = priceChange.toFixed(2);
  const priceChangeClass = priceChange < 0 ? "text-red-500" : "text-green-500";

  if (showSkeleton) {
    return <TokenPanelSkeleton />;
  }

  console.log(data);

  return (
    <motion.div
      className="bg-[#1B1B1B] border border-white/10 rounded-lg mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-3">
        <DexLink tokenAddress={data[0]?.tokenInAddress} chain={data[0]?.chain}>
          <div className="flex items-center gap-2">
            <Image
              src={data[0]?.tokenInLogo || `${data[0]?.chain}.svg`}
              alt={tokenName || "Token"}
              width={30}
              height={30}
              className="rounded-full"
            />

            <span className="text-sm font-medium">{tokenName}</span>
            <span className="text-xs text-gray-400">
              MC: {formatNumber(marketCap)}
            </span>
          </div>
        </DexLink>
        <div className={`text-sm ${priceChangeClass}`}>
          {formattedPriceChange}%
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-xs text-gray-400 p-2">
        <div>Traders</div>
        <div>Bought</div>
        <div>Got</div>
        <div>Time</div>
      </div>

      {/* Transactions */}
      <div>
        {data.map((tx, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <TokenTransaction {...tx} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
