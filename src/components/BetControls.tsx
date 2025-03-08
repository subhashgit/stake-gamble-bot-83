
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings } from "lucide-react";

interface BetControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onAPISettings: () => void;
  isApiConfigured: boolean;
}

export function BetControls({ 
  isRunning, 
  onStart, 
  onStop, 
  onAPISettings, 
  isApiConfigured 
}: BetControlsProps) {
  return (
    <div className="flex space-x-4 items-center justify-center mt-6">
      {isRunning ? (
        <Button onClick={onStop} className="btn-gambling-danger px-8">
          <Square className="mr-2 h-4 w-4" />
          Stop
        </Button>
      ) : (
        <Button onClick={onStart} className="btn-gambling-success px-8" disabled={!isApiConfigured}>
          <Play className="mr-2 h-4 w-4" />
          Start
        </Button>
      )}
      
      <Button onClick={onAPISettings} variant="outline" className="border-gambling-input text-white hover:bg-gambling-input">
        <Settings className="mr-2 h-4 w-4" />
        API Settings
      </Button>
    </div>
  );
}
