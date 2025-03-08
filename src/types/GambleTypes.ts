
export interface BotSettings {
  apiKey: string;
  apiSecret: string;
  betSize: string;
  stopOnWin: boolean;
  gameType: string;
  
  // Static target settings
  staticMultiplier: string;
  staticResetOnWin: string;
  staticResetOnLoss: string;
  staticIncreaseOnWin: string;
  staticIncreaseOnLoss: string;
  
  // Random target settings
  randomMinMultiplier: string;
  randomMaxMultiplier: string;
  randomOnlyChangeOnWin: boolean;
  
  // Combo target settings
  comboMultipliers: { id: string; value: string }[];
  
  // Target mode
  targetMode: 'static' | 'random' | 'combo';
}

export interface BetResult {
  id: string;
  timestamp: Date;
  amount: number;
  multiplier: number;
  target: number;
  result: 'win' | 'loss';
  profit: number;
}

export interface BotStatus {
  isRunning: boolean;
  currentBet: number;
  currentMultiplier: number;
  totalBets: number;
  totalProfit: number;
  isApiConfigured: boolean;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
