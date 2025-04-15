
import { useState } from "react";
import Layout from "@/components/Layout";
import RequestCard, { RequestStatus } from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Clock, 
  Filter,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [maxDistance, setMaxDistance] = useState([5]); // in km
  const [minPayment, setMinPayment] = useState([15]); // in dollars
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample request data
  const requests = [
    {
      id: "1",
      title: "Wait in line at CN Tower observation deck",
      location: "CN Tower, Toronto",
      estimatedTime: "1-2 hours",
      payment: 25.00,
      status: "open" as RequestStatus,
      username: "Sarah M.",
      userInitials: "SM",
      postedAt: "10 min ago",
      distance: "0.8 km"
    },
    {
      id: "2",
      title: "Need someone to wait for customs at Pearson T1",
      location: "Toronto Pearson Airport, Terminal 1",
      estimatedTime: "30-45 min",
      payment: 20.00,
      status: "open" as RequestStatus,
      username: "Michael K.",
      userInitials: "MK",
      postedAt: "25 min ago",
      distance: "18.5 km"
    },
    {
      id: "3",
      title: "Line waiter needed at new iPhone release",
      location: "Apple Store, Eaton Centre",
      estimatedTime: "3-4 hours",
      payment: 45.00,
      status: "open" as RequestStatus,
      username: "David L.",
      userInitials: "DL",
      postedAt: "2 hours ago",
      distance: "1.2 km"
    },
    {
      id: "4",
      title: "Wait for table at popular brunch spot",
      location: "Lady Marmalade, Toronto",
      estimatedTime: "1 hour",
      payment: 15.00,
      status: "open" as RequestStatus,
      username: "Jason T.",
      userInitials: "JT",
      postedAt: "3 hours ago",
      distance: "2.4 km"
    },
    {
      id: "5",
      title: "Wait in line at ROM special exhibit",
      location: "Royal Ontario Museum, Toronto",
      estimatedTime: "1 hour",
      payment: 18.00,
      status: "open" as RequestStatus,
      username: "Emma R.",
      userInitials: "ER",
      postedAt: "5 hours ago",
      distance: "3.1 km"
    },
    {
      id: "6",
      title: "Concert ticket pickup at Scotiabank Arena",
      location: "Scotiabank Arena, Toronto",
      estimatedTime: "45 min",
      payment: 15.00,
      status: "open" as RequestStatus,
      username: "Olivia P.",
      userInitials: "OP",
      postedAt: "6 hours ago",
      distance: "1.5 km"
    }
  ];
  
  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      // Search filter
      const matchesSearch = !searchQuery || 
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Location filter
      const matchesLocation = locationFilter === "all" || 
        request.location.toLowerCase().includes(locationFilter.toLowerCase());
        
      // Distance filter
      const distance = parseFloat(request.distance.split(" ")[0]);
      const matchesDistance = distance <= maxDistance[0];
      
      // Payment filter
      const matchesPayment = request.payment >= minPayment[0];
      
      return matchesSearch && matchesLocation && matchesDistance && matchesPayment;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortOrder === "nearest") {
        return parseFloat(a.distance.split(" ")[0]) - parseFloat(b.distance.split(" ")[0]);
      } else if (sortOrder === "highest-pay") {
        return b.payment - a.payment;
      } else if (sortOrder === "shortest-wait") {
        // Rough estimate based on text
        const getMinutes = (time: string) => {
          if (time.includes("hour")) {
            const hours = parseInt(time.split("-")[0]);
            return hours * 60;
          }
          return parseInt(time.split("-")[0]);
        };
        return getMinutes(a.estimatedTime) - getMinutes(b.estimatedTime);
      }
      // Default: newest first (just using the provided order as proxy)
      return 0;
    });

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "cn tower", label: "CN Tower" },
    { value: "eaton centre", label: "Eaton Centre" },
    { value: "pearson", label: "Pearson Airport" },
    { value: "rom", label: "Royal Ontario Museum" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "nearest", label: "Nearest" },
    { value: "highest-pay", label: "Highest Pay" },
    { value: "shortest-wait", label: "Shortest Wait" },
  ];

  return (
    <Layout>
      <div className="container max-w-5xl">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Browse Requests</h1>
            <p className="text-muted-foreground mt-1">Find line-waiting opportunities near you</p>
          </div>
          
          {/* Search & Filters */}
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4 ml-auto md:ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Options</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="distance">Max Distance: {maxDistance[0]} km</Label>
                      </div>
                      <Slider 
                        id="distance"
                        min={1} 
                        max={50} 
                        step={1} 
                        value={maxDistance}
                        onValueChange={setMaxDistance}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="payment">Min Payment: ${minPayment[0]}</Label>
                      </div>
                      <Slider 
                        id="payment"
                        min={5} 
                        max={100} 
                        step={5}
                        value={minPayment}
                        onValueChange={setMinPayment}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" />
                      <label
                        htmlFor="available"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Available now only
                      </label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Mobile filters (toggle) */}
            <div className="block md:hidden">
              <Button 
                variant="outline" 
                className="w-full justify-between" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <div className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <span>Advanced Filters</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              {showFilters && (
                <div className="mt-4 p-4 border rounded-md space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-distance">Max Distance: {maxDistance[0]} km</Label>
                    </div>
                    <Slider 
                      id="mobile-distance"
                      min={1} 
                      max={50} 
                      step={1} 
                      value={maxDistance}
                      onValueChange={setMaxDistance}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-payment">Min Payment: ${minPayment[0]}</Label>
                    </div>
                    <Slider 
                      id="mobile-payment"
                      min={5} 
                      max={100} 
                      step={5}
                      value={minPayment}
                      onValueChange={setMinPayment}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mobile-available" />
                    <label
                      htmlFor="mobile-available"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Available now only
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'} found
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <RequestCard key={request.id} {...request} />
                ))
              ) : (
                <div className="col-span-2 py-12 text-center">
                  <p className="text-muted-foreground mb-4">No requests found matching your filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setLocationFilter("all");
                      setMaxDistance([5]);
                      setMinPayment([15]);
                      setSortOrder("newest");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
