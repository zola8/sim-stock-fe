'use client';

import { useTicker } from "../contexts/TickerContext";

export default function StockInfoPage() {

  const { tickerData, selectedTicker } = useTicker();

  return (
    <div className="">
      StockInfoPage

      <h3>{selectedTicker}</h3>

      <p>Latest Close: {tickerData?.timeSeries.Close[Object.keys(tickerData.timeSeries.Close)[0]]}</p>

    </div>
  );
}
