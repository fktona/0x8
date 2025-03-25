"use client";

import { startTransition, useState } from "react";
import Image from "next/image";
import AccountRow from "./account-row";
import Link from "next/link";
import { UserProfile } from "@/types";
import { deleteAccount } from "@/app/actions/action";

export default function AdminDashboardPage({
  users,
}: {
  users: UserProfile[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change as needed
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>(users);

  const handleSearch = (query: string) => {
    const filtered = users.filter((user) =>
      user.wallet.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = [...filteredUsers]
    .sort((a, b) => a.wallet.localeCompare(b.wallet))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (wallet: string) => {
    startTransition(async () => {
      setError(null);
      try {
        const res = await deleteAccount(wallet);
        if (res.errors) {
          const updatedUsers = users.filter((user) => user.wallet !== wallet);
          setSuccess("Account deleted successfully." + res.errors);
        }
        if (res.success) {
          const updatedUsers = users.filter((user) => user.wallet !== wallet);
          setSuccess("Account deleted successfully.");
        } else {
          setError("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
        setError("Failed to delete account. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen  text-white flex flex-col">
      {/* Gradient Background */}
      <div className="flex-grow flex flex-col gap-5 relative ">
        <div className="w-full inset-0  bgg2 z-0 h-[191px] flex items-center justify-center">
          <h1 className="font-aktiv-bold font-bold text-[63px]">ADMIN</h1>
        </div>
        <div className="flex-grow z-10 p pb-8 lg:px-[80px] px-4 max-w-[2560px] w-full self-center">
          <div className="flex lg:items-center flex-col gap-4 lg:flex-row justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="lg:text-[34px] text-[24px] font-aktiv-regular font-medium ">
                Accounts
              </h2>
              <span className="text-yellow-400 lg:text-[34px] text-[24px] font-aktiv-regular font-medium">
                {users.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="ml-auto relative lg:w-[538px] w-[100%]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
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
              <Link href="/admin/add-account">
                <button className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 font-medium">
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
              </Link>
            </div>
          </div>

          {/* Accounts List */}
          <div className="space-y-2">
            {paginatedUsers.map((account: UserProfile, index: number) => (
              <AccountRow
                index={index}
                key={account.wallet}
                account={account}
                onDelete={() => {
                  handleDelete(account.wallet);
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {filteredUsers.length > 5 && (
            <div className="flex justify-end items-center gap-2 mt-6">
              <button
                className={`px-3 py-1 rounded-md font-medium ${
                  currentPage === 1
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1 ? "bg-gray-800" : ""
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className={`px-3 py-1 rounded-md font-medium ${
                  currentPage === totalPages
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
          {
            // Show error or success message
            error && (
              <div className="text-center text-red-500 font-bold">{error}</div>
            )
          }
          {success && (
            <div className="text-center text-green-500 font-bold">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
