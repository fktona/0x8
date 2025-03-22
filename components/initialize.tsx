"use client";
import { ReactNode, use, useEffect } from "react";
import { useTransactionsStore } from "@/store/store";
import { useTransactionStore } from "@/store/realtime";

interface Props {
  children: ReactNode;
}

const Initialize = ({ children }: Props) => {
  const { fetchTransactions, isLoading } = useTransactionsStore();
  const connect = useTransactionStore((state) => state.connect);
  const disconnect = useTransactionStore((state) => state.disconnect);
  const newTransaction = useTransactionStore((state) => state.newTransaction);
  const addTransaction = useTransactionsStore((state) => state.addTransaction);

  useEffect(() => {
    fetchTransactions();
  }, []);

  //   if (isLoading) {
  //     return null;
  //   }

  useEffect(() => {
    // Connect to the WebSocket when the provider mounts
    connect();
    if (newTransaction) {
      console.log("New transaction received:", newTransaction);
      addTransaction(newTransaction);
    }

    // Disconnect when the provider unmounts
    return () => {
      disconnect();
    };
  }, [connect, disconnect, newTransaction]);

  return <>{children}</>;
};

export default Initialize;
