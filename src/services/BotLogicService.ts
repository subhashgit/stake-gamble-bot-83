import { BotSettings, BetResult } from "@/types/GambleTypes";
import { StakeApiService } from "./StakeApiService";

export class BotLogicService {
  private settings: BotSettings;
  private currentBet: number;
  private isRunning: boolean = false;
  private betHistory: BetResult[] = [];
  private totalProfit: number = 0;
  private intervalId: number | null = null;
  private onBetResult: (result: BetResult) => void;
  
  constructor(
    settings: BotSettings,
    onBetResult: (result: BetResult) => void
  ) {
    this.settings = settings;
    this.currentBet = parseFloat(settings.betSize) || 0;
    this.onBetResult = onBetResult;
  }
  
  public updateSettings(settings: BotSettings): void {
    this.settings = settings;
    if (!this.isRunning) {
      this.currentBet = parseFloat(settings.betSize) || 0;
    }
  }
  
  public getTotalProfit(): number {
    return this.totalProfit;
  }
  
  public getBetHistory(): BetResult[] {
    return this.betHistory;
  }
  
  public isActive(): boolean {
    return this.isRunning;
  }
  
  public getCurrentBet(): number {
    return this.currentBet;
  }
  
  public getTotalBets(): number {
    return this.betHistory.length;
  }
  
  private getCurrentMultiplier(): number {
    const { targetMode, staticMultiplier, randomMinMultiplier, randomMaxMultiplier, comboMultipliers } = this.settings;
    
    switch (targetMode) {
      case 'static':
        return parseFloat(staticMultiplier) || 2;
      
      case 'random': {
        const min = parseFloat(randomMinMultiplier) || 1.5;
        const max = parseFloat(randomMaxMultiplier) || 10;
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
      }
      
      case 'combo': {
        // Use the combo multiplier sequence
        const betIndex = this.betHistory.length % comboMultipliers.length;
        return parseFloat(comboMultipliers[betIndex].value) || 2;
      }
      
      default:
        return 2;
    }
  }
  
  private updateBetAmount(lastResult: BetResult | null): void {
    if (!lastResult) {
      // First bet, use base bet
      this.currentBet = parseFloat(this.settings.betSize) || 0;
      return;
    }
    
    const baseBet = parseFloat(this.settings.betSize) || 0;
    
    if (lastResult.result === 'win') {
      // Handle win
      const { staticResetOnWin, staticIncreaseOnWin } = this.settings;
      
      if (staticResetOnWin === 'base') {
        this.currentBet = baseBet;
      } else if (staticResetOnWin === 'last') {
        // Keep current bet
      } else {
        // Apply increase
        const increase = parseFloat(staticIncreaseOnWin) || 0;
        this.currentBet *= (1 + increase);
      }
      
      // Check if we should stop
      if (this.settings.stopOnWin) {
        this.stop();
      }
    } else {
      // Handle loss
      const { staticResetOnLoss, staticIncreaseOnLoss } = this.settings;
      
      if (staticResetOnLoss === 'base') {
        this.currentBet = baseBet;
      } else if (staticResetOnLoss === 'last') {
        // Keep current bet
      } else {
        // Apply increase
        const increase = parseFloat(staticIncreaseOnLoss) || 0.1;
        this.currentBet *= (1 + increase);
      }
    }
    
    // Ensure bet amount is positive
    this.currentBet = Math.max(0.00000001, this.currentBet);
  }
  
  public async start(): Promise<boolean> {
    if (this.isRunning) return true;
    
    const { apiKey, apiSecret } = this.settings;
    
    // Test API connection before starting
    const connectionTest = await StakeApiService.testApiConnection(apiKey, apiSecret);
    if (!connectionTest.success) {
      console.error("Failed to connect to Stake API:", connectionTest.error);
      return false;
    }
    
    this.isRunning = true;
    this.currentBet = parseFloat(this.settings.betSize) || 0;
    
    // Schedule recurring bets
    this.intervalId = window.setInterval(async () => {
      if (!this.isRunning) return;
      
      try {
        await this.placeBet();
      } catch (error) {
        console.error("Error during bet placement:", error);
      }
    }, 2000); // Place a bet every 2 seconds
    
    return true;
  }
  
  public stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = false;
  }
  
  private async placeBet(): Promise<void> {
    const targetMultiplier = this.getCurrentMultiplier();
    const betResponse = await StakeApiService.placeBet(
      this.settings,
      this.currentBet,
      targetMultiplier
    );
    
    if (!betResponse.success || !betResponse.data) {
      console.error("Failed to place bet:", betResponse.error);
      return;
    }
    
    const betData = betResponse.data;
    
    const betResult: BetResult = {
      id: betData.id,
      timestamp: new Date(betData.timestamp),
      amount: betData.amount,
      multiplier: betData.multiplier,
      target: betData.multiplier,
      result: betData.result,
      profit: betData.profit,
    };
    
    // Update bet history and stats
    this.betHistory.unshift(betResult);
    this.totalProfit += betResult.profit;
    
    // Update bet amount for next bet
    this.updateBetAmount(betResult);
    
    // Notify the UI
    this.onBetResult(betResult);
    
    // Stop if the user has asked to stop on win
    if (this.settings.stopOnWin && betResult.result === 'win') {
      this.stop();
    }
  }
  
  public reset(): void {
    this.betHistory = [];
    this.totalProfit = 0;
    this.currentBet = parseFloat(this.settings.betSize) || 0;
  }
}
