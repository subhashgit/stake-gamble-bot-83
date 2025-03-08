
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StopWinToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function StopWinToggle({ checked, onChange }: StopWinToggleProps) {
  return (
    <div className="flex items-center space-x-3">
      <Label htmlFor="stopOnWin" className="text-white">Stop on Win:</Label>
      <Checkbox 
        id="stopOnWin" 
        checked={checked} 
        onCheckedChange={onChange}
        className="h-5 w-5 data-[state=checked]:bg-gambling-primary border-gambling-input"
      />
    </div>
  );
}
