"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlTransactionsProps, TradeTransaction, TokenMetaData } from "@/types";
import { cn, formatNumber, timeAgo } from "@/libs/utils";
import { useTransactionsStore } from "@/store/store";
import ProfileLink from "./profile-link";
import DexLink from "./dex-link";
import { getTokenMetadata } from "@/app/actions/action";
import TradeItems from "./trade-items";

interface DataTypes {
  name: string;
  avatar: string;
  bought: string;
  boughtUsd: string;
  memecoin: string;
  timeAgo: string;
  action: "Bought" | "Sold";
}

interface TradeBoxProps {
  title: string;
  coin: string;
  memeIcon: string;
  icon: string;
  data: DataTypes[];
  loading?: boolean;
}

const TradeBox = ({
  chain,
  loading,
  data,
}: {
  data:
    | (TradeTransaction & {
        name: string;
        imageUrl: string;
      })[]
    | undefined;
  loading: boolean;
  chain: string;
}) => {
  return (
    <div className="border md:h-[390px] flex flex-col h-[320px]  border-white/10 rounded-[12px] py-[17px] md:px-[12px] px-[10px] bg-black/40 w-full">
      <div className="text-white/80 font-light w-full text-[11px] lg:text-[14px] flex justify-between items-center pb-[17px] border-b border-white/10">
        <h4 className="flex items-center capitalize text-[14px] lg:text-[16px]  lg:gap-2 gap-1 w-full  justify-between">
          Recent trades
          <div className="flex items-center  text-[11px] lg:text-[14px] gap-1">
            {" "}
            <Image
              src={`${chain}.svg`}
              alt={chain}
              width={30}
              height={30}
              className="mr-1 rounded-full uppercase w-[16px] h-[16px] lg:h-[30px] lg:w-[30px]"
            />
            <span className=" uppercase">{chain}</span>
          </div>
        </h4>
      </div>
      <div className="text-[13px] 2xl:text-[14px] h-full overflow-y-auto scrollbar custom-scrollbar">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                className="flex w-full justify-between items-center py-[10px]"
                key={index}
              >
                <div className="flex w-full justify-between items-center gap-[6px] text-white/80 font-light">
                  <div className="rounded-full bg-white/15 h-5 w-5"></div>
                  <div className="bg-white/15 h-4 w-20"></div>
                  <div className="bg-white/15 h-4 w-10"></div>
                  <div className="bg-white/15 h-4 w-16"></div>
                  <div className="bg-white/15 h-4 w-8"></div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-white/15 h-4 w-4"></div>
                    <div className="bg-white/15 h-4 w-12"></div>
                  </div>
                  <div className="bg-white/15 h-4 w-8"></div>
                  <div className="bg-white/15 h-4 w-12"></div>
                  <div className="bg-white/15 h-4 w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          data?.map((item, index) => (
            <div
              className="flex w-full justify-between items-center py-[10px]"
              key={index}
            >
              <TradeItems item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function Trade() {
  // const [transactions, settransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    usersTransactions,
    isLoading,
    transactions: txx,
  } = useTransactionsStore();
  useEffect(() => {
    console.log("usersTransactionsee", usersTransactions);
  }, [usersTransactions, txx]);

  // useEffect(() => {
  //   async function fetchTransactions() {
  //     setLoading(true);
  //     try {
  //       const tx = await getAllUsersTransactions();
  //       console.log(tx);
  //       settransactions(tx);
  //     } catch (error) {
  //       console.error("Failed to fetch transactions:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchTransactions();
  // }, []);

  function getUniqueWalletTransactions<T extends { wallet: string }>(
    transactions: T[]
  ) {
    const uniqueWallets = new Map();

    transactions?.forEach((transaction) => {
      if (!uniqueWallets.has(transaction.wallet)) {
        uniqueWallets.set(transaction.wallet, transaction);
      }
    });

    return Array.from(uniqueWallets.values());
  }

  type Transaction = {
    wallet: string;
    chain: string;
    type: string;
    txHash: string;
    txIndex: number;
    blockTimestamp: string;
    tokenOutSymbol: string;
    tokenOutName: string;
    tokenOutLogo: string | null;
    tokenOutAddress: string;
    tokenOutAmount: string;
    tokenOutAmountUsd: string;
    tokenInSymbol: string;
    tokenInName: string;
    tokenInLogo: string | null;
    tokenInAddress: string;
    tokenInAmount: string;
    tokenInAmountUsd: string;
  };

  function getTopSortedTransactions(
    data: Transaction[],
    topN: number = 3
  ): Transaction[] {
    // Group transactions by wallet
    const walletGroups: Record<string, Transaction[]> = data.reduce(
      (acc, transaction) => {
        if (!acc[transaction.wallet]) acc[transaction.wallet] = [];
        acc[transaction.wallet].push(transaction);
        return acc;
      },
      {} as Record<string, Transaction[]>
    );

    // Get top N transactions per wallet
    const topTransactions: Transaction[] = Object.values(walletGroups).flatMap(
      (transactions) =>
        transactions
          .sort(
            (a, b) =>
              new Date(b.blockTimestamp).getTime() -
              new Date(a.blockTimestamp).getTime()
          ) // Sort by newest timestamp first
          .slice(0, topN) // Take top N
    );

    // Final sorting across all wallets by blockTimestamp (newest first)

    console.log("Top Transactions:", topTransactions[0]?.blockTimestamp);
    // console.log(
    //   new Date(topTransactions[0].blockTimestamp).getTime(),
    //   new Date(topTransactions[1].blockTimestamp).getTime(),
    //   "time"
    // );
    return topTransactions.sort(
      (a, b) =>
        new Date(b?.blockTimestamp)?.getTime() -
        new Date(a?.blockTimestamp)?.getTime()
    );
  }

  // Example usage:
  const transactions: Transaction[] = [
    /* Your dataset here */
  ];
  const filterTransactionsByChain = (
    transactions: AlTransactionsProps[] | null,
    chainType: string
  ) => {
    return (
      transactions?.flatMap((tx) => {
        const filteredTransactions = tx.transactions.filter(
          (o) => o.chain === chainType
        );
        const res = filteredTransactions.map((t) => ({
          ...t,
          chain: chainType,
          name: tx.name,
          imageUrl: tx.imageUrl,
        }));
        return getTopSortedTransactions(res as Transaction[]);
      }) || []
    );
  };

  const ethTx = filterTransactionsByChain(usersTransactions, "eth");
  const bscTx = filterTransactionsByChain(usersTransactions, "bsc");
  const baseTx = filterTransactionsByChain(usersTransactions, "base");

  return (
    <div className="w-full mt-[52px] min-h-[600px] ">
      <div className="flex justify-between items-center w-full md:text-[20px] text-[18px]   text-white font-light">
        <h4 className="flex items-center justify-between lg:py-[38px] gap-2">
          <div className="w-[11px] aspect-square  bg-[#11FF00] rounded-full animate-pulse" />
          Live Transaction
        </h4>
        <Link href="/trades">
          <button className="flex items-center lg:py-[38px] py-[20px] gap-2 text-[9.2px] font-aktiv-regular font-normal lg:text-[20px]">
            View Trades
            <Image
              src="/arr-right.svg"
              alt="arrow"
              width={40}
              height={20}
              className="rounded-full w-[17px] lg:w-auto"
              // className="w-[40px] h-[20px] rounded-full"
            />
          </button>
        </Link>
      </div>
      <div className="flex flex-col   md:flex-row gap-4 w-full bg-black ">
        <TradeBox
          chain="eth"
          loading={isLoading}
          data={
            bscTx as (TradeTransaction & {
              name: string;
              imageUrl: string;
            })[]
          }
        />
        <TradeBox
          chain="bsc"
          loading={isLoading}
          data={
            ethTx as (TradeTransaction & {
              name: string;
              imageUrl: string;
            })[]
          }
        />

        <TradeBox
          chain="base"
          loading={isLoading}
          data={
            baseTx as (TradeTransaction & {
              name: string;
              imageUrl: string;
            })[]
          }
        />
      </div>
    </div>
  );
}

export default Trade;
