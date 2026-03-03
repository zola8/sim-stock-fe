import { TickerCompanyInfo } from "../types/tickerCompanyInfo";
import { formatCurrency } from "../utils/formatters";


export function ExecutiveLeadership({ info }: { info: TickerCompanyInfo }) {
  return (
    info.companyOfficers && (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-3 text-lg">Executive Leadership</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Title</th>
                <th className="pb-2 pr-4">Age</th>
                <th className="pb-2 pr-4 text-right">Total Pay (2024)</th>
              </tr>
            </thead>
            <tbody>
              {info.companyOfficers.slice(0, 5).map((officer, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-2 pr-4 font-medium">{officer.name}</td>
                  <td className="py-2 pr-4 text-gray-600">{officer.title}</td>
                  <td className="py-2 pr-4">{officer.age || 'N/A'}</td>
                  <td className="py-2 pr-4 text-right">
                    {officer.totalPay ? formatCurrency(officer.totalPay, info.currency) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}
