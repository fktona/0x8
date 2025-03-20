import type React from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";

// Define the type for our feature cards
interface FeatureCard {
  id: string;
  title: string;
  description: string;
  backgroundClass: string;
  hasImage?: boolean;
  imageUrl?: string;
}

const featureCards: FeatureCard[] = [
  {
    id: "track-trades",
    title: "Track Trades from Leading Wallets",
    description:
      "Gain a competitive edge by monitoring real-time trades from the most successful and influential wallets to make smarter investment decisions.",
    backgroundClass: "bg-black",
  },
  {
    id: "explore-tokens",
    title: "Explore Fresh and Trending Tokens",
    description:
      "Uncover the latest tokens gaining momentum and stay ahead of emerging market opportunities before they go mainstream.",
    backgroundClass:
      "bg-gradient-to-b from-purple-900 via-pink-800 to-amber-500",
    hasImage: true,
    imageUrl: "/bt-md.svg",
  },
  {
    id: "examine-wallets",
    title: "Examine Top Performing Wallets",
    description:
      "Dive into the strategies of high-performing wallets to uncover insights, track winning moves, and refine your own trading approach.",
    backgroundClass: "bg-black",
  },
];

export const TraderPlatform: React.FC = () => {
  return (
    <div className=" text-white lg:mt-[100px] mt-[60px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 pr-[95px] md:pr-0">
        <div>
          <h1 className="lg:text-[60px] text-[36px] leading-[54px] md:text-5xl font-bold mb-2">
            Built for trader
          </h1>
          <p className=" font-light  max-w-md lg:text-[18px] text-white/80 text-[12px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa.
          </p>
        </div>
        <button className="bg-white hidden md:block text-black px-6 lg:px-[58px] lg:py-[21px] py-2 text-[16px] rounded-full font-medium hover:bg-gray-200 transition-colors">
          Explore
        </button>
      </div>

      <div className="flex  justify-center  items-center flex-col max-w-screen-2xl mx-auto lg:flex-row gap-[33px]">
        {featureCards.map((card) => (
          <div
            key={card.id}
            className={cn(
              " h-[605px] relative rounded-[12px]  border border-[#333333]  flex flex-col max-w-[430px] mx-auto  overflow-hidden",
              card.imageUrl && "bgg"
            )}
          >
            {card.imageUrl && (
              <Image
                src={card.imageUrl}
                alt={card.title}
                width={600}
                height={600}
                className="w-full max-h-[40%]  absolute bottom-0 -right-[20%]"
              />
            )}
            <div className="z-10 p-6 lg:pr-[120px] pr-[110px]">
              <h2 className="lg:text-[30px] text-[24px]  font-bold mb-4">
                {card.title}
              </h2>
              <p className="lg:text-[20px] text-[16px] tracking-[22%] font-aktiv-regular font-light leading-[100%] text-white/80">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraderPlatform;
