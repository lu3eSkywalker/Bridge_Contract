import React, { useEffect, useState } from "react";
import { useSwitchChain } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config2";
import { getChainId } from "@wagmi/core";

const client = new QueryClient();

const SwitchChainToBase = () => {
  const { switchChain } = useSwitchChain();

  const [isBaseSepolia, setIsBaseSepolia] = useState(false);

  useEffect(() => {
    getCurrentChainId();
  }, []);

  function getCurrentChainId() {
    try {
      const chainId = getChainId(config);
      console.log("This is the Chain Id: ", chainId);
      if (chainId === 84532) {
        setIsBaseSepolia(true);
      } else {
        setIsBaseSepolia(false);
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
            {!isBaseSepolia ? (
              <div>
                <button
                  className="btn btn-active btn-primary text-sm font-bold my-1"
                  onClick={() => {
                    switchChain({ chainId: 84532 });
                    window.location.reload();
                  }}
                >
                  Switch to Base Sepolia
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

export default SwitchChainToBase;