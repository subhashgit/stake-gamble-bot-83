
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface BetResult {
  id: string;
  timestamp: Date;
  amount: number;
  multiplier: number;
  target: number;
  result: 'win' | 'loss';
  profit: number;
}

interface BetHistoryProps {
  results: BetResult[];
  totalProfit: number;
  totalBets: number;
}

export function BetHistory({ results, totalProfit, totalBets }: BetHistoryProps) {
  return (
    <div className="bg-gambling-card p-4 rounded-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Bet History</h3>
        <div className="flex space-x-4">
          <div>
            <span className="text-gray-400 text-sm">Total Bets: </span>
            <span className="text-white font-medium">{totalBets}</span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Total Profit: </span>
            <span className={`font-medium ${totalProfit >= 0 ? 'text-gambling-success' : 'text-gambling-error'}`}>
              {totalProfit.toFixed(8)}
            </span>
          </div>
        </div>
      </div>
      
      <Separator className="bg-gambling-input mb-4" />
      
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {results.length > 0 ? (
            results.map((bet) => (
              <div 
                key={bet.id} 
                className="flex justify-between items-center p-2 rounded hover:bg-gambling-input transition-colors text-sm"
              >
                <div className="flex flex-col">
                  <span className="text-gray-400">
                    {bet.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-white">
                    {bet.amount.toFixed(8)} @ {bet.multiplier.toFixed(2)}x
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={bet.result === 'win' ? 'text-gambling-success' : 'text-gambling-error'}>
                    {bet.result === 'win' ? 'WIN' : 'LOSS'}
                  </span>
                  <span className={bet.profit >= 0 ? 'text-gambling-success' : 'text-gambling-error'}>
                    {bet.profit >= 0 ? '+' : ''}{bet.profit.toFixed(8)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400">
              No bets yet. Start betting to see your history.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
