"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectToWallet = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <div>
        You are connected {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((c) => (
        <button key={c.id} onClick={() => connect({ connector: c })}>
          Connected Via {c.name}
        </button>
      ))}
    </div>
  );
};

export default ConnectToWallet;