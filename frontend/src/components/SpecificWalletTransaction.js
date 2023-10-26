import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Cell,
} from "recharts";

function SpecificWalletTransactionChart() {
  const [data, setData] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const fetchData = async () => {
    if (!contractAddress || !walletAddress) return;

    try {
      const response = await axios.get(
        `https://daostats.onrender.com/token-transfers/${contractAddress}/${walletAddress}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the transaction data:", error);
    }
  };

  useEffect(() => {
    if (contractAddress && walletAddress) {
      fetchData();
    }
  }, [contractAddress, walletAddress]);

  const formattedData = data.map((item) => ({
    ...item,
    valueFormatted: item.value / 10 ** 18,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow-lg">
          <p className="label">{`Log Index: ${label}`}</p>
          {Object.keys(data).map((key, index) => (
            <p key={index} className="desc">
              {`${key}: ${data[key]}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-md w-full max-w-screen-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Specific Wallet Transaction
        </h2>

        <div className="mb-4 flex justify-center">
          <input
            className="border p-2 mr-2"
            placeholder="Enter Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          <input
            className="border p-2 mr-2" /* Added mr-2 for spacing */
            placeholder="Enter Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={fetchData}
          >
            Fetch Data
          </button>
        </div>

        <div className="relative h-[500px]">
          <ResponsiveContainer>
            <BarChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="valueFormatted" name="Value" />
              <YAxis dataKey="log_index" name="Log Index" />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="log_index" fill="#3B82F6" name="Log Index" />
              <Brush dataKey="valueFormatted" height={30} stroke="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SpecificWalletTransactionChart;
