// import { formatNumber, removeWrapped, timeAgo } from "@/libs/utils";
// import { TokenPanelProps } from "./tokens";
// import Image from "next/image";
// import Profile from "@/app/profile/[id]/page";
// import ProfileLink from "@/components/profile-link";
// import TruncatedText from "@/components/forced-trucate";
// import { useTransactionsStore } from "@/store/store";

// export default function TokenTransaction({
//   name,
//   tokenOutAmount,
//   tokenOutMetadata,
//   tokenInMetadata,
//   tokenInAmount,
//   tokenInSymbol,
//   tokenOutSymbol,
//   tokenOutAmountUsd,
//   blockTimestamp,
//   imageUrl,
//   wallet,
//   txHash,
//   type,
// }: TokenPanelProps) {
//   const { transactions } = useTransactionsStore();

//   console.log("checkPair", txHash);
//   return (
//     <div className="grid grid-cols-4  gap-2 text-xs p-2">
//       <div className="flex items-center gap-1">
//         <ProfileLink walletAddress={wallet}>
//           <Image
//             src={imageUrl || "/profile-placeholder.svg"}
//             alt={"BNB"}
//             width={20}
//             height={20}
//             className="rounded-full"
//           />
//         </ProfileLink>
//         <TruncatedText
//           text={name as string}
//           maxLength={10}
//           className="t"
//           forceTruncate
//         />
//         {/* <span className="truncate">{name}</span> */}
//       </div>
//       <div className="text-white">
//         {formatNumber(
//           type == "buy" ? tokenOutAmount : tokenOutAmount
//         )}{" "}
//         <span className="text-yellow-500">
//           {removeWrapped(type == "buy" ? tokenOutSymbol : tokenInSymbol)}
//         </span>{" "}
//       </div>
//       <div className="text-yellow-500">
//         {formatNumber(tokenInAmount)}{" "}
//         {/* <span className="text-yellow-500">{tokenInMetadata?.data.symbol}</span> */}
//       </div>
//       <div className="text-gray-400">{timeAgo(blockTimestamp)}</div>
//     </div>
//   );
// }

import { formatNumber, removeWrapped, timeAgo } from "@/libs/utils";
import { TokenPanelProps } from "./tokens";
import Image from "next/image";
import Profile from "@/app/profile/[id]/page";
import ProfileLink from "@/components/profile-link";
import TruncatedText from "@/components/forced-trucate";
import { useTransactionsStore } from "@/store/store";
import { UserTransactionSummary } from "@/types";

export default function TokenTransaction({
  data,
  sellData,
}: {
  data: UserTransactionSummary;
  sellData: UserTransactionSummary[];
}) {
  const { transactions } = useTransactionsStore();

  return (
    <div className="grid grid-cols-4 place-items-start gap-2 text-xs p-2">
      <div className="flex items-center gap-1">
        <ProfileLink walletAddress={data.wallet}>
          <Image
            src={data.imageUrl || "/profile-placeholder.svg"}
            alt={"BNB"}
            width={20}
            height={20}
            className="rounded-full"
          />
        </ProfileLink>
        <TruncatedText
          text={data.name as string}
          maxLength={13}
          className="t"
          forceTruncate
        />
        {/* <span className="truncate">{name}</span> */}
      </div>
      <div className="text-white flex flex-col gap-1 items-center">
        <span className="">
          {formatNumber(data.totalTokenOutAmount)}
          <span className="text-yellow-500 ml-1 uppercase">
            {data.chain == "bsc" ? "bnb" : "ETH"}
          </span>
        </span>
        <span className="text-white/60 text-[12px]">
          {formatNumber(data.totalTokenInAmount)}
        </span>
      </div>
      <div className="text-red-500 flex flex-col gap-1 items-center">
        <span>
          {formatNumber(
            sellData.find((o) => o.wallet === data.wallet)?.totalTokenOutAmount
          ) || 0}
          <span className="text-yellow-500 ml-1 uppercase  gap-1">
            {data?.chain == "bsc" ? "BNB" : "ETH"}
          </span>
        </span>
        <span className="text-12px] text-white/60">
          {formatNumber(
            sellData.find((o) => o.wallet === data.wallet)?.totalTokenInAmount
          ) || 0}
        </span>
      </div>
      <div className="text-gray-400">
        {timeAgo(data.lastTransactionTimestamp)}
      </div>
    </div>
  );
}
