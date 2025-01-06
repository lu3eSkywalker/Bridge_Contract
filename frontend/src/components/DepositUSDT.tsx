import React from 'react';
import { abi } from '../anotherABI';
import { useAccount, useWriteContract } from 'wagmi';

const DepositUSDT = () => {
    const { address } = useAccount();

    const USDTcontractAddress = "0x4721468CF9DcA7e79a66508D9d9588e85B26eA2b";
    const USDTTokenStoreContractAddress = "0xEb5075AE5d8Ff0a22f41aC8F4E9f3D72170b9ce7";

    const { data: hash, writeContract } = useWriteContract();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        writeContract({
            address: USDTTokenStoreContractAddress,
            abi,
            functionName: 'deposit',
            args: [USDTcontractAddress, 5 * 10 ** 18]
        })
    }

  return (
    <div>
        <form onSubmit={submit}>
            <input name='tokenId' placeholder='69420' />
            <button type='submit'>Deposit</button>
            {hash && <div>Transaction Hash: {hash}</div>}
        </form>
    </div>
  )
}

export default DepositUSDT;