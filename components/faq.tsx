"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// FAQ data stored in an array of objects
const faqItems: FaqItem[] = [
  {
    id: "what-is-oxscan",
    question: "What is Oxscan?",
    answer:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, just",
  },
  {
    id: "is-oxscan-free",
    question: "Is Oxscan free to use?",
    answer:
      "Oxscan offers both free and premium tiers. The free tier gives you access to basic tracking features, while the premium subscription unlocks advanced analytics, real-time alerts, and unlimited wallet tracking capabilities.",
  },
  {
    id: "track-non-kol-1",
    question: "Can I track non KOL wallets?",
    answer:
      "Yes, Oxscan allows you to track any public wallet address on supported blockchains. You can monitor transactions, holdings, and trading activity regardless of whether the wallet belongs to a known entity or not.",
  },
  {
    id: "wallet-leaderboard",
    question: "How do I get my wallet on the leaderboard?",
    answer:
      "Leaderboards are based on performance metrics like profit percentage, successful trades, and portfolio growth. Consistently perform well with your trading strategy, and your wallet may qualify for our leaderboards.",
  },
  {
    id: "track-non-kol-2",
    question: "Can I track non KOL wallets?",
    answer:
      "Yes, Oxscan allows you to track any public wallet address on supported blockchains. You can monitor transactions, holdings, and trading activity regardless of whether the wallet belongs to a known entity or not.",
  },
];

const FaqAccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  toggleAccordion: () => void;
}> = ({ item, isOpen, toggleAccordion }) => {
  return (
    <div className="border border-white/20 rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-medium">{item.question}</span>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 text-gray-400">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

export const FaqSection: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<string>("what-is-oxscan");

  const toggleAccordion = (itemId: string) => {
    setOpenItemId(openItemId === itemId ? "" : itemId);
  };

  return (
    <div className=" text-white  mt-[134px]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">FAQ</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa.
        </p>

        <div className="mt-8">
          {faqItems.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              toggleAccordion={() => toggleAccordion(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
