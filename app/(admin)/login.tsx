"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    router.push("/admin/dashboard");
  };

  return (
    <div className=" text-white flex flex-col">
      <div className="w-full inset-0  bgg2 z-0 h-[191px] flex items-center justify-center">
        <h1 className="font-aktiv-bold font-bold text-[63px]">ADMIN</h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-start lg:mt-[69px] mt-[40px] relative">
        <div className="z-10 w-full max-w-md px-4">
          <h2 className="text-2xl mb-8 text-center font-medium text-[35px] font-aktiv-medium">
            Sign in
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="adminInput w-full text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="adminInput w-full text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#FFD238] text-black font-medium hover:bg-[#ffca38] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
