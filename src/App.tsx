import React, { useEffect, useState } from "react";
import StockForm from "./components/StockForm";
import { Stock, StockData } from "./types";
import { SOCKET_URL, API_BASE_URL, FINNHUB_API_KEY } from "./config";
//import "./App.css";

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        updateStockPrice(data.data[0].s, data.data[0].p);
      }
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const updateStockPrice = (symbol: string, price: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.symbol === symbol ? { ...stock, currentPrice: price } : stock,
      ),
    );

    setChartData((prevData) => [
      ...prevData,
      {
        timestamp: Date.now(),
        [symbol]: price,
      },
    ]);
  };

  const subscribeToStock = (symbol: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
    }
  };

  const fetchStockData = async (symbol: string): Promise<StockData> => {
    const response = await fetch(
      `${API_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
    );
    return response.json();
  };

  const handleAddStock = async (symbol: string, alertPrice: number) => {
    const stockData = await fetchStockData(symbol);

    setStocks((prevStocks) => [
      ...prevStocks,
      {
        symbol,
        currentPrice: stockData.c,
        previousClose: stockData.pc,
        alertPrice,
      },
    ]);

    subscribeToStock(symbol);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex gap-6">
        <StockForm onAddStock={handleAddStock} />
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default App;
