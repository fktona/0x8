import Image from "next/image";
interface WalletCardProps {
  name: string;
  address: string;
  coinType: "BNB" | "ETH" | "BASE";
}

export default function WalletCard({
  name,
  address,
  coinType,
}: WalletCardProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
        {name.charAt(0)}
      </div>
      <span className="text-sm">{name}</span>
      <div className="w-4 h-4 flex items-center justify-center bg-gray-800 rounded-full">
        <span className="text-xs">X</span>
      </div>

      {coinType === "BNB" && (
        <Image
          src={"/bnb.svg"}
          alt={"BNB"}
          width={20}
          height={20}
          className="rounded-full"
        />
      )}
      {coinType === "ETH" && (
        <Image
          src={"/eth.svg"}
          alt={"ETH"}
          width={20}
          height={20}
          className="rounded-full"
        />
      )}
      {coinType === "BASE" && (
        <Image
          src={"/base.svg"}
          alt={"BASE"}
          width={20}
          height={20}
          className="rounded-full"
        />
      )}

      <span className="text-sm truncate max-w-[100px]">{address}</span>
    </div>
  );
}
