import { create } from "zustand";
import type {
  AlTransactionsProps,
  TradeTransaction,
  UserProfile,
} from "@/types";
import { getAllUsersTransactions } from "@/app/actions/action";

interface TransactionsState {
  // Data
  usersTransactions: AlTransactionsProps[] | null;
  transactions: TradeTransaction[];
  userProfile: UserProfile | null;

  // Status
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTransactions: () => Promise<void>;
  reset: () => void;

  // Manual update methods
  addTransaction: (transaction: TradeTransaction) => void;
  updateTransaction: (
    txHash: string,
    txIndex: number,
    updates: Partial<TradeTransaction>
  ) => void;
  removeTransaction: (txHash: string, txIndex: number) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  setTransactions: (transactions: TradeTransaction[]) => void;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  // Initial state
  usersTransactions: null,
  transactions: [],
  userProfile: null,
  isLoading: false,
  error: null,

  // Actions
  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });

      const data: AlTransactionsProps[] = await getAllUsersTransactions();
      console.log(data, "data");

      if (!data || !Array.isArray(data) || data.length === 0) {
        set({
          isLoading: false,
          error: "Failed to fetch transactions or no transactions found",
        });
        return;
      }
      // let profiles
      // Collect all transactions from all users into a flat array
      const allTransactions = data.flatMap((user) => {
        const { transactions, ...rest } = user;
        return transactions.map((tx) => ({ ...tx, ...rest }));
      });

      set({
        usersTransactions: data,
        transactions: allTransactions,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  reset: () => {
    set({
      usersTransactions: null,
      transactions: [],
      userProfile: null,
      isLoading: false,
      error: null,
    });
  },

  // Manual update methods
  addTransaction: (transaction: TradeTransaction) => {
    set((state) => {
      // const newTransactions = [transaction, ...state.transactions];

      // Also update the usersTransactions if it exists
      const newUsersTransactions = state.usersTransactions?.map((user) => {
        if (user.wallet === transaction.wallet) {
          return { ...user, transactions: [transaction, ...user.transactions] };
        }
        return user;
      });

      // const  findUserWhoseTransaction = state.usersTransactions?.find(
      //   (user) => user.transactions[0].wallet == transaction.wallet
      // );

      // if(findUserWhoseTransaction){
      //   findUserWhoseTransaction.transactions.push(transaction);
      // }

      // const newUsersTransactions = state.usersTransactions
      // ? [...state.usersTransactions]
      // : null;

      return {
        // transactions: newTransactions,
        usersTransactions: newUsersTransactions,
      };
    });
  },

  updateTransaction: (
    txHash: string,
    txIndex: number,
    updates: Partial<TradeTransaction>
  ) => {
    set((state) => {
      const updatedTransactions = state.transactions.map((tx) =>
        tx.txHash === txHash && tx.txIndex === txIndex
          ? { ...tx, ...updates }
          : tx
      );

      // Also update the usersTransactions if it exists
      const newUsersTransactions = state.usersTransactions
        ? { ...state.usersTransactions, transactions: updatedTransactions }
        : null;

      return {
        transactions: updatedTransactions,
        usersTransactions: newUsersTransactions,
      };
    });
  },

  removeTransaction: (txHash: string, txIndex: number) => {
    set((state) => {
      const filteredTransactions = state.transactions.filter(
        (tx) => !(tx.txHash === txHash && tx.txIndex === txIndex)
      );

      // Also update the usersTransactions if it exists
      const newUsersTransactions = state.usersTransactions
        ? { ...state.usersTransactions, transactions: filteredTransactions }
        : null;

      return {
        transactions: filteredTransactions,
        usersTransactions: newUsersTransactions,
      };
    });
  },

  updateUserProfile: (updates: Partial<UserProfile>) => {
    set((state) => {
      const updatedProfile = state.userProfile
        ? { ...state.userProfile, ...updates }
        : (updates as UserProfile);

      // Also update the usersTransactions if it exists
      const newUsersTransactions = state.usersTransactions
        ? { ...state.usersTransactions, ...updates }
        : null;

      return {
        userProfile: updatedProfile,
        usersTransactions: newUsersTransactions,
      };
    });
  },

  setTransactions: (transactions: TradeTransaction[]) => {
    set((state) => {
      // Also update the usersTransactions if it exists
      const newUsersTransactions = state.usersTransactions
        ? { ...state.usersTransactions, transactions }
        : null;

      return {
        transactions,
        usersTransactions: newUsersTransactions,
      };
    });
  },
}));
