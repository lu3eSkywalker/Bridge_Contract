import DepositUSDT from "@/components/EthererumBlockchain/DepositUSDT";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepoliaConfig } from "../config";

const client = new QueryClient();

const depositUSDT = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <WagmiProvider config={sepoliaConfig}>
        <QueryClientProvider client={client}>
          <DepositUSDT />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default depositUSDT;