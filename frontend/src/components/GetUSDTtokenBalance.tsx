import React from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { abi } from '../abi';

const GetUSDTtokenBalance = () => {
    const { address } = useAccount();

    const USDTcontractAddress = "0x4721468CF9DcA7e79a66508D9d9588e85B26eA2b";

    const { data, isLoading, error } = useReadContract({
        address: USDTcontractAddress,
        abi,
        functionName: "balanceOf",
        args: [address]
    })

    console.log("This is the data: ", data);
  return (
    <div>

    </div>
  )
}

export default GetUSDTtokenBalance;