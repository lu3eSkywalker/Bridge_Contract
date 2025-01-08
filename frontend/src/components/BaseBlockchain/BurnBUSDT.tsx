import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { abi } from "./abi";
import SwitchChain from "@/pages/switchchain";
import ConnectToWalletButton from "../ConnectToWalletButton";

const BurnBUSDT = () => {
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
      <div className="flex justify-end bg-gray-900 py-[10px] px-[15px]">
        <ConnectToWalletButton />
      </div>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex">
          <div className="w-[700px] h-[500px] bg-slate-400 rounded-lg shadow-lg">
            <div className="flex justify-end mx-2">
                <SwitchChain />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="my-[80px] ">
                <form onSubmit={submit}>
                  <input
                    name="tokenId"
                    placeholder="Enter USDT Amount"
                    className="mx-2 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm transition duration-200 ease-in-out text-xl"
                    onChange={(e) => setTokenQuantity(e.target.value)}
                  />

                  <button className="btn btn-info text-xl" type="submit">
                    Burn BUSDT
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
                        href="./burnbusdt"
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
            <p className="text-4xl font-bold">Burn BUSDT on Base Sepolia to get</p>
            <p className="text-4xl font-bold">USDT unlocked on Sepolia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnBUSDT;