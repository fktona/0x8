import TokenTransaction from "./transactions";

interface TokenPanelProps {
  tokenName: string;
  marketCap: string;
  priceChange: string;
}

export default function TokenPanel({
  tokenName,
  marketCap,
  priceChange,
}: TokenPanelProps) {
  const transactions = Array(5)
    .fill(null)
    .map(() => ({
      trader: "Daniel",
      bought: "23.56 BNB",
      got: "34.5M",
      time: "10m",
    }));

  return (
    <div className="bg-[#1B1B1B] border border-white/10 rounded-lg mb-4 overflow-hidden">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center gap-2">
          {tokenName === "PONKE" ? (
            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
              🪙
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs">
              🔥
            </div>
          )}
          <span className="text-sm font-medium">{tokenName}</span>
          <span className="text-xs text-gray-400">MC: {marketCap}</span>
        </div>
        <div className="text-red-500 text-sm">{priceChange}</div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-xs text-gray-400 p-2 ">
        <div>Traders</div>
        <div>Bought</div>
        <div>Got</div>
        <div>Time</div>
      </div>

      {/* Transactions */}
      <div className="">
        {transactions.map((tx, index) => (
          <TokenTransaction
            key={index}
            trader={tx.trader}
            bought={tx.bought}
            got={tx.got}
            time={tx.time}
          />
        ))}
      </div>
    </div>
  );
}
