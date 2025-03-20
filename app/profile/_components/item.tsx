import Image from "next/image";
interface TradeItemProps {
  type: string;
  amount: string;
  token: string;
  price: string;
  currency: string;
  time: string;
}

export default function TradeItem({
  type,
  amount,
  token,
  price,
  currency,
  time,
}: TradeItemProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <div
        className={`text-sm ${
          type === "Buy" ? "text-green-500" : "text-red-500"
        }`}
      >
        {type}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">{amount}</span>
        <Image
          src={"/ponki.svg"}
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm">{token}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">{price}</span>
        <Image
          src={"/bnb.svg"}
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm">{currency}</span>
      </div>

      <div className="text-sm text-gray-400">{time}</div>
    </div>
  );
}
