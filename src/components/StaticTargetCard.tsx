
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StaticTargetCardProps {
  multiplier: string;
  onMultiplierChange: (value: string) => void;
  resetOnWin: string;
  onResetOnWinChange: (value: string) => void;
  resetOnLoss: string;
  onResetOnLossChange: (value: string) => void;
  increaseOnWin: string;
  onIncreaseOnWinChange: (value: string) => void;
  increaseOnLoss: string;
  onIncreaseOnLossChange: (value: string) => void;
}

export function StaticTargetCard({
  multiplier,
  onMultiplierChange,
  resetOnWin,
  onResetOnWinChange,
  resetOnLoss,
  onResetOnLossChange,
  increaseOnWin,
  onIncreaseOnWinChange,
  increaseOnLoss,
  onIncreaseOnLossChange
}: StaticTargetCardProps) {
  return (
    <div className="bg-gambling-card p-4 rounded-md">
      <h3 className="text-lg font-semibold text-white mb-4">Static Target</h3>
      
      <div className="grid gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="targetMultiplier" className="text-white">Target multiplier</Label>
          <Input
            id="targetMultiplier"
            value={multiplier}
            onChange={(e) => onMultiplierChange(e.target.value)}
            className="gambling-input"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="resetOnWin" className="text-white">Reset on Win</Label>
            <Select value={resetOnWin} onValueChange={onResetOnWinChange}>
              <SelectTrigger id="resetOnWin" className="gambling-input">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent className="bg-gambling-card border-gambling-input text-white">
                <SelectItem value="base" className="hover:bg-gambling-input focus:bg-gambling-input">Base bet</SelectItem>
                <SelectItem value="last" className="hover:bg-gambling-input focus:bg-gambling-input">Last bet</SelectItem>
                <SelectItem value="none" className="hover:bg-gambling-input focus:bg-gambling-input">No reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="resetOnLoss" className="text-white">Reset on Loss</Label>
            <Select value={resetOnLoss} onValueChange={onResetOnLossChange}>
              <SelectTrigger id="resetOnLoss" className="gambling-input">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent className="bg-gambling-card border-gambling-input text-white">
                <SelectItem value="base" className="hover:bg-gambling-input focus:bg-gambling-input">Base bet</SelectItem>
                <SelectItem value="last" className="hover:bg-gambling-input focus:bg-gambling-input">Last bet</SelectItem>
                <SelectItem value="none" className="hover:bg-gambling-input focus:bg-gambling-input">No reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="increaseOnWin" className="text-white">Increase on Win</Label>
          <Input
            id="increaseOnWin"
            value={increaseOnWin}
            onChange={(e) => onIncreaseOnWinChange(e.target.value)}
            className="gambling-input"
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="increaseOnLoss" className="text-white">Increase on Loss</Label>
          <Input
            id="increaseOnLoss"
            value={increaseOnLoss}
            onChange={(e) => onIncreaseOnLossChange(e.target.value)}
            className="gambling-input"
          />
        </div>
      </div>
    </div>
  );
}
