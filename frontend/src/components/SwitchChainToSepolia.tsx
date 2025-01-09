import React, { useEffect, useState } from "react";
import { useSwitchChain } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config2";
import { getChainId } from "@wagmi/core";

const client = new QueryClient();

const SwitchChainToSepolia = () => {
  const { switchChain } = useSwitchChain();

  const [isSepolia, setIsSepolia] = useState(false);

  useEffect(() => {
    getCurrentChainId();
  }, []);

  function getCurrentChainId() {
    try {
      const chainId = getChainId(config);
      console.log("This is the Chain Id: ", chainId);
      if (chainId === 11155111) {
        setIsSepolia(true);
      } else {
        setIsSepolia(false);
      }
    } catch (error) {
      console.error("Error fetching chain ID:", error);
    }
  }

  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <div>
            {!isSepolia ? (
              <div>
                <button
                  className="btn btn-active btn-primary text-sm font-bold my-1"
                  onClick={() => {
                    switchChain({ chainId: 11155111 });
                    window.location.reload();
                  }}
                >
                  Switch to Sepolia
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default SwitchChainToSepolia;