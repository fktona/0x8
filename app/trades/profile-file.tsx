import TruncatedText from "@/components/forced-trucate";
import React from "react";
import Image from "next/image";
import { AlTransactionsProps } from "@/types";
import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function ProfileFilter({
  name,
  wallet,
  imageUrl,
  onClick,
  filteredOutWallet,
}: {
  name: string;
  wallet: string;
  imageUrl: string;
  onClick: (wallet: string) => void;
  filteredOutWallet: string[];
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={
        filteredOutWallet?.includes(wallet) ? () => onClick(wallet) : () => {}
      }
      className={cn(
        "w-[115px] h-[37px] lg:w-[156px] lg:h-[50px] rounded-full px-3 flex items-center justify-between text-black bg-[#6E88EC]",
        filteredOutWallet?.includes(wallet) && "bg-transparent text-white"
      )}
    >
      <div className="flex items-center gap-1 overflow-hidden text-start justify-start w-full">
        <Image
          src={imageUrl || "/profile-placeholder.svg"}
          alt={"profile"}
          width={38}
          height={38}
          className="rounded-full w-[22px] lg:w-[30px] aspect-square"
        />
        <TruncatedText
          text={name}
          forceTruncate
          maxLength={12}
          className="font-medium lg:text-[14px] text-[12px]"
        />
      </div>
      <motion.button
        onClick={() => onClick(wallet)}
        className="text-black w-[30px]"
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <X size={20} />
      </motion.button>
    </motion.button>
  );
}

export default ProfileFilter;
