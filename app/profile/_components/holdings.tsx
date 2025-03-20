import Image from "next/image";
interface TokenHoldingProps {
  token: string;
  value: string;
}

export default function TokenHolding({ token, value }: TokenHoldingProps) {
  return (
    <div className="flex text-[14px] items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <Image
          src={"/bnb.svg"}
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-sm font-medium">{token}</span>
      </div>

      <div className="text-sm">{value}</div>
    </div>
  );
}
