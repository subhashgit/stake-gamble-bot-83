
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface BetSizeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BetSizeInput({ value, onChange }: BetSizeInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="betSize" className="text-white">Base bet size:</Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <DollarSign className="h-4 w-4" />
        </div>
        <Input
          id="betSize"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00000001"
          className="gambling-input pl-9"
        />
      </div>
    </div>
  );
}
