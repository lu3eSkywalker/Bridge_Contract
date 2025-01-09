import React from "react";
import { ConnectKitButton } from "connectkit";
import RootLayout from "@/app/layout";

const ConnectToWalletButton = () => {
  return (
    <RootLayout>
      <ConnectKitButton />
    </RootLayout>
  );
};

export default ConnectToWalletButton;
