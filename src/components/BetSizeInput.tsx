
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BetSizeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BetSizeInput({ value, onChange }: BetSizeInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="betSize" className="text-white">Bet size:</Label>
      <Input
        id="betSize"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter USD bet size"
        className="gambling-input"
      />
    </div>
  );
}
