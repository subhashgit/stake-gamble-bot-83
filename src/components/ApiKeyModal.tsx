
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string, apiSecret: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("API Key is required");
      return;
    }
    
    if (!apiSecret.trim()) {
      toast.error("API Secret is required");
      return;
    }
    
    onSave(apiKey, apiSecret);
    toast.success("API credentials saved successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gambling-card border-gambling-input text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Configure Stake.com API</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey" className="text-white">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Stake.com API Key"
              className="gambling-input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiSecret" className="text-white">API Secret</Label>
            <Input
              id="apiSecret"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              type="password"
              placeholder="Enter your Stake.com API Secret"
              className="gambling-input"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="btn-gambling-primary" onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
