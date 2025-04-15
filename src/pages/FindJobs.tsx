
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import JobFeed from "@/components/JobFeed";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, BellPlus, Users, UserPlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ServiceAreaFilter from "@/components/ServiceAreaFilter";
import { subscribeToNearbyJobs } from "@/lib/notifications";
import { toast } from "sonner";

const FindJobs = () => {
  const [jobType, setJobType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>("toronto"); // Default to Toronto
  const [availableForJobs, setAvailableForJobs] = useState(false);
  const [location, setLocation] = useState("");
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  
  // Handle the "Near Me" button click
  const handleNearMeClick = () => {
    if (navigator.geolocation) {
      setIsUsingCurrentLocation(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use reverse geocoding to get the address
          setLocation("Current location");
          
          // Subscribe to nearby jobs with the user's coordinates
          subscribeToNearbyJobs(
            position.coords.latitude,
            position.coords.longitude,
            5
          ).then(() => {
            toast.success("Subscribed to nearby jobs");
          });
          
          setIsUsingCurrentLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location");
          setIsUsingCurrentLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };
  
  // Update available for jobs status
  const toggleAvailability = (checked: boolean) => {
    setAvailableForJobs(checked);
    
    // In a real app, we would update this status in the backend
    if (checked) {
      toast.success("You're now available for jobs!");
    } else {
      toast.info("You're no longer available for jobs");
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Find Line Assistance Jobs</h1>
            <p className="text-muted-foreground mt-1">
              Browse and accept available line assistance requests
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by title or location..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between">
              <div className="relative w-full mr-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Current location..." 
                  className="pl-9" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={handleNearMeClick}
                disabled={isUsingCurrentLocation}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isUsingCurrentLocation ? "Getting Location..." : "Near Me"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="available-mode" 
                  checked={availableForJobs}
                  onCheckedChange={toggleAvailability}
                />
                <Label htmlFor="available-mode">Available for jobs</Label>
              </div>
              
              <Button variant="ghost" size="sm">
                <BellPlus className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </div>
            
            <ServiceAreaFilter 
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
            />
            
            <div className="flex justify-between items-center border-t border-border/50 pt-4 mt-2">
              <div className="text-sm font-medium">Filter by job type:</div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All job types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All job types</SelectItem>
                  <SelectItem value="hold-switch">
                    <div className="flex items-center">
                      Hold & Switch
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">$7 flat</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="hold-share">
                    <div className="flex items-center">
                      Hold & Share
                      <Badge variant="outline" className="ml-2 bg-secondary/10 text-xs">$4 flat</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div className="flex items-start p-3 border rounded-lg bg-background hover:bg-accent/5 transition-colors">
                <UserPlus className="h-6 w-6 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">Hold & Switch</h3>
                  <p className="text-sm text-muted-foreground">Premium service where the Q Agent fully switches places with the requester</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-primary font-medium">$7 flat + $1.00 per 4 minutes</p>
                    <p className="text-xs text-muted-foreground">Platform fee: $2.00 for 1+ hour, increases by $0.50 every 30 min</p>
                    <p className="text-xs text-muted-foreground">Q Agent deduction: $0.75 for waits under 1 hour, +$0.50 per 30 min after</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-3 border rounded-lg bg-background hover:bg-accent/5 transition-colors">
                <Users className="h-6 w-6 mr-3 text-secondary" />
                <div>
                  <h3 className="font-medium">Hold & Share</h3>
                  <p className="text-sm text-muted-foreground">Budget option where the requester joins the Q Agent in line when near</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-secondary font-medium">$4 flat + $0.50 per 4 minutes</p>
                    <p className="text-xs text-muted-foreground">Platform fee: $1.00 for under 1 hour, increases by $0.50 every 30 min</p>
                    <p className="text-xs text-muted-foreground">Q Agent deduction: $0.75 for waits under 1 hour, +$0.50 per 30 min after</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <JobFeed cityFilter={selectedCity} jobTypeFilter={jobType} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindJobs;
