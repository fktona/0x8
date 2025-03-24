import { TradeTransaction } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GroupedTransactions = {
  [symbol: string]: TradeTransaction[];
};
export const groupTransactionsByTokenPair = (
  transactions: TradeTransaction[]
): GroupedTransactions => {
  const grouped: GroupedTransactions = {};

  transactions.forEach((transaction) => {
    // Create a unique key for this token pair
    const symbols = [
      transaction.tokenOutSymbol,
      transaction.tokenInSymbol,
    ].sort();
    const pairKey = symbols.join("-");

    if (!grouped[pairKey]) {
      grouped[pairKey] = [];
    }
    grouped[pairKey].push(transaction);
  });

  return grouped;
};

function roundToTwoDecimal(value: string | number): number {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return Math.round(num * 100) / 100;
}

export function formatNumber(value: string | number | undefined): string {
  if (value === undefined || value === null) return "0";

  // Convert to number and handle potential parsing errors
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  // Format the number based on its size - use absolute value to remove negative signs
  const absNum = Math.abs(num);
  if (absNum >= 1000000000) {
    return (absNum / 1000000000).toFixed(2) + "B";
  } else if (absNum >= 1000000) {
    return (absNum / 1000000).toFixed(2) + "M";
  } else if (absNum >= 1000) {
    return (absNum / 1000).toFixed(2) + "K";
  } else if (absNum < 0.01 && num !== 0) {
    return "<0.01";
  } else {
    return absNum.toFixed(2);
  }
}

export function timeAgo(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { label: "y", seconds: 31536000 }, // 1 year
    { label: "mo", seconds: 2592000 }, // 1 month
    { label: "w", seconds: 604800 }, // 1 week
    { label: "d", seconds: 86400 }, // 1 day
    { label: "h", seconds: 3600 }, // 1 hour
    { label: "m", seconds: 60 }, // 1 minute
  ];

  for (const unit of units) {
    const interval = Math.floor(seconds / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label} ago`;
    }
  }

  return "Just now";
}

export function formatNumber2(num: string): string {
  return new Intl.NumberFormat("en").format(parseFloat(num));
}

export const groupByTokenInSymbol = (
  transactions: TradeTransaction[]
): GroupedTransactions => {
  return transactions.reduce((acc, transaction) => {
    const { tokenInSymbol } = transaction;
    if (!acc[tokenInSymbol]) {
      acc[tokenInSymbol] = [];
    }
    acc[tokenInSymbol].push(transaction);
    return acc;
  }, {} as GroupedTransactions);
};

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
}

export const removeWrapped = (str: string | undefined) => {
  if (!str) return "";
  str == "WETH" ? (str = "ETH") : str;
  str == "WBNB" ? (str = "BNB") : str;
  return str;
};
