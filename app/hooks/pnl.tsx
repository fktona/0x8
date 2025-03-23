import { useState, useEffect, useRef } from "react";
import { getUserPnl } from "../actions/action";

const fetchTokenPnlBatch = async ({
  wallet,
  chain,
  addresses,
}: {
  wallet: string;
  chain: string;
  addresses: string[];
}) => {
  try {
    const pnlData = await getUserPnl({
      wallet,
      chain,
      tokens: addresses, // Send batch of at most 3 tokens
    });

    return addresses.reduce((acc, address, index) => {
      acc[address] = pnlData[index]; // Map results back to their respective addresses
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error("Error fetching token PNL:", error);
    return {};
  }
};

const useTokenPnlFetcher = ({
  wallet,
  chain,
  addresses,
}: {
  wallet: string;
  chain: string;
  addresses: string[];
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>>({});
  const fetchedAddressesRef = useRef(new Set<string>());

  useEffect(() => {
    if (!addresses.length) return;

    const newAddresses = addresses.filter(
      (address) => !fetchedAddressesRef.current.has(address)
    );

    if (newAddresses.length === 0) return;

    let isMounted = true;
    setLoading(true); // Start loading

    const fetchBatches = async () => {
      const batchSize = 3;

      for (let i = 0; i < newAddresses.length; i += batchSize) {
        if (!isMounted) return; // Prevent state updates if unmounted

        const batch = newAddresses.slice(i, i + batchSize);
        const batchResults = await fetchTokenPnlBatch({
          wallet,
          chain,
          addresses: batch,
        });

        if (isMounted) {
          setData((prev) => ({ ...prev, ...batchResults })); // Merge batch results
          batch.forEach((addr) => fetchedAddressesRef.current.add(addr));
        }
      }

      if (isMounted) setLoading(false); // Stop loading when done
    };

    fetchBatches();

    return () => {
      isMounted = false; // Cleanup to prevent state updates after unmount
    };
  }, [addresses, wallet, chain]);

  return { loading, data, fetchedAddresses: fetchedAddressesRef.current };
};

export default useTokenPnlFetcher;
