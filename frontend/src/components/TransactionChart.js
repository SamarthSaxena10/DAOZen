import React, { useEffect, useState, useContext } from "react";
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
  Label,
} from "recharts";
import { WalletContext } from "../context";

import "../styles/analytics.css";

function TransactionChart() {
  const [data, setData] = useState([]);
  const { walletAddress } = useContext(WalletContext);

  const fetchData = async () => {
    if (!walletAddress) return;

    try {
      const response = await axios.get(
        `https://daostats.onrender.com/token-transfers/${walletAddress}`
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("There was an error fetching the transaction data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [walletAddress]);

  const formattedData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        valueFormatted: item.value / 10 ** 18,
      }))
    : [];

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
    <div className=" analytics flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-md w-full max-w-screen-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          DAO ANALYTICS
        </h2>

        <div className="relative h-[500px]">
          <ResponsiveContainer>
            <BarChart
              data={formattedData.length ? formattedData : [{}]}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={formattedData.length ? "valueFormatted" : null}
                name="Value"
                tick={{ fontSize: 12 }}
              >
                <Label
                  value="Token Transfer"
                  position="bottom"
                  offset={30}
                  dy={10}
                  style={{ fontWeight: "bold", fill: "#000" }}
                />
              </XAxis>
              <YAxis
                dataKey={formattedData.length ? "log_index" : null}
                name="Log Index"
              >
                <Label
                  value="Log Index"
                  angle={-90}
                  position="insideLeft"
                  offset={20}
                  dx={-10}
                  style={{ fontWeight: "bold", fill: "#000" }}
                />
              </YAxis>

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />

              {formattedData.length > 0 && (
                <Bar dataKey="log_index" fill="#3B82F6" name="Log Index">
                  {formattedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 ? "#3B82F6" : "#2563EB"}
                    />
                  ))}
                </Bar>
              )}

              <Brush dataKey="valueFormatted" height={30} stroke="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TransactionChart;
