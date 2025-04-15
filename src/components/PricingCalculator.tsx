
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PricingCalculator = () => {
  const [serviceType, setServiceType] = useState<string>("hold-switch");
  const [waitTime, setWaitTime] = useState<number[]>([60]); // default 60 minutes
  const [rushFee, setRushFee] = useState<boolean>(false);
  
  // Calculate pricing based on selected options and updated platform fee structure
  const calculatePricing = () => {
    const waitTimeMinutes = waitTime[0];
    const fourMinIntervals = Math.ceil(waitTimeMinutes / 4);
    
    // Base calculations
    const isHoldSwitch = serviceType === "hold-switch";
    const basePrice = isHoldSwitch ? 7 : 4;
    const perIntervalRate = isHoldSwitch ? 1.25 : 0.75;
    
    // Calculate time-based fee
    const timeBasedFee = fourMinIntervals * perIntervalRate;
    
    // Updated platform fee structure based on wait time
    let platformFee = isHoldSwitch ? 1.50 : 1.00;
    if (waitTimeMinutes > 120) { // More than 2 hours
      platformFee = 2.5;
    } else if (waitTimeMinutes > 90) { // More than 1.5 hours
      platformFee = 2.0;
    } else if (waitTimeMinutes > 60) { // More than 1 hour
      platformFee = 1.75;
    }
    
    // Optional rush fee
    const rushFeeAmount = rushFee ? 2.5 : 0;
    
    // Subtotal before tax
    const subtotal = basePrice + timeBasedFee + platformFee + rushFeeAmount;
    
    // HST (13%)
    const hst = subtotal * 0.13;
    
    // Total with tax
    const total = subtotal + hst;
    
    // Updated Q Agent deductions
    let agentDeduction = 0.75; // Base deduction for under 1 hour
    
    // Add 0.5 for every 30 minutes beyond 1 hour
    if (waitTimeMinutes > 60) {
      const additionalHalfHours = Math.floor((waitTimeMinutes - 60) / 30);
      agentDeduction += additionalHalfHours * 0.5;
    }
    
    // Q Agent earnings (total minus platform fee minus HST minus agent deduction)
    const qAgentEarnings = basePrice + timeBasedFee - agentDeduction;
    
    return {
      basePrice,
      timeBasedFee,
      platformFee,
      rushFeeAmount,
      subtotal,
      hst,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      qAgentEarnings,
      agentDeduction
    };
  };
  
  const pricing = calculatePricing();
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pricing Calculator</h2>
      
      <Tabs value={serviceType} onValueChange={setServiceType} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="hold-switch" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Hold & Switch
            <Badge variant="outline" className="ml-1 bg-primary/10 hidden sm:flex">$7</Badge>
          </TabsTrigger>
          <TabsTrigger value="hold-share" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Hold & Share
            <Badge variant="outline" className="ml-1 bg-secondary/10 hidden sm:flex">$4</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estimated Wait Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Wait time:</span>
              <span className="font-medium">{waitTime[0]} minutes</span>
            </div>
            <Slider
              min={15}
              max={240}
              step={15}
              value={waitTime}
              onValueChange={setWaitTime}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>15 min</span>
              <span>1 hour</span>
              <span>2 hours</span>
              <span>4 hours</span>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <Switch
                id="rush-fee"
                checked={rushFee}
                onCheckedChange={setRushFee}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="rush-fee">Rush service (+$2.50)</Label>
                <p className="text-sm text-muted-foreground">
                  For jobs starting in less than 15 min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Base price:</span>
              <span>${pricing.basePrice.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between">
              <span>Time rate ({waitTime[0]} min):</span>
              <span>${pricing.timeBasedFee.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee:</span>
              <span>${pricing.platformFee.toFixed(2)} CAD</span>
              {waitTime[0] > 60 && (
                <span className="text-xs text-muted-foreground">(increased for {waitTime[0]} min)</span>
              )}
            </div>
            {rushFee && (
              <div className="flex justify-between">
                <span>Rush fee:</span>
                <span>${pricing.rushFeeAmount.toFixed(2)} CAD</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>HST (13%):</span>
              <span>${pricing.hst.toFixed(2)} CAD</span>
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-medium">
              <span>Total:</span>
              <span>${pricing.total.toFixed(2)} CAD</span>
            </div>
            <div className="mt-3 pt-3 bg-muted/30 p-3 rounded-md">
              <div className="flex justify-between text-sm">
                <span>Q Agent earns:</span>
                <span className="font-medium">${pricing.qAgentEarnings.toFixed(2)} CAD</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Platform deduction:</span>
                <span>${pricing.agentDeduction.toFixed(2)} CAD</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingCalculator;
