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

      set((state) => ({
        newTransaction: data.content,
        transactions: [data.content, ...state.transactions].slice(0, 100), // Keep last 100 transactions
        latestTransaction: data.content,
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
