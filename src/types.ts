export interface Stock {
  symbol: string;
  currentPrice: number;
  previousClose: number;
  alertPrice: number;
}

export interface StockData {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}
