import { getSocket } from "@/libs/socket";
import { TradeTransaction, TransactionEvent } from "@/types";
import { create } from "zustand";

interface TransactionState {
  transactions: TradeTransaction[];
  newTransaction: TradeTransaction | null;
  latestTransaction: TradeTransaction | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  latestTransaction: null,
  isConnected: false,
  newTransaction: null,

  connect: () => {
    const socket = getSocket();
    // Listen for new transactions
    socket.on("onNewTransaction", (data: TransactionEvent) => {
      console.log("New transaction received:", data);

      const formattedTransactions = data.content.transactions.map((tx) => ({
        ...tx,
        name: data.content.name,
        wallet: data.content.wallet,
        twitter: data.content.twitter,
        telegram: data.content.telegram || null,
        website: data.content.website || null,
        chains: data.content.chains || [],
        imageUrl: data.content.imageUrl || null,
      })) as TradeTransaction[];

      set((state) => ({
        newTransaction: formattedTransactions[0],
        transactions: [formattedTransactions[0], ...state.transactions],
        latestTransaction: formattedTransactions[0],
      }));
    });

    // Update connection status
    socket.on("connect", () => set({ isConnected: true }));
    socket.on("disconnect", () => set({ isConnected: false }));

    set({ isConnected: socket.connected });
  },

  disconnect: () => {
    const socket = getSocket();
    socket.off("onNewTransaction");
    socket.off("connect");
    socket.off("disconnect");
    set({ isConnected: false });
  },
}));
