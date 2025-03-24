import React from "react";

function DexLink({
  children,
  tokenAddress,
  chain,
}: {
  children: React.ReactNode;
  tokenAddress: string;
  chain: string;
}) {
  const dexUrl = `https://dexscreener.com/${
    chain == "eth" ? "ethereum" : chain
  }/${tokenAddress}`;

  return (
    <a
      href={dexUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer  hover:underline"
    >
      {children}
    </a>
  );
}

export default DexLink;
