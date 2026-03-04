"use client"

import { JSX } from "react";
import { NoDataPanel } from "../components/nodata/NoDataPanel";
import { useTicker } from "../contexts/TickerContext";
import { TickerDetailEntry } from "../types/ticker";
import { DataInfoPanel } from "./DataInfoPanel";
import { RevenueEstimatePanel } from "./RevenueEstimatePanel";
import { RecommendationsPanel } from "./RecommendationsPanel";



export default function FinancialsPage(): JSX.Element {
  const { tickerData } = useTicker();

  if (!tickerData?.info) {
    return <NoDataPanel />;
  }

  const income_stmt: TickerDetailEntry = tickerData.income_stmt || {};
  const revenue_estimate: TickerDetailEntry = tickerData.revenue_estimate || {};
  const recommendations: TickerDetailEntry = tickerData.recommendations || {};

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <DataInfoPanel data={income_stmt} title="Income Statement" />
      <RevenueEstimatePanel data={revenue_estimate} />
      <RecommendationsPanel data={recommendations} />
    </div>
  );
}
