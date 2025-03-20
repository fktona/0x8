"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import AccountRow from "./_components/account-row";
import AddAccountModal from "./_components/add-account-modal";

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState(
    Array(16)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        name: "ROBO",
        walletAddress: "0xbf769A3dcd497351A32443B395fD0147Bf8f8513",
        platforms: ["x", "telegram"],
        tokens: ["bnb", "eth", "base"],
      }))
  );

  const addAccount = (account: any) => {
    setAccounts([
      ...accounts,
      {
        id: accounts.length + 1,
        ...account,
      },
    ]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Gradient Background */}
      <div className="flex-grow flex flex-col gap-5 relative">
        <div className="w-full inset-0  bgg2 z-0 h-[191px] flex items-center justify-center">
          <h1 className="font-aktiv-bold font-bold text-[63px]">ADMIN</h1>
        </div>
        <div className="flex-grow z-10 px-4 pb-8">
          <div className="flex lg:items-center flex-col gap-4 lg:flex-row justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="lg:text-[34px] text-[24px] font-aktiv-regular font-medium ">
                Accounts
              </h2>
              <span className="text-yellow-400 lg:text-[34px] text-[24px] font-aktiv-regular font-medium">
                200
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="ml-auto relative lg:w-[538px] w-[100%]">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex lg:w-[538px] w-full h-[38px] p-[10px] flex-col justify-center items-center gap-[10px] rounded-[80px] bg-[rgba(12,12,12,0.93)]"
                />

                <Image
                  src="/searchIcon.svg"
                  alt="search"
                  width={16}
                  height={16}
                  className="absolute right-[20px] top-[20px]"
                />
              </div>
              <button
                className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 font-medium"
                onClick={() => setShowModal(true)}
              >
                Add{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M18.5 12.998H13.5V17.998C13.5 18.2633 13.3946 18.5176 13.2071 18.7052C13.0196 18.8927 12.7652 18.998 12.5 18.998C12.2348 18.998 11.9804 18.8927 11.7929 18.7052C11.6054 18.5176 11.5 18.2633 11.5 17.998V12.998H6.5C6.23478 12.998 5.98043 12.8927 5.79289 12.7052C5.60536 12.5176 5.5 12.2633 5.5 11.998C5.5 11.7328 5.60536 11.4785 5.79289 11.2909C5.98043 11.1034 6.23478 10.998 6.5 10.998H11.5V5.99805C11.5 5.73283 11.6054 5.47848 11.7929 5.29094C11.9804 5.1034 12.2348 4.99805 12.5 4.99805C12.7652 4.99805 13.0196 5.1034 13.2071 5.29094C13.3946 5.47848 13.5 5.73283 13.5 5.99805V10.998H18.5C18.7652 10.998 19.0196 11.1034 19.2071 11.2909C19.3946 11.4785 19.5 11.7328 19.5 11.998C19.5 12.2633 19.3946 12.5176 19.2071 12.7052C19.0196 12.8927 18.7652 12.998 18.5 12.998Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Accounts List */}
          <div className="space-y-2">
            {accounts.map((account) => (
              <AccountRow
                key={account.id}
                account={account}
                onDelete={(id) => {
                  setAccounts(accounts.filter((acc) => acc.id !== id));
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-6">
            <button className="px-3 py-1 bg-gray-800 rounded-md font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-md">2</button>
            <button className="px-3 py-1 rounded-md">3</button>
            <span>. .</span>
            <button className="px-3 py-1 rounded-md">5</button>
            <button className="px-3 py-1 rounded-md">Next</button>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {showModal && (
        <AddAccountModal
          onClose={() => setShowModal(false)}
          onAdd={addAccount}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
