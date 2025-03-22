import { GroupedTransactions, TradeTransaction } from "@/types";
import TokenTransaction from "./transactions";

export default function TokenPanel({
  imageUrl,
  name,
  tokenInSymbol,
  tokenInName,
  tokenInAmount,
  tokenInAmountUsd,
  wallet,
  blockTimestamp,
}: TradeTransaction) {
  const transactions = Array(5)
    .fill(null)
    .map(() => ({
      trader: "Daniel",
      bought: "23.56 BNB",
      got: "34.5M",
      time: "10m",
    }));

  return (
    <div className=" mb-4 overflow-hidden">
      {/* Table Header */}

      {/* Transactions */}
      <div className="">
        <TokenTransaction
          trader={name || ""}
          bought={tokenInAmountUsd || ""}
          wallet={wallet || ""}
          got={tokenInAmount}
          time={blockTimestamp}
          imageUrl={imageUrl || ""}
        />
      </div>
    </div>
  );
}
