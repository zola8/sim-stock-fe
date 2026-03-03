import { createContext, ReactNode, useContext, useState } from 'react';
import { TickerContextType, TickerDetails } from '../types/ticker';



const TickerContext = createContext<TickerContextType | undefined>(undefined);


export function TickerProvider({ children }: { children: ReactNode }) {
  const [tickerData, setTickerDataState] = useState<TickerDetails | null>(null);
  const [selectedTicker, setSelectedTicker] = useState('');

  const setTickerData = (data: TickerDetails | null, ticker: string) => {
    setTickerDataState(data);
    setSelectedTicker(ticker);
  };

  return (
    <TickerContext.Provider value={{ tickerData, selectedTicker, setTickerData }}>
      {children}
    </TickerContext.Provider>
  );
}


export function useTicker() {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error('useTicker must be used within TickerProvider');
  }
  return context;
}
