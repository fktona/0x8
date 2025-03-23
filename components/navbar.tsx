"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, formatNumber } from "@/libs/utils";
import { TopInfo } from "@/app/actions/action";
import { CryptoData } from "@/types";

function Navbar() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<CryptoData | null>(null);
  useEffect(() => {
    const fetchTokenDetails = async () => {
      const res = await TopInfo();
      setTokenDetails(res);
    };
    fetchTokenDetails();
  }, []);
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
            <li className="px-2 py-1 min-w-[150px] lg:min-w-[180px] text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/eth.svg" alt={"eth"} width={20} height={20} />
              <span>{formatNumber(tokenDetails?.data?.eth?.price)}</span>
              <div className="bg-[#424242] w-[1px] h-full mx-2"></div>
              <Image src={"/eth-gas.svg"} alt="gas" width={20} height={20} />
              <p>{formatNumber(tokenDetails?.data?.eth?.gas)} Gwei</p>
            </li>

            <li className="px-2 py-1 min-w-[150px] lg:min-w-[180px] text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/bsc.svg" alt={"bsc"} width={20} height={20} />
              <span>{formatNumber(tokenDetails?.data?.bnb?.price)}</span>
              <div className="bg-[#424242] w-[1px] h-full mx-2"></div>
              <Image src={"/bnb-gas.svg"} alt="gas" width={20} height={20} />
              <p>{formatNumber(tokenDetails?.data?.bnb?.gas)} Gwei</p>
            </li>

            <li className="px-2 py-1 text-xs min-w-[100px] lg:min-w-[100px] rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/base.svg" alt={"base"} width={24} height={24} />
              <span>{formatNumber(tokenDetails?.data?.eth?.price)}</span>
            </li>
          </ul>
        </div>
        <ul className="flex gap-4 items-center">
          {["/trades", "/tokens", "/leaderboard"].map((route, index) => (
            <Link href={route}>
              <li
                key={index}
                className={cn(
                  "text-[18px] px-4 py-2 rounded-full uppercase",
                  path === route
                    ? "bg-[#6E88EC] text-black"
                    : "hover:bg-[#6E88EC]/40"
                )}
              >
                {route.replace("/", "")}
              </li>
            </Link>
          ))}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g clip-path="url(#clip0_2001_940)">
              <mask
                id="mask0_2001_940"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="21"
                height="21"
              >
                <path d="M0 0H21V21H0V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_2001_940)">
                <path
                  d="M16.5375 0.984009H19.758L12.723 9.04501L21 20.016H14.52L9.441 13.3635L3.636 20.016H0.4125L7.9365 11.391L0 0.985509H6.645L11.229 7.06501L16.5375 0.984009ZM15.405 18.084H17.19L5.67 2.81551H3.756L15.405 18.084Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_2001_940">
                <rect width="21" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
          <ul className="flex gap-2 overflow-x-auto w-max">
            <li className="px-2 py-1 text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/eth.svg" alt={"eth"} width={20} height={20} />
              <span>{tokenDetails?.data?.eth?.price}</span>
              <div className="bg-[#424242] w-[1px] h-full mx-2"></div>
              <Image src={"/eth-gas.svg"} alt="gas" width={20} height={20} />
              <p>{tokenDetails?.data?.eth?.gas} Gwei</p>
            </li>

            <li className="px-2 py-1 text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/bsc.svg" alt={"bsc"} width={20} height={20} />
              <span>{tokenDetails?.data?.bnb?.price}</span>
              <div className="bg-[#424242] w-[1px] h-full mx-2"></div>
              <Image src={"/bnb-gas.svg"} alt="gas" width={20} height={20} />
              <p>{tokenDetails?.data?.bnb?.gas} Gwei</p>
            </li>

            <li className="px-2 py-1 text-xs rounded-full bg-white/[0.08] flex justify-center gap-2 items-center">
              <Image src="/base.svg" alt={"base"} width={24} height={24} />
              <span>{tokenDetails?.data?.eth?.price}</span>
            </li>
          </ul>
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
