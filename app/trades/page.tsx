import React from "react";
import TradeComponents from "./_components/trade";
import { getAllUsersTransactions } from "../actions/action";

async function Trade() {
  try {
    // Fetch transactions using server-side rendering
    const allTransactions = await getAllUsersTransactions();
    return <TradeComponents allTransactions={allTransactions} />;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    return [];
  }
}

export default Trade;
