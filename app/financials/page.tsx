"use client"

import { JSX } from "react";
import { NoDataPanel } from "../components/nodata/NoDataPanel";
import { useTicker } from "../contexts/TickerContext";
import { TickerDetailEntry } from "../types/ticker";
import { DataInfoPanel } from "./DataInfoPanel";



export default function FinancialsPage(): JSX.Element {
  const { tickerData } = useTicker();

  if (!tickerData?.info) {
    return <NoDataPanel />;
  }

  const financials: TickerDetailEntry = tickerData.financials || {};
  const income_stmt: TickerDetailEntry = tickerData.income_stmt || {};

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <DataInfoPanel data={financials} title="Financials" />
      <DataInfoPanel data={income_stmt} title="Income Statement" />
    </div>
  );
}
