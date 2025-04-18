import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CallModalProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
  otherUser: { displayName: string; avatarUrl?: string };
  disabled?: boolean;
}

// This version uses Daily.co's iframe embed for simplicity. Replace DAILY_DOMAIN and ROOM_URL as needed.
const DAILY_DOMAIN = "https://your-domain.daily.co"; // <-- Set your Daily.co subdomain

const CallModal: React.FC<CallModalProps> = ({ jobId, open, onClose, otherUser, disabled }) => {
  const [callActive, setCallActive] = useState(false);
  const [muted, setMuted] = useState(false);
  const roomUrl = `${DAILY_DOMAIN}/skipq-${jobId}`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!open) setCallActive(false);
  }, [open]);

  // Optionally, listen for Daily.co events via postMessage for call end, etc.

  const handleMute = () => {
    setMuted((m) => !m);
    // Optionally, send mute/unmute to iframe via postMessage
  };

  const handleEndCall = () => {
    setCallActive(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <DialogTitle className="flex items-center gap-3">
            {otherUser.avatarUrl ? (
              <img src={otherUser.avatarUrl} alt={otherUser.displayName} className="h-9 w-9 rounded-full" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                {otherUser.displayName[0]}
              </div>
            )}
            <span>{otherUser.displayName}</span>
            <span className="ml-auto text-xs text-muted-foreground">Video Call</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col items-center justify-center bg-black/80">
          {disabled ? (
            <div className="text-center text-muted-foreground py-20">
              Call disabled after job completion.
            </div>
          ) : (
            <>
              <iframe
                ref={iframeRef}
                src={roomUrl}
                allow="camera; microphone; fullscreen; speaker; display-capture"
                title="Video Call"
                className="w-full h-96 rounded-lg border-none"
                style={{ minHeight: 400 }}
              />
              <div className="flex gap-3 justify-center py-4">
                <Button onClick={handleMute} variant={muted ? "destructive" : "outline"}>
                  {muted ? "Unmute" : "Mute"}
                </Button>
                <Button onClick={handleEndCall} variant="destructive">
                  End Call
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;
