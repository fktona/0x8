"use client";
import ProfileLink from "@/components/profile-link";
import { copyToClipboard } from "@/libs/utils";
import { UserProfile } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface AccountProps {
  account: UserProfile;
  onDelete: (id: string) => void;
  index: number;
}

export default function AccountRow({ account, onDelete, index }: AccountProps) {
  return (
    <div className="flex flex-wrap items-center justify-between p-3 text-sm md:text-[18px] text-white/80 rounded-lg bg-black border border-white/10 gap-y-2">
      {/* Left Section */}
      <div className="flex items-center min-w-[50%] justify-between relative   gap-6 flex-wrap">
        <div className="flex items-center gap-2 text-start justify-start w-full flex-wrap">
          <div className="w-6  text-center font-medium">{index + 1}</div>
          <ProfileLink walletAddress={account.wallet}>
            <Image
              src={account?.imageUrl || "/profile-placeholder.svg"}
              alt={"profile"}
              width={38}
              height={38}
              className="rounded-full"
            />
          </ProfileLink>
          <span className="font-medium w-[80px]">
            {account.name.length > 7
              ? `${account.name.substring(0, 7)}...`
              : account.name}
          </span>

          <div className="min-w-[10px]  flex  mx-4 items-center justify-center gap-2">
            {account.twitter && (
              <a
                href={`https://x.com/${account.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={"/x.svg"} alt="X" width={24} height={24} />
              </a>
            )}

            {account.telegram && (
              <a
                href={`https://t.me/${account.telegram}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={"/telegram.svg"}
                  alt="Telegram"
                  width={28}
                  height={28}
                />
              </a>
            )}
          </div>

          <span className="text-gray-400 text-end hidden lg:inline max-w-[150px] sm:max-w-none">
            {account.wallet}
          </span>

          <button
            onClick={() => copyToClipboard(account.wallet)}
            className="text-gray-400 text-end hover:underline  lg:hidden max-w-[150px] sm:max-w-none"
          >
            {account.wallet.slice(0, 4)}...{account.wallet.slice(-3)}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end lg:justify-items-start w-full lg:w-auto gap-4 flex-wrap">
        {/* Tokens */}
        <div className="flex items-center gap-2">
          {account?.chains?.includes("bsc") && (
            <Image src={"/bnb.svg"} alt={"bnb"} width={30} height={34} />
          )}

          {account?.chains?.includes("eth") && (
            <Image src={"/eth.svg"} alt={"eth"} width={34} height={34} />
          )}

          {account?.chains?.includes("base") && (
            <Image src={"/base.svg"} alt={"base"} width={34} height={34} />
          )}
        </div>

        {/* Edit Button */}
        <Link
          className="flex items-center gap-2"
          href={`/admin/edit-account/${account.wallet}`}
        >
          <button className="px-5 sm:px-[20px] text-base sm:text-[21px] py-2 sm:py-[7px] bg-white text-black rounded-full font-medium">
            Edit
          </button>
        </Link>

        {/* Delete Button */}
        <button
          className="text-red-500"
          onClick={() => onDelete(account.wallet)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 38 38"
            fill="none"
          >
            <path
              d="M11.0527 32.875C10.2048 32.875 9.47921 32.5733 8.87591 31.97C8.2726 31.3667 7.97043 30.6406 7.96941 29.7917V9.75C7.5326 9.75 7.16671 9.602 6.87174 9.306C6.57677 9.01 6.42877 8.64411 6.42774 8.20833C6.42671 7.77256 6.57471 7.40667 6.87174 7.11067C7.16877 6.81467 7.53466 6.66667 7.96941 6.66667H14.1361C14.1361 6.22986 14.2841 5.86397 14.5801 5.569C14.8761 5.27403 15.242 5.12603 15.6777 5.125H21.8444C22.2812 5.125 22.6476 5.273 22.9436 5.569C23.2396 5.865 23.3871 6.23089 23.3861 6.66667H29.5527C29.9895 6.66667 30.3559 6.81467 30.6519 7.11067C30.9479 7.40667 31.0954 7.77256 31.0944 8.20833C31.0934 8.64411 30.9454 9.01051 30.6504 9.30754C30.3554 9.60457 29.9895 9.75206 29.5527 9.75V29.7917C29.5527 30.6396 29.2511 31.3657 28.6478 31.97C28.0445 32.5744 27.3184 32.876 26.4694 32.875H11.0527Z"
              fill="#FF6565"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
