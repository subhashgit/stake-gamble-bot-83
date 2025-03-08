
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface RandomTargetCardProps {
  minMultiplier: string;
  onMinMultiplierChange: (value: string) => void;
  maxMultiplier: string;
  onMaxMultiplierChange: (value: string) => void;
  onlyChangeOnWin: boolean;
  onOnlyChangeOnWinChange: (checked: boolean) => void;
}

export function RandomTargetCard({
  minMultiplier,
  onMinMultiplierChange,
  maxMultiplier,
  onMaxMultiplierChange,
  onlyChangeOnWin,
  onOnlyChangeOnWinChange
}: RandomTargetCardProps) {
  return (
    <div className="bg-gambling-card p-4 rounded-md">
      <h3 className="text-lg font-semibold text-white mb-4">Random Target</h3>
      
      <div className="grid gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="minMultiplier" className="text-white">Min multiplier</Label>
          <Input
            id="minMultiplier"
            value={minMultiplier}
            onChange={(e) => onMinMultiplierChange(e.target.value)}
            className="gambling-input"
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="maxMultiplier" className="text-white">Max multiplier</Label>
          <Input
            id="maxMultiplier"
            value={maxMultiplier}
            onChange={(e) => onMaxMultiplierChange(e.target.value)}
            className="gambling-input"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Checkbox 
            id="onlyChangeOnWin" 
            checked={onlyChangeOnWin} 
            onCheckedChange={onOnlyChangeOnWinChange}
            className="h-5 w-5 data-[state=checked]:bg-gambling-primary border-gambling-input"
          />
          <Label htmlFor="onlyChangeOnWin" className="text-white">Only change on win</Label>
        </div>
      </div>
    </div>
  );
}
