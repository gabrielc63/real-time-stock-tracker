import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StockFormProps {
  onAddStock: (symbol: string, alertPrice: number) => void;
}

const StockForm: React.FC<StockFormProps> = ({ onAddStock }) => {
  const [symbol, setSymbol] = useState<string>("");
  const [alertPrice, setAlertPrice] = useState<string>("");

  const stockOptions = [
    { value: "AAPL", label: "Apple Inc." },
    { value: "AMZN", label: "Amazon" },
    { value: "GOOGL", label: "Alphabet" },
    { value: "MSFT", label: "Microsoft" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol && alertPrice) {
      onAddStock(symbol, parseFloat(alertPrice));
      setAlertPrice("");
    }
  };

  return (
    <Card className="p-4 w-64">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Symbol</label>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger>
              <SelectValue placeholder="Select stock" />
            </SelectTrigger>
            <SelectContent>
              {stockOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Alert Price ($)</label>
          <Input
            type="number"
            step="0.01"
            value={alertPrice}
            onChange={(e) => setAlertPrice(e.target.value)}
            placeholder="Enter alert price"
          />
        </div>

        <Button type="submit" className="w-full">
          Add Stock
        </Button>
      </form>
    </Card>
  );
};

export default StockForm;
