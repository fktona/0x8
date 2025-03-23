import { motion } from "framer-motion";

export default function TokenPanelSkeleton() {
  // Create an array of 3 items to represent loading transactions
  const loadingTransactions = Array(3).fill(0);

  return (
    <div className="bg-[#1B1B1B] border border-white/10 rounded-lg mb-4 overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          {/* Token logo skeleton */}
          <div className="w-[30px] h-[30px] rounded-full bg-gray-700/50 animate-pulse" />

          {/* Token name skeleton */}
          <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse" />

          {/* Market cap skeleton */}
          <div className="h-3 w-16 bg-gray-700/50 rounded animate-pulse" />
        </div>

        {/* Price change skeleton */}
        <div className="h-4 w-12 bg-gray-700/50 rounded animate-pulse" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-xs text-gray-400 p-2">
        <div>Traders</div>
        <div>Bought</div>
        <div>Got</div>
        <div>Time</div>
      </div>

      {/* Skeleton Transactions */}
      <div>
        {loadingTransactions.map((_, index) => (
          <div key={index} className="grid grid-cols-4 text-xs p-2">
            <div className="flex items-center gap-1">
              {/* Profile image skeleton */}
              <div className="w-[20px] h-[20px] rounded-full bg-gray-700/50 animate-pulse" />

              {/* Name skeleton */}
              <div className="h-3 w-14 bg-gray-700/50 rounded animate-pulse" />
            </div>

            {/* Bought amount skeleton */}
            <div className="h-3 w-16 bg-gray-700/50 rounded animate-pulse" />

            {/* Got amount skeleton */}
            <div className="h-3 w-12 bg-gray-700/50 rounded animate-pulse" />

            {/* Time skeleton */}
            <div className="h-3 w-10 bg-gray-700/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
