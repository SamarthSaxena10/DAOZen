import "./App.css";
import TokenMetadataChart from "./components/TokenMetadataChart";
import NavbarComponent from "./components/Navbar";
import React, { useRef, useState } from "react";
import TransactionChart from "./components/TransactionChart";
import SpecificWalletTransactionChart from "./components/SpecificWalletTransaction";
import { WalletContext } from "./context";

import NftTransfers from "./components/NftTransfer";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const tokenMetadata = useRef(null);

  const customWallet = useRef(null);
  const NftTransaction = useRef(null);

  return (
    <div className="bg-blue-100 min-h-screen m-0 p-0">
      <div className="mt-5 p-0 min-h-screen">
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
          <NavbarComponent
            refs={{ tokenMetadata, customWallet, NftTransaction }}
          />

          <TransactionChart />

          <div ref={customWallet}>
            {" "}
            <SpecificWalletTransactionChart />
          </div>
          <div ref={NftTransaction}>
            <NftTransfers />
          </div>
        </WalletContext.Provider>
      </div>
      <div ref={tokenMetadata}>
        {" "}
        <TokenMetadataChart />
      </div>
    </div>
  );
}

export default App;
