
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, Settings, Key } from "lucide-react";

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
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center mt-6">
      <Button 
        onClick={onAPISettings} 
        variant="outline" 
        className={`border-gambling-input hover:bg-gambling-input w-full md:w-auto ${isApiConfigured ? 'bg-gambling-success/20 text-gambling-success' : 'bg-gambling-error/20 text-gambling-error'}`}
      >
        <Key className="mr-2 h-4 w-4" />
        {isApiConfigured ? "API Configured" : "Configure API"}
      </Button>
      
      {isRunning ? (
        <Button onClick={onStop} className="btn-gambling-danger px-8 w-full md:w-auto">
          <Square className="mr-2 h-4 w-4" />
          Stop
        </Button>
      ) : (
        <Button onClick={onStart} className="btn-gambling-success px-8 w-full md:w-auto" disabled={!isApiConfigured}>
          <Play className="mr-2 h-4 w-4" />
          Start
        </Button>
      )}
    </div>
  );
}
