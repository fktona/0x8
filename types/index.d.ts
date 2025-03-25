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
  profitableTrades: number;
  losingTrades: number;
  totalBaseTokenInvested: string; // Amount in base token (ETH or BNB)
  totalBaseTokenInvestedUSD: string; // Amount in USD
  totalBaseTokenRealized: string; // Amount in base token (ETH or BNB)
  totalBaseTokenRealizedUSD: string; // Amount in USD
  baseTokenGain: string; // The total amount of base token gained
  baseTokenGainUSD: string; // The total USD value of base token gained
  totalPnlPercentage: number;
  totalBuys: number;
  totalSells: number;
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

export type TokenMetaData = {
  status: "success" | "error";
  data: {
    address: string;
    name: string;
    symbol: string;
    TokenPrice: string;
    marketCap: string;
    price_change_percentage: number;
  };
  timestamp: string;
};

export type TokenTradeSummary = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tradeCount: number;
  totalBuys: number;
  totalSells: number;
  totalTokenBought: string;
  totalTokenBoughtUSD: string;
  totalTokenSold: string;
  totalTokenSoldUSD: string;
  pnlUSD: string;
  pnlPercentage: number;
};

export type ExtendedTokenTradeSummary = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tradeCount: number;
  totalBuys: number;
  totalSells: number;
  totalBaseTokenSpent: string; // Amount of base token spent (ETH or BNB)
  totalBaseTokenSpentUSD: string; // USD equivalent of base token spent
  totalTokenBought: string; // Amount of token bought
  totalTokenBoughtUSD: string; // USD equivalent of tokens bought
  totalTokenSold: string; // Amount of token sold
  totalTokenSoldUSD: string; // USD equivalent of tokens sold
  totalBaseTokenReceived: string; // Amount of base token received
  totalBaseTokenReceivedUSD: string; // USD equivalent of base token received
  tokenNetAmount: string; // Net token amount after trades
  baseTokenPnl: string; // Profit/loss in base token
  realizedPnlUSD: string; // Profit/loss in USD
  realizedPnlPercentage: number; // P&L percentage
  avgBuyTimeSeconds: number; // Average buy time in seconds
  avgSellTimeSeconds: number; // A
};

export type UserTransactionSummary = {
  wallet: string;
  totalTokenInAmount: number;
  totalTokenOutAmount: number;
  lastTransactionTimestamp: string;
  imageUrl: string;
  name: string;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  chain: string;
  // tokenInName: string;
  // tokenInName: string;
};
