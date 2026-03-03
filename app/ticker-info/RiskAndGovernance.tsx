import { TickerCompanyInfo } from "../types/tickerCompanyInfo";


export function RiskAndGovernance({ info }: { info: TickerCompanyInfo }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold mb-3 text-lg">Risk & Governance Scores</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Audit Risk</p>
          <p className={`font-medium ${info.auditRisk! <= 3 ? 'text-green-600' : info.auditRisk! <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
            {info.auditRisk}/10
          </p>
        </div>
        <div>
          <p className="text-gray-500">Board Risk</p>
          <p className={`font-medium ${info.boardRisk! <= 3 ? 'text-green-600' : info.boardRisk! <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
            {info.boardRisk}/10
          </p>
        </div>
        <div>
          <p className="text-gray-500">Compensation Risk</p>
          <p className={`font-medium ${info.compensationRisk! <= 3 ? 'text-green-600' : info.compensationRisk! <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
            {info.compensationRisk}/10
          </p>
        </div>
        <div>
          <p className="text-gray-500">Shareholder Rights</p>
          <p className={`font-medium ${info.shareHolderRightsRisk! <= 3 ? 'text-green-600' : info.shareHolderRightsRisk! <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
            {info.shareHolderRightsRisk}/10
          </p>
        </div>
        <div>
          <p className="text-gray-500">Overall Risk</p>
          <p className={`font-medium ${info.overallRisk! <= 3 ? 'text-green-600' : info.overallRisk! <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
            {info.overallRisk}/10
          </p>
        </div>
      </div>
    </div>
  );
}
