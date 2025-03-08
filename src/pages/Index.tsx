
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

import { BetSizeInput } from "@/components/BetSizeInput";
import { StopWinToggle } from "@/components/StopWinToggle";
import { GameSelector } from "@/components/GameSelector";
import { StaticTargetCard } from "@/components/StaticTargetCard";
import { RandomTargetCard } from "@/components/RandomTargetCard";
import { ComboTargetCard } from "@/components/ComboTargetCard";
import { BetControls } from "@/components/BetControls";
import { BetHistory } from "@/components/BetHistory";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { useBotState } from "@/hooks/useBotState";

const Index = () => {
  const [showApiModal, setShowApiModal] = useState(false);
  
  const {
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
  } = useBotState();
  
  const handleTargetModeChange = (mode: string) => {
    updateSettings({ targetMode: mode as 'static' | 'random' | 'combo' });
  };
  
  const openApiModal = () => {
    setShowApiModal(true);
  };
  
  const closeApiModal = () => {
    setShowApiModal(false);
  };
  
  const handleApiSave = (apiKey: string, apiSecret: string) => {
    setApiCredentials(apiKey, apiSecret);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Stake.com Gambling Bot</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <BetSizeInput 
              value={settings.betSize} 
              onChange={(value) => updateSettings({ betSize: value })} 
            />
            
            <div className="flex justify-between">
              <StopWinToggle 
                checked={settings.stopOnWin} 
                onChange={(checked) => updateSettings({ stopOnWin: checked })} 
              />
              
              <GameSelector 
                value={settings.gameType} 
                onChange={(value) => updateSettings({ gameType: value })} 
              />
            </div>
          </div>
          
          <Card className="bg-gambling-card p-4 border-gambling-input text-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <h3 className="text-sm text-gray-400">Current Bet</h3>
                <p className="text-xl font-semibold">{botStatus.currentBet.toFixed(8)}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm text-gray-400">Total Profit</h3>
                <p className={`text-xl font-semibold ${botStatus.totalProfit >= 0 ? 'text-gambling-success' : 'text-gambling-error'}`}>
                  {botStatus.totalProfit.toFixed(8)}
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm text-gray-400">Total Bets</h3>
                <p className="text-xl font-semibold">{botStatus.totalBets}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm text-gray-400">Status</h3>
                <p className={`text-xl font-semibold ${botStatus.isRunning ? 'text-gambling-success' : 'text-gambling-error'}`}>
                  {botStatus.isRunning ? 'Running' : 'Stopped'}
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="static" 
          value={settings.targetMode}
          onValueChange={handleTargetModeChange}
          className="mb-6"
        >
          <TabsList className="bg-gambling-input border-0 mb-4">
            <TabsTrigger value="static" className="data-[state=active]:bg-gambling-primary data-[state=active]:text-white">
              Static Target
            </TabsTrigger>
            <TabsTrigger value="random" className="data-[state=active]:bg-gambling-primary data-[state=active]:text-white">
              Random Target
            </TabsTrigger>
            <TabsTrigger value="combo" className="data-[state=active]:bg-gambling-primary data-[state=active]:text-white">
              Combo Target
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="static">
            <StaticTargetCard 
              multiplier={settings.staticMultiplier}
              onMultiplierChange={(value) => updateSettings({ staticMultiplier: value })}
              resetOnWin={settings.staticResetOnWin}
              onResetOnWinChange={(value) => updateSettings({ staticResetOnWin: value })}
              resetOnLoss={settings.staticResetOnLoss}
              onResetOnLossChange={(value) => updateSettings({ staticResetOnLoss: value })}
              increaseOnWin={settings.staticIncreaseOnWin}
              onIncreaseOnWinChange={(value) => updateSettings({ staticIncreaseOnWin: value })}
              increaseOnLoss={settings.staticIncreaseOnLoss}
              onIncreaseOnLossChange={(value) => updateSettings({ staticIncreaseOnLoss: value })}
            />
          </TabsContent>
          
          <TabsContent value="random">
            <RandomTargetCard 
              minMultiplier={settings.randomMinMultiplier}
              onMinMultiplierChange={(value) => updateSettings({ randomMinMultiplier: value })}
              maxMultiplier={settings.randomMaxMultiplier}
              onMaxMultiplierChange={(value) => updateSettings({ randomMaxMultiplier: value })}
              onlyChangeOnWin={settings.randomOnlyChangeOnWin}
              onOnlyChangeOnWinChange={(checked) => updateSettings({ randomOnlyChangeOnWin: checked })}
            />
          </TabsContent>
          
          <TabsContent value="combo">
            <ComboTargetCard 
              multipliers={settings.comboMultipliers}
              onAddMultiplier={addComboMultiplier}
              onRemoveMultiplier={removeComboMultiplier}
              onMultiplierChange={updateComboMultiplier}
              comboMultiplier={calculateComboMultiplier()}
            />
          </TabsContent>
        </Tabs>
        
        <BetControls 
          isRunning={botStatus.isRunning}
          onStart={startBot}
          onStop={stopBot}
          onAPISettings={openApiModal}
          isApiConfigured={botStatus.isApiConfigured}
        />
        
        <BetHistory 
          results={betResults}
          totalProfit={botStatus.totalProfit}
          totalBets={botStatus.totalBets}
        />
      </div>
      
      <ApiKeyModal 
        isOpen={showApiModal}
        onClose={closeApiModal}
        onSave={handleApiSave}
      />
    </div>
  );
};

export default Index;
