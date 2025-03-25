"use client";

import type React from "react";

import { useState } from "react";

interface AddAccountModalProps {
  onClose: () => void;
  onAdd: (account: any) => void;
}

export default function AddAccountModal({
  onClose,
  onAdd,
}: AddAccountModalProps) {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      walletAddress,
      platforms,
      tokens,
    });
  };

  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const toggleToken = (token: string) => {
    if (tokens.includes(token)) {
      setTokens(tokens.filter((t) => t !== token));
    } else {
      setTokens([...tokens, token]);
    }
  };

  return (
    <div className="fixed inset-0 /80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-6">Add New Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Platforms</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={platforms.includes("x")}
                  onChange={() => togglePlatform("x")}
                  className="rounded bg-gray-800"
                />
                <span>X (Twitter)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={platforms.includes("telegram")}
                  onChange={() => togglePlatform("telegram")}
                  className="rounded bg-gray-800"
                />
                <span>Telegram</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tokens</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tokens.includes("bnb")}
                  onChange={() => toggleToken("bnb")}
                  className="rounded bg-gray-800"
                />
                <span>BNB</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tokens.includes("eth")}
                  onChange={() => toggleToken("eth")}
                  className="rounded bg-gray-800"
                />
                <span>ETH</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tokens.includes("base")}
                  onChange={() => toggleToken("base")}
                  className="rounded bg-gray-800"
                />
                <span>BASE</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-800 text-white"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-yellow-400 text-black font-medium"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
