import { TickerTimeSeriesData } from "../types";
import { TickerApiResponse } from "./backend_services";


export function parseTickerData(response: TickerApiResponse): TickerTimeSeriesData {
  try {
    const nestedData = JSON.parse(response.data.data);
    return nestedData as TickerTimeSeriesData;
  } catch (error) {
    console.error('Failed to parse ticker data:', error);
    throw new Error('Invalid ticker data format');
  }
}
