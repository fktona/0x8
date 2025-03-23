import { formatNumber, timeAgo } from "@/libs/utils";
import { TokenPanelProps } from "./tokens";
import Image from "next/image";
import Profile from "@/app/profile/[id]/page";
import ProfileLink from "@/components/profile-link";

export default function TokenTransaction({
  name,
  tokenOutAmount,
  tokenOutMetadata,
  tokenInMetadata,
  tokenInAmount,
  tokenInSymbol,
  tokenOutSymbol,
  tokenOutAmountUsd,
  blockTimestamp,
  imageUrl,
  wallet,
}: TokenPanelProps) {
  return (
    <div className="grid grid-cols-4 text-xs p-2">
      <div className="flex items-center gap-1">
        <ProfileLink walletAddress={wallet}>
          <Image
            src={imageUrl || "/profile-placeholder.svg"}
            alt={"BNB"}
            width={20}
            height={20}
            className="rounded-full"
          />
        </ProfileLink>
        <span>{name}</span>
      </div>
      <div className="text-white">
        {formatNumber(tokenOutAmount)}{" "}
        <span className="text-yellow-500">{tokenOutSymbol}</span>{" "}
      </div>
      <div className="text-yellow-500">
        {formatNumber(tokenInAmount)}{" "}
        {/* <span className="text-yellow-500">{tokenInMetadata?.data.symbol}</span> */}
      </div>
      <div className="text-gray-400">{timeAgo(blockTimestamp)}</div>
    </div>
  );
}
