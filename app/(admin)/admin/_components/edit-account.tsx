"use client";

import type React from "react";

import { useState, useRef, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import {
  AccountTypes,
  EditAccount,
  type AccountFormState,
} from "@/app/actions/action";
import { ArrowLeft, Loader2 } from "lucide-react";

// Submit Button with loading state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-full bg-gray-600 text-white font-medium hover:bg-gray-500 transition-colors mt-6 flex items-center justify-center"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Editing...
        </>
      ) : (
        "Edit"
      )}
    </button>
  );
}

export default function EditAccountPage({
  account,
}: {
  account: AccountTypes;
}) {
  const router = useRouter();
  const [selectedChains, setSelectedChains] = useState<string[]>(
    account?.chains || []
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(
    account?.imageUrl || null
  );
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: AccountFormState = {};
  const [state, formAction] = useActionState(EditAccount, initialState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // Effect to redirect on success
  useEffect(() => {
    if (state.success) {
      // Wait a moment to show success message before redirecting
      const timer = setTimeout(() => {
        router.push("/admin");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  const toggleChain = (chain: string) => {
    if (selectedChains.includes(chain)) {
      setSelectedChains(selectedChains.filter((c) => c !== chain));
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };

  return (
    <div className="text-white flex flex-col lg:px-[80px] px-5">
      <button
        className="flex items-center gap-2 text-lg"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {/* Main Content */}

      <div className="flex-grow flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          <h1 className="text-[24px] lg:text-[38px] font-bold font-aktiv-bold text-center mb-10">
            Edit Account
          </h1>

          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="adminInput w-full text-white"
                aria-describedby="name-error"
                defaultValue={account?.name}
              />
              {state.errors?.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {state.errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="wallet"
                placeholder="Wallet Address"
                className="adminInput w-full text-white"
                aria-describedby="wallet-error"
                defaultValue={account?.wallet}
              />
              {state.errors?.wallet && (
                <p id="wallet-error" className="text-red-500 text-sm mt-1">
                  {state.errors.wallet}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="twitter"
                placeholder="X handle"
                className="adminInput w-full text-white"
                defaultValue={account?.twitter}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <mask
                    id="mask0_120_33114"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_120_33114)">
                    <path
                      d="M11.025 0.65625H13.172L8.482 6.03025L14 13.3442H9.68L6.294 8.90925L2.424 13.3442H0.275L5.291 7.59425L0 0.65725H4.43L7.486 4.71025L11.025 0.65625ZM10.27 12.0562H11.46L3.78 1.87725H2.504L10.27 12.0562Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                name="telegram"
                placeholder="Telegram handle"
                className="adminInput w-full text-white"
                defaultValue={account?.telegram}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8081 12.503V12.5015L12.8212 12.4703L15 1.48543V1.45055C15 1.17666 14.8983 0.937636 14.6789 0.794513C14.4864 0.668826 14.2648 0.660108 14.1093 0.671732C13.9646 0.684935 13.8218 0.714174 13.6836 0.758913C13.6246 0.777737 13.5664 0.799068 13.5092 0.822847L13.4998 0.826479L1.35245 5.59168L1.34882 5.59313C1.3116 5.60497 1.2754 5.61979 1.24057 5.63745C1.15422 5.67636 1.07135 5.72254 0.992826 5.77549C0.836625 5.88301 0.539481 6.13584 0.589611 6.53687C0.631022 6.86962 0.859874 7.0803 1.01462 7.19001C1.10576 7.25435 1.204 7.30798 1.30741 7.34984L1.33065 7.36001L1.33792 7.36219L1.343 7.36437L3.46878 8.07999C3.46103 8.21367 3.47484 8.34807 3.51019 8.4832L4.57454 12.5219C4.63268 12.742 4.75832 12.9384 4.93381 13.0835C5.1093 13.2286 5.32583 13.3151 5.55299 13.3308C5.78014 13.3465 6.00651 13.2907 6.2003 13.1711C6.3941 13.0516 6.54558 12.8743 6.63347 12.6643L8.29574 10.8872L11.1502 13.0755L11.1909 13.0929C11.4503 13.2063 11.6922 13.2419 11.9138 13.2121C12.1354 13.1816 12.3112 13.0886 12.4434 12.9832C12.5964 12.8593 12.7183 12.7013 12.7994 12.5219L12.8052 12.5095L12.8074 12.5052L12.8081 12.503ZM4.56364 8.20567C4.55185 8.16086 4.55465 8.11346 4.57164 8.07035C4.58862 8.02724 4.6189 7.99066 4.65808 7.96592L11.8658 3.38889C11.8658 3.38889 12.2901 3.13098 12.2748 3.38889C12.2748 3.38889 12.3504 3.43394 12.123 3.64535C11.908 3.84659 6.98583 8.59872 6.48744 9.07967C6.4604 9.10708 6.44109 9.14118 6.4315 9.17847L5.62798 12.2444L4.56364 8.20567Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm mb-2">Profile Picture</p>
              <label className="block w-full aspect-video bg-white/10 border border-[#333] rounded-[28px] cursor-pointer">
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {account.imageUrl && (
                  <input
                    type="text"
                    name="defaultImageUrl"
                    value={account.imageUrl}
                    className="hidden"
                  />
                )}
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-[127px] h-[127px] mb-2 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="127"
                          height="128"
                          viewBox="0 0 127 128"
                          fill="none"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M38.4602 25.1488C55.1241 23.7017 71.882 23.7017 88.5458 25.1488L96.5363 25.8473C100.25 26.1726 103.747 27.7376 106.465 30.2906C109.182 32.8437 110.961 36.2364 111.517 39.9232C113.917 55.8848 113.917 72.1157 111.517 88.0773C111.302 89.4779 110.928 90.8078 110.395 92.0673C110.046 92.898 108.966 93.025 108.353 92.3583L84.9581 66.6196C84.4408 66.0506 83.7692 65.6442 83.0252 65.4497C82.2812 65.2553 81.4967 65.2812 80.7671 65.5243L67.3739 69.9904L47.9482 48.1358C47.5889 47.7316 47.1507 47.405 46.6606 47.1762C46.1705 46.9474 45.6388 46.8212 45.0981 46.8053C44.5575 46.7895 44.0193 46.8843 43.5166 47.084C43.0139 47.2836 42.5574 47.584 42.175 47.9665L16.1717 73.9698C15.9951 74.1513 15.7693 74.2774 15.522 74.3325C15.2748 74.3877 15.0168 74.3695 14.7797 74.2802C14.5427 74.1908 14.3368 74.0343 14.1874 73.8297C14.038 73.6251 13.9516 73.3814 13.9386 73.1284C13.3129 62.0345 13.8306 50.9057 15.4838 39.9179C16.0395 36.2311 17.8191 32.8384 20.5363 30.2853C23.2534 27.7323 26.7503 26.1673 30.4645 25.842L38.4602 25.1488ZM74.0837 48.1252C74.0837 46.0201 74.92 44.0012 76.4086 42.5126C77.8971 41.024 79.9161 40.1877 82.0212 40.1877C84.1264 40.1877 86.1453 41.024 87.6339 42.5126C89.1225 44.0012 89.9587 46.0201 89.9587 48.1252C89.9587 50.2304 89.1225 52.2493 87.6339 53.7379C86.1453 55.2265 84.1264 56.0627 82.0212 56.0627C79.9161 56.0627 77.8971 55.2265 76.4086 53.7379C74.92 52.2493 74.0837 50.2304 74.0837 48.1252Z"
                              fill="white"
                            />
                            <path
                              d="M15.6689 85.6958C15.526 85.8401 15.4183 86.0155 15.354 86.2082C15.2898 86.4009 15.2708 86.6058 15.2985 86.807L15.4837 88.077C16.0394 91.7638 17.819 95.1565 20.5362 97.7096C23.2533 100.263 26.7502 101.828 30.4644 102.153L38.4548 102.846C55.1236 104.296 71.877 104.296 88.5458 102.846L96.5362 102.153C98.7284 101.967 100.861 101.343 102.807 100.317C103.532 99.941 103.653 98.9832 103.103 98.3799L81.4073 74.5145C81.235 74.3229 81.0106 74.1858 80.7614 74.12C80.5123 74.0542 80.2494 74.0625 80.005 74.1441L67.4003 78.3457C66.6633 78.5917 65.8704 78.6161 65.1198 78.4157C64.3691 78.2154 63.6938 77.7991 63.1775 77.2185L45.7415 57.6023C45.6214 57.4675 45.4751 57.3587 45.3114 57.2826C45.1478 57.2065 44.9702 57.1646 44.7898 57.1597C44.6094 57.1547 44.4298 57.1867 44.2623 57.2538C44.0947 57.3208 43.9426 57.4214 43.8153 57.5494L15.6689 85.6958Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      </div>
                      <span className="text-white/40 text-sm">
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
                  className={`px-[9px] py-[10px] rounded-[10px] text-sm flex items-center gap-1 ${
                    selectedChains.includes("bsc")
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => toggleChain("bsc")}
                >
                  <Image
                    src={"/bnb.svg"}
                    alt={"BNB"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  BNB
                </button>

                <button
                  type="button"
                  className={`px-[9px] py-[10px] rounded-[10px] text-sm flex items-center gap-1 ${
                    selectedChains.includes("eth")
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => toggleChain("eth")}
                >
                  <Image
                    src={"/eth.svg"}
                    alt={"ETH"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  ETH
                </button>

                <button
                  type="button"
                  className={`px-[9px] py-[10px] rounded-[10px] text-sm flex items-center gap-1 ${
                    selectedChains.includes("base")
                      ? "bg-white text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => toggleChain("base")}
                >
                  <Image
                    src={"/base.svg"}
                    alt={"BASE"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  BASE
                </button>
              </div>

              {/* Hidden input to store selected chains */}
              <input
                type="hidden"
                name="chains"
                value={JSON.stringify(selectedChains)}
              />
            </div>

            {state.errors?._form && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{state.errors._form}</span>
              </div>
            )}

            {state.success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{state.message}</span>
              </div>
            )}

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
