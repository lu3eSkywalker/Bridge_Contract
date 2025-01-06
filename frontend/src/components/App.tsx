import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
} from "wagmi";
import { config } from "../config";
import ConnectToWallet from "./ConnectToWallet";
import GetUSDTtokenBalance from "./GetUSDTtokenBalance";
import DepositUSDT from "./DepositUSDT";
import ApproveTokens from "./ApproveTokens";

const client = new QueryClient();

function App() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectToWallet />
        <GetUSDTtokenBalance />
        <ApproveTokens />
        <DepositUSDT />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;