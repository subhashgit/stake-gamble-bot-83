
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

interface Multiplier {
  id: string;
  value: string;
}

interface ComboTargetCardProps {
  multipliers: Multiplier[];
  onAddMultiplier: () => void;
  onRemoveMultiplier: (id: string) => void;
  onMultiplierChange: (id: string, value: string) => void;
  comboMultiplier: string;
}

export function ComboTargetCard({
  multipliers,
  onAddMultiplier,
  onRemoveMultiplier,
  onMultiplierChange,
  comboMultiplier
}: ComboTargetCardProps) {
  return (
    <div className="bg-gambling-card p-4 rounded-md">
      <h3 className="text-lg font-semibold text-white mb-4">Combo Target</h3>
      
      <div className="grid gap-4">
        {multipliers.map((multiplier, index) => (
          <div key={multiplier.id} className="flex flex-col space-y-2">
            <Label htmlFor={`multiplier-${multiplier.id}`} className="text-white">
              Multiplier {index + 1}
            </Label>
            <div className="flex space-x-2">
              <Input
                id={`multiplier-${multiplier.id}`}
                value={multiplier.value}
                onChange={(e) => onMultiplierChange(multiplier.id, e.target.value)}
                className="gambling-input flex-1"
              />
              {index > 1 && (
                <Button
                  onClick={() => onRemoveMultiplier(multiplier.id)}
                  variant="ghost"
                  size="icon"
                  className="text-gambling-error"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button 
            onClick={onAddMultiplier} 
            variant="outline" 
            size="sm"
            className="bg-gambling-success border-0 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Multiplier
          </Button>
          
          <Button 
            onClick={() => onRemoveMultiplier(multipliers[multipliers.length - 1].id)} 
            variant="outline" 
            size="sm"
            className="bg-gambling-error border-0 text-white"
            disabled={multipliers.length <= 2}
          >
            Remove Last
          </Button>
        </div>
        
        <div className="mt-4 px-3 py-2 bg-gambling-input rounded-md">
          <p className="text-white text-sm flex justify-between">
            <span>Combo Multiplier:</span>
            <span className="font-semibold">{comboMultiplier}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
