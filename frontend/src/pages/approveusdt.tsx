import ConnectToWallet from '@/components/ConnectToWallet'
import ConnectToWalletButton from '@/components/ConnectToWalletButton'
import ApproveUSDT from '@/components/EthererumBlockchain/ApproveUSDT'
import { ConnectKitButton } from 'connectkit'
import React from 'react'

const approveusdt = () => {
  return (
    <div>
        <ApproveUSDT />
    </div>
  )
}

export default approveusdt