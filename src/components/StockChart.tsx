import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Stock } from "../types";

interface StockChartProps {
  data: {
    timestamp: number;
    [key: string]: number;
  }[];
  stocks: Stock[];
}

const StockChart: React.FC<StockChartProps> = ({ data, stocks }) => {
  const stockSymbols = stocks.map((stock) => stock.symbol);

  const getStockColor = (index: number) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];
    return colors[index % colors.length];
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Stock Price Comparison</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} key={`lc_${data.length}`}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()}`;
              }}
            />
            <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`} />
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString()
              }
              formatter={(value: any) => [`$${Number(value).toFixed(2)}`, ""]}
            />
            <Legend />
            {stockSymbols.map((symbol, index) => (
              <Line
                connectNulls
                key={symbol}
                type="monotone"
                dataKey={symbol}
                stroke={getStockColor(index)}
                dot={false}
                name={symbol}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StockChart;
