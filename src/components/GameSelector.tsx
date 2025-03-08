
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GameSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function GameSelector({ value, onChange }: GameSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="gameSelect" className="text-white">Game:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="gameSelect" className="gambling-input">
          <SelectValue placeholder="Select game" />
        </SelectTrigger>
        <SelectContent className="bg-gambling-card border-gambling-input text-white">
          <SelectItem value="dice" className="hover:bg-gambling-input focus:bg-gambling-input">Dice</SelectItem>
          <SelectItem value="limbo" className="hover:bg-gambling-input focus:bg-gambling-input">Limbo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
