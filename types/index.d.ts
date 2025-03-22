export type TradeTransaction = {
  wallet: string;
  chain: string;
  type: "buy" | "sell";
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
  name?: string;
  wallet?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  chains?: string[];
  imageUrl?: string;
};
export type UserProfile = {
  name: string;
  wallet: string;
  twitter: string;
  telegram: string;
  website: string;
  chains: string[];
  imageUrl: string;
};

export interface AlTransactionsProps extends UserProfile {
  transactions: TradeTransaction[];
}

export type PnlSummary = {
  totalTradesCount: number;
  totalPnlUSD: string;
  totalPnlPercentage: number;
  totalBuys: number;
  totalSells: number;
  totalBuysUSD: string;
  totalSellsUSD: string;
};

export type LeaderBoard = {
  name: string;
  wallet: string;
  twitter: string;
  telegram: string;
  website: string;
  chains: string[];
  imageUrl: string;
  pnlSummary: PnlSummary;
};

type TokenPnlProps = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenBalance: string;
  tokenBalanceUSD: number;
};

export type TokenHoldings = {
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  tokenBalance: string;
  tokenBalanceUSD: number;
  tokenLogo: string;
};

export type CryptoData = {
  status: "success";
  data: {
    bnb: {
      price: string;
      gas: string;
    };
    eth: {
      price: string;
      gas: string;
    };
    base: {
      price: string;
    };
  };
  timestamp: string;
};
export interface TransactionEvent {
  msg: string;
  content: TradeTransaction;
}

export type GroupedTransactions = {
  [tokenOutSymbol: string]: TradeTransaction[]; // Groups by tokenOutSymbol, and each group contains an array of transactions
};
