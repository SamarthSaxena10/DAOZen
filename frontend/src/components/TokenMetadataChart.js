import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import "../styles/Metadata.css";

function TokenMetadataChart() {
  const [metadata, setMetadata] = useState(null);

  const fetchTokenMetadata = async () => {
    try {
      const response = await axios.get(
        "https://daostats.onrender.com/token-metadata/0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMetadata(response.data);
    } catch (error) {
      console.error("There was an error fetching the token metadata:", error);
    }
  };

  const formatMetadataForChart = () => {
    if (!metadata) return [];

    return [
      {
        name: "Token Info",
        totalSupply: parseFloat(metadata.total_supply),
        currentUsdPrice: metadata.current_usd_price,
        tokenName: metadata.name,
        tokenSymbol: metadata.symbol,
      },
    ];
  };

  useEffect(() => {
    fetchTokenMetadata();
  }, []);

  return (
    <div className="gradientBackground flex flex-col items-center justify-center min-h-screen">
      {" "}
      {/* Apply the CSS class here */}
      <div className="bg-white p-4 rounded-md w-full max-w-screen-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Token Metadata
        </h2>

        <div className="relative h-[500px]">
          <ResponsiveContainer>
            <BarChart
              data={formatMetadataForChart()}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" height={70} tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSupply" fill="#10B981" name="Total Supply">
                <LabelList dataKey="total_supply" position="top" />
              </Bar>
              <Bar
                dataKey="currentUsdPrice"
                fill="#10B981"
                name="Current USD Price"
              >
                <LabelList dataKey="current_usd_price" position="top" />
              </Bar>
              <Bar dataKey="tokenName" fill="#10B981" name="Name">
                <LabelList dataKey="tokenName" position="top" />
              </Bar>
              <Bar dataKey="tokenSymbol" fill="#10B981" name="Symbol">
                <LabelList dataKey="tokenSymbol" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TokenMetadataChart;
