"use client"

import { JSX } from "react";
import { NoDataPanel } from "../components/nodata/NoDataPanel";
import { useTicker } from "../contexts/TickerContext";
import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { AnalystEstimates } from "./AnalystEstimates";
import { BalanceSheetCashflow } from "./BalanceSheetCashflow";
import { CompanySummaryContact } from "./CompanySummaryContact";
import { ExecutiveLeadership } from "./ExecutiveLeadership";
import { FinancialHighlights } from "./FinancialHighlights";
import { PrimaryStats } from "./PrimaryStats";
import { RiskAndGovernance } from "./RiskAndGovernance";
import { TickerHeader } from "./TickerHeader";


export default function TickerInfoPage(): JSX.Element {
  const { tickerData } = useTicker();

  if (!tickerData?.info) {
    return <NoDataPanel />;
  }

  const info: TickerCompanyInfo = tickerData.info;
  const isin: string = tickerData.isin || '';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <TickerHeader info={info} isin={isin} />
      <PrimaryStats info={info} />
      <FinancialHighlights info={info} />
      <BalanceSheetCashflow info={info} />
      <AnalystEstimates info={info} />
      <ExecutiveLeadership info={info} />
      <RiskAndGovernance info={info} />
      <CompanySummaryContact info={info} />
    </div>
  );
}
