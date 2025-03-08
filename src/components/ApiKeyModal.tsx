
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Key, ExternalLink } from "lucide-react";

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
      <DialogContent className="bg-gambling-card border-gambling-input text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Key className="h-5 w-5" />
            Configure Stake.com API
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Enter your Stake.com API credentials to connect the bot to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-gambling-input/30 p-3 rounded-md text-sm">
            <p className="text-white/80 mb-2">You can find your API credentials in your Stake.com account:</p>
            <ol className="list-decimal ml-5 text-white/70 space-y-1">
              <li>Go to your Stake.com account settings</li>
              <li>Navigate to the API section</li>
              <li>Generate a new API key and secret</li>
            </ol>
            <div className="mt-3 flex items-center">
              <a 
                href="https://stake.com/settings/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gambling-primary flex items-center hover:underline"
              >
                Open Stake.com API Settings
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
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
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button className="btn-gambling-primary w-full sm:w-auto" onClick={handleSave}>Save API Credentials</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
