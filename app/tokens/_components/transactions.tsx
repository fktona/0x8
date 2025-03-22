import ProfileLink from "@/components/profile-link";
import { formatNumber, timeAgo } from "@/libs/utils";
import Image from "next/image";

interface TokenTransactionProps {
  trader: string;
  bought: string;
  got: string;
  time: string;
  imageUrl: string;
  wallet: string;
}

export default function TokenTransaction({
  trader,
  bought,
  got,
  time,
  imageUrl,
  wallet,
}: TokenTransactionProps) {
  return (
    <div className="grid grid-cols-4 text-xs p-2">
      <div className="flex items-center gap-1">
        <ProfileLink walletAddress={wallet}>
          <Image
            src={imageUrl || "/profile-placeholder.svg"}
            alt={"BNB"}
            width={30}
            height={30}
            className="rounded-full"
          />
        </ProfileLink>
        <span>{trader}</span>
      </div>
      <div className="text-yellow-500">{formatNumber(bought)} USD</div>
      <div className="text-yellow-500">{formatNumber(got)}</div>
      <div className="text-gray-400">{timeAgo(time)}</div>
    </div>
  );
}
