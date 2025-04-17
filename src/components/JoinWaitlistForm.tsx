import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const JoinWaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email regex for stricter validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Prevent duplicate submissions (simulate by checking for same email in Firestore)
      const waitlistRef = collection(db, "waitlist");
      const q = await import("firebase/firestore").then(m => m.query(waitlistRef, m.where("email", "==", email)));
      const snapshot = await import("firebase/firestore").then(m => m.getDocs(q));
      if (!snapshot.empty) {
        setError("This email is already on the waitlist.");
        setIsLoading(false);
        return;
      }

      await addDoc(waitlistRef, {
        email,
        name: name || null,
        city: city || null,
        createdAt: serverTimestamp(),
        isAgentInterested: true
      });

      toast.success("You've been added to the waitlist!", {
        description: "We'll notify you when we launch."
      });

      // Reset form
      setEmail("");
      setName("");
      setCity("");
    } catch (error: any) {
      console.error("Error adding to waitlist:", error);
      setError("Failed to join waitlist. Please try again later.");
      toast.error("Failed to join waitlist", {
        description: error?.message || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join the Waitlist</CardTitle>
        <CardDescription>
          Be the first to know when we launch and get early access to our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City (Optional)</Label>
            <Input
              id="city"
              type="text"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JoinWaitlistForm; 