import Link from "next/link";
import React from "react";

function ProfileLink({
  children,
  walletAddress,
}: {
  children: React.ReactNode;
  walletAddress: string;
}) {
  return (
    <Link href={`/profile/${walletAddress}`} className="cursor-pointer">
      {children}
    </Link>
  );
}

export default ProfileLink;
