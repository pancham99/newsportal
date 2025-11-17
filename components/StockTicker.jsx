"use client";
import { useEffect, useState } from "react";

export default function StockTicker({ symbol }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchStock = async () => {
    try {
      if (!symbol) return;
      const res = await fetch(`../app/api/stock?symbol=${symbol}`);
      const json = await res.json();

      if (json.error) setError(json.error);
      else {
        setError("");
        setData(json);
      }
    } catch {
      setError("Failed to load stock data");
    }
  };

  useEffect(() => {
    fetchStock();
    const interval = setInterval(fetchStock, 30000); // refresh every 30 sec
    return () => clearInterval(interval);
  }, [symbol]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const timeSeries = data["Time Series (5min)"];
  const latestTime = Object.keys(timeSeries)[0];
  const latest = timeSeries[latestTime];

  return (
    <div className="p-4 bg-gray-100 border rounded-md text-gray-800 shadow-sm">
      <h2 className="text-lg font-semibold">{symbol}</h2>
      <p>Last Updated: {latestTime}</p>
      <p>Open: {latest["1. open"]}</p>
      <p>High: {latest["2. high"]}</p>
      <p>Low: {latest["3. low"]}</p>
      <p>Close: {latest["4. close"]}</p>
      <p>Volume: {latest["5. volume"]}</p>
    </div>
  );
}
