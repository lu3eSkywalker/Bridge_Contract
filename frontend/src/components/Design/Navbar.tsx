import { useRouter } from "next/router";
import React from "react";
import ConnectToWalletButton from "../ConnectToWalletButton";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-800">
      <div className="relative flex h-[130px] items-center justify-between px-6">
        <div className="flex items-center">
          <button onClick={() => router.push("/walkthrough")}>
            <p className="text-4xl font-bold text-indigo-300 tracking-wide hover:text-indigo-400 transition duration-300 ease-in-out">
              Ethereum-Base Bridge
            </p>
          </button>
        </div>

        <div className="flex space-x-4 ml-auto">
          <ConnectToWalletButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;