
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock data for popular locations and their typical wait times
const popularLocations = [
  { id: "cn-tower", name: "CN Tower", avgWait: 60 },
  { id: "passport-office", name: "Passport Office", avgWait: 120 },
  { id: "service-ontario", name: "Service Ontario", avgWait: 45 },
  { id: "apple-store", name: "Apple Store", avgWait: 30 },
  { id: "chick-fil-a", name: "Chick-fil-A", avgWait: 15 },
];

// Time of day factors (multipliers for wait time)
const timeFactors = {
  morning: 0.8,    // Less busy in the morning
  midday: 1.3,     // Busier at lunch
  afternoon: 1.0,  // Average
  evening: 1.2,    // Busier in the evening
  weekend: 1.5,    // Busiest on weekends
};

const WaitTimeEstimator = () => {
  const [location, setLocation] = useState<string>("");
  const [customLocation, setCustomLocation] = useState<string>("");
  const [timeOfDay, setTimeOfDay] = useState<string>("afternoon");
  const [peopleAhead, setPeopleAhead] = useState<number[]>([10]);
  
  // Calculate estimated wait time based on inputs
  const calculateEstimatedWait = () => {
    // Base wait time: either from location or default
    let baseWait = 15; // Default minimum wait
    
    // If a known location is selected, use its average
    if (location && location !== "custom") {
      const selectedLocation = popularLocations.find(loc => loc.id === location);
      if (selectedLocation) {
        baseWait = selectedLocation.avgWait;
      }
    }
    
    // Factor in time of day
    const timeFactor = timeFactors[timeOfDay as keyof typeof timeFactors] || 1.0;
    
    // Factor in people ahead (each person adds ~2 minutes on average)
    const peopleFactor = peopleAhead[0] * 2;
    
    // Calculate final estimate
    let finalEstimate = Math.round((baseWait + peopleFactor) * timeFactor);
    
    // Ensure minimum wait time of 15 minutes
    finalEstimate = Math.max(finalEstimate, 15);
    
    return {
      estimatedMinutes: finalEstimate,
      estimatedRange: `${Math.max(finalEstimate - 10, 15)}-${finalEstimate + 10} min`,
      confidence: location !== "custom" ? "high" : "moderate",
    };
  };
  
  const waitEstimate = calculateEstimatedWait();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Wait Time Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {popularLocations.map(loc => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name} (avg: {loc.avgWait} min)
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom Location</SelectItem>
            </SelectContent>
          </Select>
          
          {location === "custom" && (
            <div className="mt-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Enter location name" 
                  className="pl-9"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Time of day</label>
          <Select value={timeOfDay} onValueChange={setTimeOfDay}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (Less busy)</SelectItem>
              <SelectItem value="midday">Midday (Very busy)</SelectItem>
              <SelectItem value="afternoon">Afternoon (Average)</SelectItem>
              <SelectItem value="evening">Evening (Busy)</SelectItem>
              <SelectItem value="weekend">Weekend (Very busy)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Estimated people ahead</label>
            <span className="font-medium">{peopleAhead[0]} people</span>
          </div>
          <div className="flex items-center gap-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <Slider
              min={1}
              max={50}
              step={1}
              value={peopleAhead}
              onValueChange={setPeopleAhead}
            />
          </div>
        </div>
        
        <div className="mt-8 bg-muted/30 p-4 rounded-lg">
          <div className="text-center">
            <h3 className="font-medium mb-2">Estimated Wait Time</h3>
            <p className="text-3xl font-bold text-primary mb-1">{waitEstimate.estimatedRange}</p>
            <p className="text-sm text-muted-foreground">
              Confidence: <span className="font-medium">{waitEstimate.confidence}</span>
            </p>
          </div>
          
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-sm mb-4">Estimated earnings for this wait:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/10 p-3 rounded text-center">
                <p className="text-sm font-medium">Hold & Share</p>
                <p className="text-xl font-bold mt-1">
                  ${(4 + (Math.ceil(waitEstimate.estimatedMinutes / 4) * 0.5)).toFixed(2)}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded text-center">
                <p className="text-sm font-medium">Hold & Switch</p>
                <p className="text-xl font-bold mt-1">
                  ${(7 + (Math.ceil(waitEstimate.estimatedMinutes / 4) * 1)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-4">Use This Estimate for Request</Button>
      </CardContent>
    </Card>
  );
};

export default WaitTimeEstimator;
