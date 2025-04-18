import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, addDoc, onSnapshot, Timestamp } from "firebase/firestore";

interface ChatModalProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
  otherUser: { displayName: string; avatarUrl?: string };
  disabled?: boolean;
}

interface Message {
  id?: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
  type: "text";
}

const ChatModal: React.FC<ChatModalProps> = ({ jobId, open, onClose, otherUser, disabled }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const q = query(
      collection(db, "jobs", jobId, "messages"),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
      );
    });
    return () => unsub();
  }, [jobId, open]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || !currentUser) return;
    setSending(true);
    await addDoc(collection(db, "jobs", jobId, "messages"), {
      senderId: currentUser.uid,
      text: input,
      timestamp: Timestamp.now(),
      type: "text"
    });
    setInput("");
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0">
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
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 h-80 overflow-y-auto flex flex-col gap-3 bg-background">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === currentUser?.uid ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-3 py-2 max-w-xs text-sm shadow ${msg.senderId === currentUser?.uid ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <span>{msg.text}</span>
                <div className="text-[10px] text-muted-foreground mt-1 text-right">
                  {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="flex items-center gap-2 px-6 pb-5 pt-2 border-t bg-background" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={disabled ? "Chat disabled after job completion." : "Type a message..."}
            disabled={sending || disabled}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={sending || !input.trim() || disabled}>
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
