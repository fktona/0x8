import TruncatedText from "@/components/forced-trucate";
import ProfileLink from "@/components/profile-link";
import { formatNumber, formatNumber2 } from "@/libs/utils";
import { LeaderBoard } from "@/types";
import Image from "next/image";
interface LeaderboardRowProps {
  rank: number;
  name: string;
  walletAddress: string;
  winLoss: string;
  profit: string;
  usdValue: string;
}

export default function LeaderboardRow({
  data,
  rank,
  activeTab,
}: {
  data: LeaderBoard;
  rank: number;
  activeTab: string;
}) {
  // Determine background color based on rank
  let bgColor = "";
  if (rank === 1) bgColor = "rank1";
  else if (rank === 2) bgColor = "rank2";
  else if (rank === 3) bgColor = "rank3";

  const win = data.pnlSummary.totalPnlPercentage >= 0;
  const winLoss = win ? "Win" : "Loss";

  return (
    <div
      className={`flex items-center flex-wrap lg:flex-nowrap gap-3.5 justify-between p-3 border border-[#1F1F1F] text-white/80 rounded-[13px] ${bgColor}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 text-center font-medium">
          {rank === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 8.16216V8.23516C22 9.09516 22 9.52616 21.793 9.87816C21.586 10.2302 21.209 10.4392 20.457 10.8582L19.664 11.2982C20.21 9.45016 20.393 7.46416 20.46 5.76616L20.47 5.54516L20.472 5.49316C21.123 5.71916 21.489 5.88816 21.717 6.20416C22 6.59716 22 7.11916 22 8.16216ZM2 8.16216V8.23516C2 9.09516 2 9.52616 2.207 9.87816C2.414 10.2302 2.791 10.4392 3.543 10.8582L4.337 11.2982C3.79 9.45016 3.607 7.46416 3.54 5.76616L3.53 5.54516L3.529 5.49316C2.877 5.71916 2.511 5.88816 2.283 6.20416C2 6.59716 2 7.12016 2 8.16216Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2.00023C13.784 2.00023 15.253 2.15723 16.377 2.34723C17.516 2.53923 18.085 2.63523 18.561 3.22123C19.037 3.80723 19.011 4.44023 18.961 5.70623C18.789 10.0552 17.851 15.4862 12.75 15.9662V19.5002H14.18C14.4111 19.5004 14.635 19.5805 14.8136 19.7271C14.9923 19.8737 15.1147 20.0776 15.16 20.3042L15.35 21.2502H18C18.1989 21.2502 18.3897 21.3292 18.5303 21.4699C18.671 21.6105 18.75 21.8013 18.75 22.0002C18.75 22.1991 18.671 22.3899 18.5303 22.5306C18.3897 22.6712 18.1989 22.7502 18 22.7502H5.99997C5.80106 22.7502 5.61029 22.6712 5.46964 22.5306C5.32899 22.3899 5.24997 22.1991 5.24997 22.0002C5.24997 21.8013 5.32899 21.6105 5.46964 21.4699C5.61029 21.3292 5.80106 21.2502 5.99997 21.2502H8.64997L8.83997 20.3042C8.88527 20.0776 9.00765 19.8737 9.18631 19.7271C9.36497 19.5805 9.58888 19.5004 9.81997 19.5002H11.25V15.9662C6.14997 15.4862 5.21197 10.0542 5.03997 5.70623C4.98897 4.44023 4.96397 3.80623 5.43997 3.22123C5.91497 2.63523 6.48397 2.53923 7.62297 2.34723C9.06981 2.11022 10.5339 1.99415 12 2.00023ZM12.952 6.19923L12.854 6.02323C12.474 5.34023 12.284 5.00023 12 5.00023C11.716 5.00023 11.526 5.34023 11.146 6.02323L11.048 6.19923C10.94 6.39323 10.886 6.48923 10.802 6.55323C10.717 6.61723 10.612 6.64123 10.402 6.68823L10.212 6.73223C9.47397 6.89923 9.10497 6.98223 9.01697 7.26423C8.92897 7.54623 9.18097 7.84123 9.68397 8.42923L9.81397 8.58123C9.95697 8.74823 10.029 8.83123 10.061 8.93523C10.093 9.03923 10.082 9.15023 10.061 9.37323L10.041 9.57623C9.96497 10.3612 9.92697 10.7542 10.156 10.9282C10.386 11.1022 10.732 10.9432 11.423 10.6252L11.601 10.5432C11.798 10.4532 11.896 10.4082 12 10.4082C12.104 10.4082 12.202 10.4532 12.399 10.5432L12.577 10.6252C13.268 10.9442 13.614 11.1022 13.844 10.9282C14.074 10.7542 14.035 10.3612 13.959 9.57623L13.939 9.37323C13.918 9.15023 13.907 9.03923 13.939 8.93523C13.971 8.83123 14.043 8.74823 14.186 8.58123L14.316 8.42923C14.819 7.84123 15.071 7.54723 14.983 7.26423C14.895 6.98223 14.526 6.89923 13.788 6.73223L13.598 6.68823C13.388 6.64123 13.283 6.61823 13.198 6.55323C13.114 6.48923 13.06 6.39323 12.952 6.19923Z"
                fill="black"
              />
            </svg>
          ) : (
            rank
          )}
        </div>

        <div className="flex items-center gap-2">
          <ProfileLink walletAddress={data.wallet}>
            <Image
              src={data.imageUrl || "/profile-placeholder.svg"}
              alt={"X"}
              width={24}
              height={24}
              className="rounded-full"
            />
          </ProfileLink>
          <TruncatedText
            maxLength={12}
            forceTruncate
            text={data?.name}
            className="text-[16px] lg:w-[60px] mr-8  font-medium"
          />

          <div className="flex lg:min-w-[40px] min-w-[45px]   items-center justify-start my-4 gap-3">
            {data.twitter && (
              <a
                href={`https://x.com/${data.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={"/x.svg"} alt={"X"} width={16} height={16} />
              </a>
            )}

            {data.telegram && (
              <a
                href={`https://t.me/${data.telegram}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/telegram.svg"}
                  alt={"X"}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              </a>
            )}
          </div>
          <span className="text-[16px] lg:ml-[40px]">
            <span className="lg:hidden">
              {data.wallet.slice(0, 4)}...{data.wallet.slice(-4)}
            </span>
            <span className="hidden lg:inline">{data.wallet}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className=" text-[16px]">
          <span className="text-green-500">
            {formatNumber2(data.pnlSummary.totalBuys.toString())}
          </span>
          /
          <span className="text-red-500">
            {formatNumber2(data.pnlSummary.totalSells.toString())}
          </span>
        </div>

        <div
          className={
            win
              ? "text-green-500 uppercase text-[16px]"
              : "text-red-500 text-[16px]"
          }
        >
          <span className="">
            {win && "+"}
            {formatNumber2(data.pnlSummary.baseTokenGain)}
            {""}
            <span className="ml-1">
              {activeTab == "BASE" ? "ETH" : activeTab == "BSC" ? "BNB" : "ETH"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
          >
            <path
              d="M8.5 11L4.5 15M4.5 15L8.5 19M4.5 15H16.5M12.5 3L16.5 7M16.5 7L12.5 11M16.5 7H4.5"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            className={
              win
                ? "text-green-500 uppercase text-[16px]"
                : "text-red-500 text-[16px]"
            }
          >
            {"(" +
              (data.pnlSummary.baseTokenGainUSD.startsWith("-") ? "-" : "") +
              "$" +
              (formatNumber2(data.pnlSummary.baseTokenGainUSD).startsWith("-")
                ? formatNumber2(data.pnlSummary.baseTokenGainUSD).substring(1)
                : formatNumber2(data.pnlSummary.baseTokenGainUSD)) +
              ")"}
          </span>
        </div>
      </div>
    </div>
  );
}
