import React, { useState } from "react";
import { abi } from "./anotherABI";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";

const DepositUSDT = () => {
  const { address } = useAccount();

  const [depositTokenQuantity, setDepositTokenQuantity] = useState<string>("");

  const USDTcontractAddress = "0x4721468CF9DcA7e79a66508D9d9588e85B26eA2b";
  const USDTTokenStoreContractAddress =
    "0xEb5075AE5d8Ff0a22f41aC8F4E9f3D72170b9ce7";

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ethToWei = ethers.parseUnits(depositTokenQuantity, 18);

    writeContract({
      address: USDTTokenStoreContractAddress,
      abi,
      functionName: "deposit",
      args: [USDTcontractAddress, ethToWei],
    });
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          name="tokenId"
          placeholder="69420"
          onChange={(e) => setDepositTokenQuantity(e.target.value)}
        />
        <button type="submit">Deposit</button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </div>
  );
};

export default DepositUSDT;