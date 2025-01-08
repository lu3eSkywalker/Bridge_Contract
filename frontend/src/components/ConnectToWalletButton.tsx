import React from 'react'
import Page  from "../app/page";
import { ConnectKitButton } from "connectkit";

const ConnectToWalletButton = () => {
  
  return (
    <div>
        <Page>
            <ConnectKitButton />
        </Page>
    </div>
  )
}

export default ConnectToWalletButton