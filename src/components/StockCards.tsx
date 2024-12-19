import React from "react";
import { Stock } from "../types";
import { Card } from "@/components/ui/card";

interface StockCardsProps {
  stocks: Stock[];
}

const StockCards: React.FC<StockCardsProps> = ({ stocks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => {
        const percentChange =
          ((stock.currentPrice - stock.previousClose) / stock.previousClose) *
          100;
        const isAboveAlert = stock.currentPrice >= stock.alertPrice;

        return (
          <Card
            key={stock.symbol}
            className={`p-4 ${isAboveAlert ? "bg-green-50" : "bg-red-50"}`}
          >
            <div className="text-lg font-bold">{stock.symbol}</div>
            <div className="text-2xl">${stock.currentPrice.toFixed(2)}</div>
            <div
              className={`text-sm ${percentChange >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {percentChange.toFixed(2)}%
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StockCards;
