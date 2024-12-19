import React, { useEffect, useState, useCallback } from "react";
import StockForm from "./components/StockForm";
import StockCards from "./components/StockCards";
import StockChart from "./components/StockChart";
import { Stock, StockData } from "./types";
import { SOCKET_URL, API_BASE_URL, FINNHUB_API_KEY } from "./config";

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const initializeWebSocket = () => {
    if (socket) {
      return socket;
    }

    const ws = new WebSocket(SOCKET_URL);

    ws.addEventListener("open", () => {});

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        const trade = data.data[0];
        updateStockPrice(trade.s, trade.p);
      }
    });

    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    });

    setSocket(ws);
    return ws;
  };

  const updateStockPrice = (symbol: string, price: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, currentPrice: price, previousClose: stock.currentPrice }
          : stock,
      ),
    );

    setChartData((prevData) => {
      const timestamp = Date.now();
      let newDataPoint: any = { timestamp };

      const lastDataPoint = prevData[prevData.length - 1] || {};

      stocks.forEach((stock) => {
        if (stock.symbol !== symbol) {
          newDataPoint[stock.symbol] =
            lastDataPoint[stock.symbol] || stock.currentPrice;
        }
      });

      newDataPoint[symbol] = price;

      // Keep only the last 50 data points to prevent memory issues
      return [...prevData, newDataPoint].slice(-50);
    });
  };

  const subscribeToStock = (symbol: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
    }
  };

  const handleAddStock = async (symbol: string, alertPrice: number) => {
    setStocks((prevStocks) => [
      ...prevStocks,
      {
        symbol,
        currentPrice: 0,
        previousClose: 0,
        alertPrice,
      },
    ]);

    const ws = socket || initializeWebSocket();

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
    } else {
      ws.addEventListener("open", () => {
        ws.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
      });
    }
  };

  const displayStocks = stocks.filter((stock) => stock.currentPrice > 0);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex gap-6">
        <StockForm onAddStock={handleAddStock} />
        <div className="flex-1">
          <StockCards stocks={displayStocks} />
        </div>
      </div>
      <StockChart data={chartData} stocks={displayStocks} />
    </div>
  );
};

export default App;
