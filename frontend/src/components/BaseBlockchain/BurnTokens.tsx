import React, { useState } from "react";
import { abi } from "./abi";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";

const BurnTokens = () => {
  const { address } = useAccount();

  const [tokenQuantity, setTokenQuantity] = useState<string>("");

  const BUSDTcontractAddress = "0x0D5809846D1cA42Fa361E91399F770CB0a4824ED";

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ethToWei = ethers.parseUnits(tokenQuantity, 18);

    writeContract({
      address: BUSDTcontractAddress,
      abi,
      functionName: "burn",
      args: [ethToWei],
    });
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          name="tokenId"
          placeholder="69420"
          onChange={(e) => setTokenQuantity(e.target.value)}
        />
        <button type="submit">Burn Tokens</button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </div>
  );
};

export default BurnTokens;