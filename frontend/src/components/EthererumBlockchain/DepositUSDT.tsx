import React, { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { abi } from "./anotherABI";
import CurrentChain from "../CurrentChain";
import Navbar from "../Design/Navbar";
import SwitchChainToSepolia from "../SwitchChainToSepolia";

const DepositUSDT = () => {
  const [depositTokenQuantity, setDepositTokenQuantity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenDeposited, setTokenDeposited] = useState<boolean>(false);

  const USDTcontractAddress = "0x4721468CF9DcA7e79a66508D9d9588e85B26eA2b";
  const USDTTokenStoreContractAddress =
    "0xC3518a469Ac65Fc9623713C85a6Eb81878f9190a";

  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ethToWei = ethers.parseUnits(depositTokenQuantity, 18);

    setIsLoading(true);

    writeContract({
      address: USDTTokenStoreContractAddress,
      abi,
      functionName: "deposit",
      args: [USDTcontractAddress, ethToWei],
    });
  }

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

  async function getTransactionStatus(hash: string | undefined) {
    try {
      if (hash === undefined) {
        return;
      }

      const ifTransactionIsPending = await provider.getTransaction(hash);
      console.log(ifTransactionIsPending);

      if (!ifTransactionIsPending || ifTransactionIsPending?.blockHash === null) {
        console.log("Transaction is pending");
        setTimeout(() => getTransactionStatus(hash), 2000);
        console.log("Calling the transaction Again");
        return;
      }

      const receipt = await provider.getTransactionReceipt(hash);

      console.log("This is the receipt: ", receipt);

      if (receipt?.status === 1) {
        setTokenDeposited(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transaction status:", error);
    }
  }

  useEffect(() => {
    getTransactionStatus(hash);
  }, [hash]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex justify-end bg-gray-900 py-[10px] px-[15px]">
        <CurrentChain />
      </div>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center mt-[-60px]">
        <div className="flex">
          <div className="w-[700px] h-[450px] bg-slate-400 rounded-lg shadow-lg">
            <div className="flex justify-end mx-2">
              <SwitchChainToSepolia />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="my-[80px] ">
                <form onSubmit={submit} className="flex items-center">
                  <input
                    name="tokenId"
                    placeholder="Enter USDT Amount"
                    className="mx-2 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm transition duration-200 ease-in-out text-xl"
                    onChange={(e) => setDepositTokenQuantity(e.target.value)}
                  />

                  <button className="btn btn-info text-xl" type="submit">
                    DepositUSDT
                  </button>

                  <div className="flex items-center ml-4">
                    {tokenDeposited ? (
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-success mx-2 my-[-7px]"
                      />
                    ) : (
                      <div></div>
                    )}

                    {isLoading ? (
                      <span className="loading loading-spinner text-primary ml-4"></span>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div className="mt-[10px] mx-[100px]">
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

          <div className="w-[700px] h-[450px] flex flex-col justify-center items-center bg-zinc-300 rounded-lg shadow-lg ml-8">
            <p className="text-4xl font-bold">
              Deposit USDT to Sepolia To get BUSDT
            </p>
            <p className="text-4xl font-bold">on BASE Sepolia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositUSDT;
