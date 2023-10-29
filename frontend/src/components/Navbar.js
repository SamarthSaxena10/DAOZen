import React, { useState, useContext } from "react";
import axios from "axios";
import { WalletContext } from "../context";
import logo from "../logo.jpg";

const NavbarComponent = ({ refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wallet_address, setWallet_address] = useState("");
  const { setWalletAddress } = useContext(WalletContext);

  const scrollToComponent = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setWalletAddress(wallet_address); // Set the address in context

    try {
      // Fetch token metadata
      const metadataResponse = await axios.get(
        `https://daostats.onrender.com/token-transfers/${wallet_address}`
      );
      console.log("Received token metadata:", metadataResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://dao-stats.vercel.app/" className="flex items-center">
          <img src={logo} className="h-12 mr-3" alt="Error" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DAOZen
          </span>
        </a>
        <div className="flex md:order-2">
          <form onSubmit={handleSearch} className="flex mr-4">
            <input
              type="text"
              className="px-4 py-2 mr-2 border rounded-lg"
              placeholder="Enter Contract Address..."
              value={wallet_address}
              onChange={(e) => setWallet_address(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
              Search
            </button>
          </form>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "" : "hidden"
          } md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                onClick={() => scrollToComponent(refs.customWallet)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                style={{ cursor: "pointer" }}
              >
                Custom WalletData
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToComponent(refs.NftTransaction)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                style={{ cursor: "pointer" }}
              >
                NFT Transfers
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToComponent(refs.tokenMetadata)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:"
                style={{ cursor: "pointer" }}
              >
                Token Metadata
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
