import { formatNumber, removeWrapped, timeAgo } from "@/libs/utils";
import { TokenPanelProps } from "./tokens";
import Image from "next/image";
import Profile from "@/app/profile/[id]/page";
import ProfileLink from "@/components/profile-link";
import TruncatedText from "@/components/forced-trucate";

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
  type,
}: TokenPanelProps) {
  return (
    <div className="grid grid-cols-4  gap-2 text-xs p-2">
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
        <TruncatedText
          text={name as string}
          maxLength={10}
          className="t"
          forceTruncate
        />
        {/* <span className="truncate">{name}</span> */}
      </div>
      <div className="text-white">
        {formatNumber(type == "buy" ? tokenOutAmount : tokenInSymbol)}{" "}
        <span className="text-yellow-500">
          {removeWrapped(type == "buy" ? tokenOutSymbol : tokenInSymbol)}
        </span>{" "}
      </div>
      <div className="text-yellow-500">
        {formatNumber(tokenInAmount)}{" "}
        {/* <span className="text-yellow-500">{tokenInMetadata?.data.symbol}</span> */}
      </div>
      <div className="text-gray-400">{timeAgo(blockTimestamp)}</div>
    </div>
  );
}
