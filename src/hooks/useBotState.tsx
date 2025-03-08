
import { useState, useEffect, useCallback } from "react";
import { BotSettings, BotStatus, BetResult } from "@/types/GambleTypes";
import { BotLogicService } from "@/services/BotLogicService";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_SETTINGS: BotSettings = {
  apiKey: "",
  apiSecret: "",
  betSize: "0.00000001",
  stopOnWin: false,
  gameType: "dice",
  
  // Static target settings
  staticMultiplier: "2",
  staticResetOnWin: "base",
  staticResetOnLoss: "none",
  staticIncreaseOnWin: "0.1",
  staticIncreaseOnLoss: "0.1",
  
  // Random target settings
  randomMinMultiplier: "1.5",
  randomMaxMultiplier: "10",
  randomOnlyChangeOnWin: false,
  
  // Combo target settings
  comboMultipliers: [
    { id: uuidv4(), value: "2" },
    { id: uuidv4(), value: "3" }
  ],
  
  // Target mode
  targetMode: "static",
};

export function useBotState() {
  const [settings, setSettings] = useState<BotSettings>(DEFAULT_SETTINGS);
  const [betResults, setBetResults] = useState<BetResult[]>([]);
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isRunning: false,
    currentBet: 0,
    currentMultiplier: 0,
    totalBets: 0,
    totalProfit: 0,
    isApiConfigured: false,
  });
  
  const [botLogic, setBotLogic] = useState<BotLogicService | null>(null);
  
  // Initialize bot logic
  useEffect(() => {
    const handleBetResult = (result: BetResult) => {
      setBetResults(prev => [result, ...prev]);
    };
    
    const newBotLogic = new BotLogicService(settings, handleBetResult);
    setBotLogic(newBotLogic);
    
    return () => {
      if (newBotLogic.isActive()) {
        newBotLogic.stop();
      }
    };
  }, []);
  
  // Update bot logic when settings change
  useEffect(() => {
    if (botLogic) {
      botLogic.updateSettings(settings);
      
      // Update API configured status
      setBotStatus(prev => ({
        ...prev,
        isApiConfigured: !!(settings.apiKey && settings.apiSecret)
      }));
    }
  }, [settings, botLogic]);
  
  // Start the bot
  const startBot = useCallback(async () => {
    if (!botLogic) return;
    
    if (!settings.apiKey || !settings.apiSecret) {
      toast.error("Please configure API settings first");
      return;
    }
    
    const startSuccess = await botLogic.start();
    
    if (startSuccess) {
      toast.success("Bot started successfully");
      setBotStatus(prev => ({ ...prev, isRunning: true }));
    } else {
      toast.error("Failed to start bot. Check API credentials.");
    }
  }, [botLogic, settings]);
  
  // Stop the bot
  const stopBot = useCallback(() => {
    if (!botLogic) return;
    
    botLogic.stop();
    toast.info("Bot stopped");
    setBotStatus(prev => ({ ...prev, isRunning: false }));
  }, [botLogic]);
  
  // Reset results
  const resetResults = useCallback(() => {
    if (!botLogic) return;
    
    botLogic.reset();
    setBetResults([]);
    setBotStatus(prev => ({ 
      ...prev, 
      totalBets: 0,
      totalProfit: 0 
    }));
    toast.info("Results reset");
  }, [botLogic]);
  
  // Update settings
  const updateSettings = useCallback((newSettings: Partial<BotSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  // Update API credentials
  const setApiCredentials = useCallback((apiKey: string, apiSecret: string) => {
    setSettings(prev => ({ ...prev, apiKey, apiSecret }));
    
    // Save API credentials in local storage (not secure, just for demo)
    localStorage.setItem("stake_api_key", apiKey);
    localStorage.setItem("stake_api_secret", apiSecret);
    
    setBotStatus(prev => ({ ...prev, isApiConfigured: !!(apiKey && apiSecret) }));
  }, []);
  
  // Load API credentials from local storage on initial load
  useEffect(() => {
    const savedApiKey = localStorage.getItem("stake_api_key");
    const savedApiSecret = localStorage.getItem("stake_api_secret");
    
    if (savedApiKey && savedApiSecret) {
      setSettings(prev => ({ ...prev, apiKey: savedApiKey, apiSecret: savedApiSecret }));
      setBotStatus(prev => ({ ...prev, isApiConfigured: true }));
    }
  }, []);
  
  // Update status periodically
  useEffect(() => {
    if (!botLogic) return;
    
    const interval = setInterval(() => {
      setBotStatus(prev => ({
        ...prev,
        currentBet: botLogic.getCurrentBet(),
        totalBets: botLogic.getTotalBets(),
        totalProfit: botLogic.getTotalProfit(),
      }));
    }, 500);
    
    return () => clearInterval(interval);
  }, [botLogic]);
  
  // Add a multiplier to combo multipliers
  const addComboMultiplier = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      comboMultipliers: [
        ...prev.comboMultipliers,
        { id: uuidv4(), value: "2" }
      ]
    }));
  }, []);
  
  // Remove a multiplier from combo multipliers
  const removeComboMultiplier = useCallback((id: string) => {
    setSettings(prev => ({
      ...prev,
      comboMultipliers: prev.comboMultipliers.filter(m => m.id !== id)
    }));
  }, []);
  
  // Update a specific combo multiplier
  const updateComboMultiplier = useCallback((id: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      comboMultipliers: prev.comboMultipliers.map(m => 
        m.id === id ? { ...m, value } : m
      )
    }));
  }, []);
  
  // Calculate the combo multiplier
  const calculateComboMultiplier = (): string => {
    if (!settings.comboMultipliers.length) return "0.00";
    
    const product = settings.comboMultipliers.reduce(
      (acc, curr) => acc * (parseFloat(curr.value) || 0), 
      1
    );
    
    return product.toFixed(2);
  };
  
  return {
    settings,
    updateSettings,
    setApiCredentials,
    botStatus,
    betResults,
    startBot,
    stopBot,
    resetResults,
    addComboMultiplier,
    removeComboMultiplier,
    updateComboMultiplier,
    calculateComboMultiplier,
  };
}
