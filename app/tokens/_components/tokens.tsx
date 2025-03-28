"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import TokenPanel from "./token-panel";
import { groupByTokenInSymbol } from "@/libs/utils";
import { useTransactionsStore } from "@/store/store";
import type { TokenMetaData, TradeTransaction } from "@/types";
import { getTokenMetadata } from "@/app/actions/action";
import { AnimatePresence, m, motion } from "framer-motion";
import TokenPanelSkeleton from "./skeleton";
import LoadingState from "./loading-state";
import EmptyState from "./emptyState";

// Type definition for the data structure
interface DataItem {
  chain: string;
  tokenAddress: string[];
}

export interface TokenPanelProps extends TradeTransaction {
  tokenInMetadata: TokenMetaData | undefined;
  tokenOutMetadata: TokenMetaData | undefined;
}

function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// Utility function to remove duplicates when token is an array
function removeDuplicates(data: DataItem[]): DataItem[] {
  return data.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) =>
          o.chain === obj.chain && arraysEqual(o.tokenAddress, obj.tokenAddress)
      )
  );
}

export default function TokensComponents() {
  const [activeTab, setActiveTab] = useState("ETH");
  const { transactions, isLoading: isL } = useTransactionsStore();
  const filteredTrasactions = transactions.filter(
    (tx) => tx.chain == activeTab.toLowerCase()
  );

  const tokenAddressess = useMemo(() => {
    return (
      filteredTrasactions?.flatMap((transaction) => {
        const tokenAddress = [
          transaction.tokenInAddress,
          transaction.tokenOutAddress,
        ];
        const chain = transaction.chain;
        return { tokenAddress, chain };
      }) || []
    );
  }, [filteredTrasactions]);

  const uniqueData = [
    ...new Map(
      tokenAddressess.map((item) => [item.tokenAddress + item.chain, item])
    ).values(),
  ];
  const newTokenAddressess = useMemo(
    () => removeDuplicates(tokenAddressess),
    [tokenAddressess]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [tokenMetaDatas, setTokenMetaDatas] = useState<TokenMetaData[]>([]);
  const [initialFetch, setInitialFetch] = useState(false);
  const hasFetched = useRef(false);
  const [isBatchLoading, setIsBatchLoading] = useState(false);
  const [newBatchCount, setNewBatchCount] = useState(0);
  const [animatingTokens, setAnimatingTokens] = useState<TokenMetaData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenCache, setTokenCache] = useState<Record<string, TokenMetaData[]>>(
    {}
  );

  const changeTab = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      console.log(tokenCache[tab.toLowerCase()] + "tokenCache");

      // If we have cached data for this chain, use it
      if (
        tokenCache[tab.toLowerCase()] &&
        tokenCache[tab.toLowerCase()].length > 0
      ) {
        setTokenMetaDatas(tokenCache[tab.toLowerCase()]);
        setIsLoading(false);
        setInitialFetch(true);
      } else {
        // Otherwise reset for a new fetch
        setTokenMetaDatas([]);
        setInitialFetch(false);
      }

      setSearchQuery("");
    },
    [tokenCache]
  );

  useEffect(() => {
    const fetchTokenMetadata = async () => {
      if (isL || newTokenAddressess.length === 0) {
        // setIsLoading(false);
        return;
      }

      if (
        tokenCache[activeTab.toLowerCase()] &&
        tokenCache[activeTab.toLowerCase()].length > 0 &&
        initialFetch
      ) {
        return;
      }

      try {
        setIsLoading(true);

        // Process tokens in batches of 10
        const batchSize = 10;
        const allTokens = [...newTokenAddressess];

        // Initial batch
        if (!initialFetch && allTokens.length > 0 && !hasFetched.current) {
          const initialBatch = allTokens.slice(
            0,
            Math.min(batchSize, allTokens.length)
          );
          const initialResults = await Promise.all(
            initialBatch.map((addresses) =>
              getTokenMetadata(
                addresses.tokenAddress[0] as string,
                addresses.chain as string
              )
            )
          );

          setTokenMetaDatas(initialResults as TokenMetaData[]);
          setInitialFetch(true);
          setIsLoading(false);
          const typedResults = initialResults as TokenMetaData[];
          setTokenMetaDatas(typedResults);

          setTokenCache((prev) => ({
            ...prev,
            [activeTab.toLowerCase()]: typedResults,
          }));

          // Process remaining tokens in batches with delay to simulate live updates
          if (allTokens.length > batchSize) {
            const remainingTokens = allTokens.slice(batchSize);
            let currentIndex = 0;

            const processBatch = async () => {
              if (currentIndex >= remainingTokens.length) {
                setIsBatchLoading(false);
                setNewBatchCount(0);
                return;
              }

              setIsBatchLoading(true);

              const nextBatch = remainingTokens.slice(
                currentIndex,
                currentIndex + batchSize
              );

              const batchResults = await Promise.all(
                nextBatch.map((addresses) =>
                  getTokenMetadata(
                    addresses.tokenAddress[0] as string,
                    addresses.chain as string
                  )
                )
              );

              // Set the new tokens for animation
              setAnimatingTokens(batchResults as TokenMetaData[]);
              setNewBatchCount(batchResults.length);

              // Add to the main data after a short delay to allow animation to start
              setTimeout(() => {
                setTokenMetaDatas((prev) => [
                  ...prev,
                  ...(batchResults as TokenMetaData[]),
                ]);
              }, 100);

              currentIndex += batchSize;

              if (currentIndex < remainingTokens.length) {
                // Add a delay between batches to create a live update effect
                setTimeout(processBatch, 2000);
              } else {
                // Final cleanup after all batches
                setTimeout(() => {
                  setIsBatchLoading(false);
                  setNewBatchCount(0);
                  setAnimatingTokens([]);
                }, 1500);
              }
            };

            processBatch();
          }
        }
      } catch (error) {
        console.error("Error fetching token metadata", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenMetadata();
  }, [isL, newTokenAddressess, initialFetch]);

  const mctx = transactions.map((tx) => {
    return {
      ...tx,
      tokenInMetadata: tokenMetaDatas.find(
        (meta: TokenMetaData) => meta.data.address === tx.tokenInAddress
      ),
      tokenOutMetadata: tokenMetaDatas.find(
        (meta: TokenMetaData) => meta.data.address === tx.tokenOutAddress
      ),
    };
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const filterBySearchQuery = (tx: TokenPanelProps) => {
    if (searchQuery.length <= 2) return true;

    const query = searchQuery.toLowerCase();
    return (
      tx.tokenInSymbol.toLowerCase().includes(query) ||
      tx.tokenInAddress.toLowerCase().includes(query) ||
      tx.tokenInName.toLowerCase().includes(query) ||
      tx.wallet.toLowerCase().includes(query)
    );
  };

  const lowCaps = useMemo(
    () =>
      groupByTokenInSymbol(
        mctx
          .filter(filterBySearchQuery)
          .filter((tx) => Number(tx?.tokenInMetadata?.data.marketCap) < 100000)
      ) as Record<string, TokenPanelProps[]>,
    [mctx, searchQuery]
  );

  const midCaps = useMemo(
    () =>
      groupByTokenInSymbol(
        mctx
          .filter(filterBySearchQuery)
          .filter(
            (tx) =>
              Number(tx.tokenInMetadata?.data.marketCap) >= 100000 &&
              Number(tx.tokenInMetadata?.data.marketCap) < 1000000
          )
      ) as Record<string, TokenPanelProps[]>,
    [mctx, searchQuery]
  );

  const highCaps = useMemo(
    () =>
      groupByTokenInSymbol(
        mctx
          .filter(filterBySearchQuery)
          .filter((tx) => Number(tx.tokenInMetadata?.data.marketCap) >= 1000000)
      ) as Record<string, TokenPanelProps[]>,
    [mctx, searchQuery]
  );

  console.log("mc", tokenMetaDatas);
  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <TokenPanelSkeleton key={`skeleton-${index}`} />);
  };

  console.log("mctx", tokenMetaDatas);
  if (!isLoading && tokenMetaDatas.length === 0 && initialFetch && !isL) {
    return (
      <EmptyState
        activeTab={activeTab}
        changeTab={changeTab}
        isBatchLoading={isBatchLoading}
        isLoading={isLoading}
        setInitialFetch={setInitialFetch}
        hasFetched={hasFetched}
        setIsLoading={setIsLoading}
      />
    );
  }

  if (isLoading && tokenMetaDatas.length === 0) {
    return (
      <LoadingState
        activeTab={activeTab}
        changeTab={changeTab}
        isBatchLoading={isBatchLoading}
        renderSkeletons={renderSkeletons}
        isLoading={isLoading}
      />
    );
  }
  return (
    <div className="min-h-screen  text-white ">
      {/* Realtime Token Section */}
      <div className="p-4">
        <div className="flex lg:items-center lg:gap-2 mb-4 flex-col lg:flex-row gap-[28px]">
          <h4 className="flex items-center text-[20px] font-aktiv-bold font-bold lg:justify-between gap-2">
            <div className="w-[11px] aspect-square bg-[#11FF00] rounded-full animate-pulse" />
            RealTime Trades
            {isBatchLoading && (
              <motion.span
                className="text-xs font-normal ml-2 text-green-400"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="inline-flex items-center">
                  Fetching new tokens
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                    }}
                  >
                    ...
                  </motion.span>
                  {newBatchCount > 0 && (
                    <motion.span
                      className="ml-1 bg-green-500 text-black px-1.5 rounded-full text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      +{newBatchCount}
                    </motion.span>
                  )}
                </span>
              </motion.span>
            )}
          </h4>
          <div className="flex text-[16px] font-aktiv-medium font-medium ml-4 gap-2">
            <button
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "BSC"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("BSC")}
              disabled={isBatchLoading || !initialFetch}
            >
              <Image
                src={"/bnb.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              BNB
            </button>
            <button
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "ETH"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("ETH")}
              disabled={isLoading}
            >
              <Image
                src={"/eth.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              ETH
            </button>
            <button
              className={`px-[9px] py-[10px] rounded-[10px] flex items-center gap-1 transition-all duration-200 ${
                activeTab === "BASE"
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => changeTab("BASE")}
              disabled={isLoading}
            >
              <Image
                src={"/base.svg"}
                alt={"BNB"}
                width={20}
                height={20}
                className="rounded-full"
              />
              BASE
            </button>
          </div>

          <div className="ml-auto relative w-full lg:w-[538px]">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              disabled={isLoading}
              value={searchQuery}
              placeholder="Enter Token Name / Address / Symbol or wallet address"
              className="flex lg:w-[538px] w-full h-[49px] p-[10px] text-[12px]  flex-col justify-center items-center gap-[10px] rounded-[80px] bg-[rgba(12,12,12,0.93)]"
            />

            <Image
              src="/searchIcon.svg"
              alt="Enter Token Name / Address / Symbol or wallet address"
              width={16}
              height={16}
              className="absolute right-[20px] top-[20px]"
            />
          </div>
        </div>

        {/* Tokens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">Low caps</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
                {/* <span className="text-sm">BNB</span> */}
              </div>
            </div>

            {/* New batch notification */}
            <AnimatePresence>
              {isBatchLoading &&
                animatingTokens.some(
                  (token) => Number(token.data.marketCap) < 100000
                ) && (
                  <motion.div
                    className="absolute top-12 right-2 bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-green-400 px-3 py-1 rounded-full text-xs z-10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    New tokens incoming
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {Object.entries(lowCaps).map(([token, transactions]) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: Math.random() * 0.2, // Stagger effect
                  }}
                >
                  <TokenPanel
                    tokenName={token}
                    marketCap={
                      transactions[0]?.tokenInMetadata?.data.marketCap || ""
                    }
                    priceChange={
                      transactions[0]?.tokenInMetadata?.data
                        .price_change_percentage || 0
                    }
                    data={transactions}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">$100k+</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
              </div>
            </div>

            {/* New batch notification */}
            <AnimatePresence>
              {isBatchLoading &&
                animatingTokens.some(
                  (token) =>
                    Number(token.data.marketCap) >= 100000 &&
                    Number(token.data.marketCap) < 1000000
                ) && (
                  <motion.div
                    className="absolute top-12 right-2 bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-green-400 px-3 py-1 rounded-full text-xs z-10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    New tokens incoming
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {Object.entries(midCaps).map(([token, transactions]) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: Math.random() * 0.2, // Stagger effect
                  }}
                >
                  <TokenPanel
                    tokenName={token}
                    marketCap={
                      transactions[0]?.tokenInMetadata?.data.marketCap || ""
                    }
                    priceChange={
                      transactions[0]?.tokenInMetadata?.data
                        .price_change_percentage || 0
                    }
                    data={transactions}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="rounded-[12px] border border-white/10 p-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-3 py-2">
              <span className="text-[16px] text-white/80">$1M+</span>
              <div className="flex items-center gap-1">
                <Image
                  src={`${activeTab.toLocaleLowerCase()}.svg`}
                  alt={activeTab}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm">{activeTab}</span>
              </div>
            </div>

            {/* New batch notification */}
            <AnimatePresence>
              {isBatchLoading &&
                animatingTokens.some(
                  (token) => Number(token.data.marketCap) >= 1000000
                ) && (
                  <motion.div
                    className="absolute top-12 right-2 bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-green-400 px-3 py-1 rounded-full text-xs z-10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    New tokens incoming
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
              {Object.entries(highCaps).map(([token, transactions]) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: Math.random() * 0.2, // Stagger effect
                  }}
                >
                  <TokenPanel
                    tokenName={token}
                    marketCap={
                      transactions[0]?.tokenInMetadata?.data.marketCap || ""
                    }
                    priceChange={
                      transactions[0]?.tokenInMetadata?.data
                        .price_change_percentage || 0
                    }
                    data={transactions}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
