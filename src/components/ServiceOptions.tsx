
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserPlus, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ServiceOptionsProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const ServiceOptions = ({ selectedOption, onOptionChange }: ServiceOptionsProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setIsSelecting(true);
    setLastSelected(value);
    
    // Simulate a small delay to show the loading state
    setTimeout(() => {
      onOptionChange(value);
      setIsSelecting(false);
      
      // Show confirmation toast
      const serviceName = value === "hold-share" ? "Hold & Share" : "Hold & Switch";
      toast.success(`${serviceName} option selected`, {
        description: "Your service preference has been saved",
        icon: <CheckCircle2 className="h-4 w-4" />
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Choose Your Service</h2>
      
      <RadioGroup value={selectedOption} onValueChange={handleOptionChange} className="grid gap-4 md:grid-cols-2">
        <div>
          <RadioGroupItem value="hold-share" id="hold-share" className="peer sr-only" />
          <Label
            htmlFor="hold-share"
            className={`flex flex-col h-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200 ${
              isSelecting && lastSelected === "hold-share" ? "opacity-80 bg-secondary/5" : ""
            } ${selectedOption === "hold-share" ? "ring-2 ring-secondary/20 ring-offset-1" : ""}`}
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="p-0 pb-2 space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Users className={`h-5 w-5 text-secondary ${isSelecting && lastSelected === "hold-share" ? "animate-pulse" : ""}`} />
                  Hold & Share
                  <Badge variant="outline" className="ml-1 bg-secondary/10">$4 flat</Badge>
                </CardTitle>
                <CardDescription className="text-xs mt-1">Budget Option</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-2 text-sm">
                <p>You hold the spot for someone, and they join the line when near.</p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-secondary">Ideal for:</span> Long takeout lines, queues with no physical handover needed
                </p>
                <p className="text-secondary font-medium">$0.75 per 4 minutes waited</p>
                <p className="text-xs text-muted-foreground">Platform fee: $1.00 base</p>
                <p className="text-xs text-muted-foreground">Q Agent deduction: $0.75 for under 1 hour</p>
              </CardContent>
            </Card>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem value="hold-switch" id="hold-switch" className="peer sr-only" />
          <Label
            htmlFor="hold-switch"
            className={`flex flex-col h-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200 ${
              isSelecting && lastSelected === "hold-switch" ? "opacity-80 bg-primary/5" : ""
            } ${selectedOption === "hold-switch" ? "ring-2 ring-primary/20 ring-offset-1" : ""}`}
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="p-0 pb-2 space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className={`h-5 w-5 text-primary ${isSelecting && lastSelected === "hold-switch" ? "animate-pulse" : ""}`} />
                  Hold & Switch
                  <Badge variant="outline" className="ml-1 bg-primary/10">$7 flat</Badge>
                </CardTitle>
                <CardDescription className="text-xs mt-1">Premium Option</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-2 text-sm">
                <p>You wait in line and fully switch places with the requester.</p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-primary">Ideal for:</span> Popular concerts, sneaker drops, passport offices
                </p>
                <p className="text-primary font-medium">$1.25 per 4 minutes waited</p>
                <p className="text-xs text-muted-foreground">Platform fee: $1.50 base</p>
                <p className="text-xs text-muted-foreground">Q Agent deduction: $0.75 for under 1 hour</p>
              </CardContent>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceOptions;
