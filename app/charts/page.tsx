"use client"

import { NoDataPanel } from "../components/nodata/NoDataPanel";
import { useTicker } from "../contexts/TickerContext";
import LineChart from "./LineChart";


export default function ChartsPage() {
  const { tickerData } = useTicker();

  if (!tickerData?.timeSeries) {
    return <NoDataPanel />;
  }

  return (
    <div className="">
      <LineChart history={tickerData.timeSeries} />
    </div>
  );
}
