"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    xHandle: "",
    telegramHandle: "",
    profileImage: null as File | null,
  });

  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    }
  };

  const toggleChain = (chain: string) => {
    if (selectedChains.includes(chain)) {
      setSelectedChains(selectedChains.filter((c) => c !== chain));
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data here
    console.log({ ...formData, chains: selectedChains });
    router.push("/admin/dashboard");
  };

  return (
    <div className=" text-white flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => router.back()}
          >
            {/* <ArrowLeft className="w-5 h-5" /> Back */}
          </button>

          <h1 className="text-3xl font-bold text-center mb-10">Add account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="adminInput w-full text-white"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
                className="adminInput w-full text-white"
                value={formData.walletAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type="text"
                name="xHandle"
                placeholder="X handle"
                className="adminInput w-full text-white"
                value={formData.xHandle}
                onChange={handleInputChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">X</span>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                name="telegramHandle"
                placeholder="Telegram handle"
                className="adminInput w-full text-white"
                value={formData.telegramHandle}
                onChange={handleInputChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✈️</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm mb-2">Profile Picture</p>
              <label className="block w-full aspect-video bg-gray-800/80 border border-gray-700 rounded-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {formData.profileImage ? (
                    <img
                      src={
                        URL.createObjectURL(formData.profileImage) ||
                        "/placeholder.svg"
                      }
                      alt="Profile Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gray-600 rounded-md mb-2 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-sm">
                        Upload Image
                      </span>
                    </>
                  )}
                </div>
              </label>
            </div>

            <div className="mt-6">
              <p className="text-sm mb-1">Select chains</p>
              <p className="text-xs text-gray-400 mb-3">
                You can select multiple chains if they operate using the same
                wallet across EVM.
              </p>

              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    selectedChains.includes("BNB")
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() => toggleChain("BNB")}
                >
                  <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-xs">
                    ₿
                  </div>
                  BNB
                </button>

                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    selectedChains.includes("ETH")
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() => toggleChain("ETH")}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs">
                    Ξ
                  </div>
                  ETH
                </button>

                <button
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                    selectedChains.includes("BASE")
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                  onClick={() => toggleChain("BASE")}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                  BASE
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gray-600 text-white font-medium hover:bg-gray-500 transition-colors mt-6"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
