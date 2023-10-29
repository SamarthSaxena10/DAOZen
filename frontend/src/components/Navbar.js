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
          {/* Wallet address input and button */}
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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
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
                onClick={() => scrollToComponent(refs.tokenMetadata)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:"
                style={{ cursor: "pointer" }}
              >
                Token Metadata
              </a>
            </li>

            <li>
              <a
                onClick={() => scrollToComponent(refs.customWallet)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                style={{ cursor: "pointer" }}
              >
                Custom WalletData
              </a>
            </li>
            <a
              onClick={() => scrollToComponent(refs.NftTransaction)}
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              style={{ cursor: "pointer" }}
            >
              NFT Transfers
            </a>

            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
