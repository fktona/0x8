"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

const tokenDetails = [
  {
    name: "BNB",
    icon: "/bnb.svg",
    balance: 8888,
    gasIcon: "/bnb-gas.svg",
    gas: "1 GWei",
  },
  {
    name: "ETH",
    icon: "/eth.svg",
    balance: 8888,
    gasIcon: "/eth-gas.svg",
    gas: "0.6 GWei",
  },
  {
    name: "BASE",
    icon: "/base.svg",
    balance: 8888,
    gasIcon: "/eth-gas.svg",
    gas: "0.6 GWei",
  },
];

function Navbar() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="overflow-hidden">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full backdrop-blur-md py-[13px] bg-black/15 px-6 lg:px-[40px] font-aktiv-regular justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-[32px] tracking-[0%] flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={30} height={30} /> 0xscan
            </h1>
          </Link>
          <ul className="flex gap-3 overflow-x-auto w-max">
            {tokenDetails.map((token, index) => (
              <li
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center"
              >
                <Image
                  src={token.icon}
                  alt={token.name}
                  width={20}
                  height={20}
                />
                <span>{token.balance}</span>
                <div className="bg-[#424242] w-[1px] h-full mx-2"></div>
                <Image src={token.gasIcon} alt="gas" width={20} height={20} />
                <p>{token.gas}</p>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex gap-10 items-center">
          {["/trades", "/tokens", "/leaderboard"].map((route, index) => (
            <li
              key={index}
              className={cn(
                "text-[18px] px-4 py-2 rounded-full uppercase",
                path === route
                  ? "bg-[#6E88EC] text-black"
                  : "hover:bg-[#6E88EC]/40"
              )}
            >
              <Link href={route}>{route.replace("/", "")}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full bg-black fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={20} height={20} />
              <span className="text-white text-lg font-medium">0xscan</span>
            </div>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Token details scrollable area */}
        <div className="overflow-x-auto py-2 px-2 border-b border-gray-800">
          <div className="flex gap-2 overflow-x-auto w-max">
            {tokenDetails.map((token, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-white/[0.08] rounded-full px-2 py-1 whitespace-nowrap text-xs"
              >
                <Image
                  src={token.icon}
                  alt={token.name}
                  width={16}
                  height={16}
                />
                <span className="text-white">
                  ${token.balance.toLocaleString()}
                </span>
                <div className="bg-[#424242] w-[1px] h-4 mx-1"></div>
                <Image src={token.gasIcon} alt="gas" width={16} height={16} />
                <span className="text-white">{token.gas}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="bg-black/95 absolute top-[88px] left-0 right-0 border-t border-gray-800 py-4">
            <ul className="flex flex-col gap-4 px-6">
              {["/trades", "/tokens", "/leaderboard"].map((route, index) => (
                <li
                  key={index}
                  className={cn(
                    "text-[16px] px-4 py-2 rounded-full",
                    path === route ? "bg-[#6E88EC] text-black" : "text-white"
                  )}
                >
                  <Link href={route}>{route.replace("/", "")}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[88px] md:h-20"></div>
    </div>
  );
}

export default Navbar;
