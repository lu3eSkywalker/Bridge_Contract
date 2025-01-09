import React, { useEffect, useState } from "react";
import { config } from "../config2";
import { getChainId } from "@wagmi/core";
import { useAccount, useSwitchChain } from "wagmi";

const CurrentChain = () => {
  const [chainName, setChainName] = useState<string>("");
  const { isConnected } = useAccount();

  const { chains } = useSwitchChain();

  function getCurrentChainId() {
    try {
      const chainId = getChainId(config);
      console.log("This is the Chain Id: ", chainId);

      const currentChainName =
        chains.find((chain) => chain.id === chainId) || {name: ""};
      console.log(currentChainName.name);
      setChainName(currentChainName.name);
    } catch (error) {
      console.error("Error fetching chain ID:", error);
    }
  }

  useEffect(() => {
    if (isConnected) {
      getCurrentChainId();
    } else {
      console.log("It is not connected");
    }
  }, []);

  return (
    <div className="flex justify-end">
      <div>
        <div>
          {chainName ? (
            <div className="text-sm font-bold text-white text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg w-[200px] p-1">
              Connected To {chainName}
            </div>
          ) : (
            <div className="text-sm font-bold text-white text-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg w-[200px] p-1">
              Not Connected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentChain;