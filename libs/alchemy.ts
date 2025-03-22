//@ts-nocheck

import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";
import Moralis from "moralis";
import { ethers } from "ethers";

// Initialize Alchemy SDK
const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

async function getTokenPrice(contractAddress: string) {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=usd&include_market_cap=true`;
    const response = await fetch(url);
    const data = await response.json();

    if (data[contractAddress.toLowerCase()]) {
      return {
        price: data[contractAddress.toLowerCase()].usd,
        marketCap: data[contractAddress.toLowerCase()].usd_market_cap,
      };
    }
  } catch (error) {
    console.error(`Error fetching token price for ${contractAddress}:`, error);
  }
  return { price: null, marketCap: null };
}

// Function to fetch token metadata
async function getTokenMetadata(contractAddress: string) {
  try {
    return await alchemy.core.getTokenMetadata(contractAddress);
  } catch (error) {
    console.error(
      `Error fetching token metadata for ${contractAddress}:`,
      error
    );
    return null;
  }
}

// Function to fetch wallet transactions and detect tokens
export async function fetchWalletTransactions(address: string) {
  try {
    // Fetch sent and received transactions
    const [sentTxs, receivedTxs] = await Promise.all([
      alchemy.core.getAssetTransfers({
        fromAddress: address,
        category: [
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
        ],
        maxCount: 2,
      }),
      alchemy.core.getAssetTransfers({
        toAddress: address,
        category: [
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
        ],
        maxCount: 2,
      }),
    ]);

    console.log("Sent transactions:", sentTxs);

    // Helper function to format transactions
    const formatTransaction = (tx, direction: "in" | "out") => ({
      ori: tx,
      hash: tx.hash || "",
      from: tx.from,
      to: tx.to || "",
      tokenAddress: tx.rawContract || null,
      tokenSymbol: tx.asset || "ETH",
      timestamp: tx.metadata?.blockTimestamp
        ? new Date(tx.metadata.blockTimestamp).getTime()
        : null,
      direction,
    });

    // Process transactions
    const sentTransactions = sentTxs.transfers.map((tx) =>
      formatTransaction(tx, "out")
    );
    const receivedTransactions = receivedTxs.transfers.map((tx) =>
      formatTransaction(tx, "in")
    );

    const allTransactions = [...sentTransactions, ...receivedTransactions].sort(
      (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0)
    );

    // Fetch transaction details (logs, gas, etc.)
    const fetchTxDetails = async (tx) => {
      try {
        const receipt = await alchemy.core.getTransaction(tx.hash);

        let tokenSymbol;
        let tokenPriceData;
        if (tx.tokenAddress.address) {
          const tokenMetadata = await getTokenMetadata(tx.tokenAddress.address);
          tokenPriceData = await getTokenPrice(tx.tokenAddress.address);

          tokenSymbol = tokenMetadata || null;
        } else {
          tokenSymbol = null;
        }

        return {
          ...tx,
          tokenSymbol,
          receipt,
          tokenPriceData,

          value: receipt?.value._hex
            ? (BigInt(receipt?.value._hex) / BigInt(1e18)).toString()
            : "0",
        };
      } catch (error) {
        console.error(
          `Error fetching details for transaction ${tx.hash}:`,
          error
        );
        return { ...tx, status: "error" };
      }
    };

    // Fetch all transaction details in parallel
    const detailedTransactions = await Promise.all(
      allTransactions.map((tx) => fetchTxDetails(tx))
    );
    const data = detailedTransactions.filter((tx) => tx.tokenSymbol);
    return data;
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    return [];
  }
}

// Wallet address to check
await Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImIwMWE1OWE3LTgzMzktNDRiZi04ZTMzLTJkYzNhMTZiNjBhZSIsIm9yZ0lkIjoiNDI0MDUzIiwidXNlcklkIjoiNDM2MTI3IiwidHlwZUlkIjoiOTI4NzU3OWQtZWQ4Yy00ZWYzLWE3MDctNTkyODUyNzUwZjAzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzU5OTI0NzAsImV4cCI6NDg5MTc1MjQ3MH0.slOOGTxdv6yr3sAwWRFTXC69Br68-2_IdV1PWIlPVSc",
});

// Wallet address to check

export async function getTokenBalancesInUSD({
  walletAddress,
  chain,
}: {
  walletAddress: string;
  chain: string;
}) {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: "0x1",
      include: "percent_change",
      address: "0xae2fc483527b8ef99eb5d9b44875f005ba1fae13",
    });

    console.log(response.raw);

    return response.raw;
  } catch (e) {
    console.error(e);
  }
}

interface TokenPnl {
  wallet: string;
  tokenAddresses: string[];
  chain: "eth" | "bsc" | "base" | string;
}

export const getTokenPnl = async ({
  tokenAddresses,
  chain,
  wallet,
}: TokenPnl) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/${wallet}/tokens-pnl?chain=${chain}&token=${tokenAddresses}`,
      {
        method: "GET",
        next: {
          tags: ["admin"],
        },
      }
    );
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
