import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { abi } from "./EthererumBlockchain/anotherABI";
import DepositUSDT from '@/components/EthererumBlockchain/DepositUSDT';

const DepositUSDTDesign = () => {
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
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex">
        <div className="w-[700px] h-[500px] bg-slate-400 rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="my-[100px] ">
              <form onSubmit={submit}>
                <input
                  name="tokenId"
                  placeholder="Enter USDT Amount"
                  className="mx-2 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm transition duration-200 ease-in-out text-xl"
                  onChange={(e) => setDepositTokenQuantity(e.target.value)}
                />

                <button className="btn btn-info text-xl" type="submit">
                  DepositUSDT
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="mt-[70px] mx-[100px]">
              <div className="text-white font-medium bg-slate-400 rounded-xl w-[600px] h-[130px]">
                <ul className="steps">
                  <li className="step step-secondary">
                    <a
                      className="text-white hover:text-pink-400"
                      href="./approveusdt"
                    >
                      <p className="font-black text-black text-xl px-3">
                        Approve Token
                      </p>
                    </a>
                  </li>
                  <li className="step step-primary">
                    <a
                      className="text-white hover:text-pink-400"
                      href="./usdtdeposit"
                    >
                      <p className="font-black text-black text-xl px-3">
                        Deposit USDT
                      </p>
                    </a>
                  </li>
                  <li className="step step-success">
                    <a
                      className="text-white hover:text-pink-400"
                      href="./burnusdtdesign"
                    >
                      <p className="font-black text-black text-xl px-3">
                        Burn BUSDT
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[700px] h-[500px] flex flex-col justify-center items-center bg-zinc-300 rounded-lg shadow-lg ml-8">
          <p className="text-4xl font-bold">
            Deposit USDT to Sepolia To get BUSDT
          </p>
          <p className="text-4xl font-bold">on BASE Sepolia</p>
        </div>
      </div>
    </div>
  );
};

export default DepositUSDTDesign;
