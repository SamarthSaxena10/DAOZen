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

import "../styles/NFTTransfer.css";

function NftTransfers() {
  const [data, setData] = useState([]);
  const [contractAddress, setContractAddress] = useState("");

  const fetchData = async () => {
    if (!contractAddress) return;

    try {
      const response = await axios.get(
        `https://daostats.onrender.com/nft-transfer1/${contractAddress}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the transaction data:", error);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchData();
    }
  }, [contractAddress]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow-lg">
          <p className="label">{`Transaction Index: ${label}`}</p>
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
    <div className="newStyle flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-md w-full max-w-screen-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          NFT Transfers
        </h2>

        <div className="mb-4 flex justify-center">
          <input
            className="border p-2 mr-2"
            placeholder="Enter Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
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
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="transaction_index" name="Transaction Index" />
              <YAxis dataKey="log_index" name="Log Index" />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="log_index" fill="#3B82F6" name="Log Index" />
              <Brush dataKey="transaction_index" height={30} stroke="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default NftTransfers;
