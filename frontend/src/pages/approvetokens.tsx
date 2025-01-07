import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepoliaConfig } from "../config";
import ApproveTokens from "@/components/EthererumBlockchain/ApproveTokens";

const client = new QueryClient();

const approvetokens = () => {
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
          <ApproveTokens />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default approvetokens;