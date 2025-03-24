"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TradesList from "./trade-list";
import { AlTransactionsProps } from "@/types";
import { useTransactionsStore } from "@/store/store";

export default function TradeComponents({}: {}) {
  const [activeTab, setActiveTab] = useState("All");
  const { usersTransactions, isLoading } = useTransactionsStore();
  const [filteredUsers, setFilteredUsers] = useState<
    AlTransactionsProps[] | null
  >(usersTransactions);

  useEffect(() => {
    setFilteredUsers(usersTransactions);
  }, [usersTransactions]);

  const handleSearch = (query: string) => {
    const filtered = usersTransactions?.filter(
      (user) =>
        user.wallet.toLowerCase()?.includes(query?.toLowerCase()) ||
        user.name.toLowerCase()?.includes(query?.toLowerCase())
    );
    setFilteredUsers(filtered || []);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black text-white"
    >
      <div className="p-4 lg:py-[38px] py-[20px]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex lg:items-center  lg:gap-2 mb-6 flex-col lg:flex-row gap-[28px]"
        >
          <h4 className="flex items-center text-nowrap text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
          </h4>
          <div className="flex text-[16px] font-aktiv-medium font-medium ml-4 gap-2">
            {["All", "BSC", "ETH", "BASE"].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 ${
                  activeTab === (tab === "BSC" ? "BSC" : tab)
                    ? "bg-white text-black"
                    : "bg-transparent"
                }`}
                onClick={() => setActiveTab(tab === "BSC" ? "BSC" : tab)}
              >
                {tab !== "All" && (
                  <Image
                    src={`/${
                      tab.toLowerCase() === "bsc" ? "bnb" : tab.toLowerCase()
                    }.svg`}
                    alt={tab === "BSC" ? "BNB" : tab}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                {tab === "BSC" ? "BNB" : tab}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, width: "90%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="ml-auto relative flex justify-end   w-full lg:w-[538px]"
          >
            <input
              type="text"
              placeholder="Enter wallet address or name"
              onChange={(e) => handleSearch(e.target.value)}
              className="flex self-end lg:w-[538px] w-full h-[49px] p-[10px] flex-col justify-center items-center gap-[10px] rounded-[80px] bg-[rgba(12,12,12,0.93)]"
            />
            <Image
              src="/searchIcon.svg"
              alt="Enter wallet address"
              width={16}
              height={16}
              className="absolute right-[20px] top-[20px]"
            />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {isLoading
              ? Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <motion.div
                      key={`loading-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TradesList
                        trades={{} as AlTransactionsProps}
                        isLoading={true}
                      />
                    </motion.div>
                  ))
              : filteredUsers
                  ?.filter((trade) => {
                    if (activeTab === "All") return trade;
                    return (
                      trade.transactions[0].chain === activeTab.toLowerCase()
                    );
                  })
                  .map((trade, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <TradesList trades={trade} isLoading={isLoading} />
                    </motion.div>
                  ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
