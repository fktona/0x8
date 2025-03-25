import TradeComponents from "./_components/trade";
import { getAllUsersTransactions } from "../actions/action";

async function Trade() {
  try {
    // const allTransactions = await getAllUsersTransactions();
    return (
      <div className="w-full  lg:px-[40px] min-h-svh">
        <TradeComponents />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    return [];
  }
}

export default Trade;
