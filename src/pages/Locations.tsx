import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";
import LocationCard from "@/components/LocationCard";

// Sample location data
const sampleLocations = [
  {
    id: "1",
    name: "Downtown Mall",
    image: "https://images.unsplash.com/photo-1519567241046-7bc37b40aea9?q=80&w=2574&auto=format&fit=crop",
    address: "123 Main St, Downtown",
    waitTime: "15-20 min",
    isPopular: true,
    activeRequests: 3
  },
  {
    id: "2",
    name: "Central Park",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop",
    address: "45 Park Ave, Midtown",
    waitTime: "5-10 min",
    activeRequests: 1
  },
  {
    id: "3",
    name: "City Museum",
    image: "https://images.unsplash.com/photo-1566127444988-858a7053a85f?q=80&w=2670&auto=format&fit=crop",
    address: "789 Culture Blvd, Artsville",
    waitTime: "30-40 min",
    isPopular: true,
    activeRequests: 5
  },
  {
    id: "4",
    name: "Beach Boardwalk",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop",
    address: "1 Ocean Dr, Beachside",
    waitTime: "10-15 min",
    activeRequests: 2
  }
];

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredLocations = sampleLocations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
            <p className="text-muted-foreground">Browse and select locations where you need a Q Agent</p>
          </div>
          <div className="relative w-full md:w-72">
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Popular Locations</CardTitle>
                <CardDescription>Browse available locations or search to find a specific place</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <div 
                        key={location.id} 
                        onClick={() => setSelectedLocation(location.id)}
                        className={`cursor-pointer ${selectedLocation === location.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      >
                        <LocationCard {...location} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center">
                      <p className="text-muted-foreground">No locations found matching your search</p>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border border-border/60 h-[500px]">
              <CardHeader className="pb-2">
                <CardTitle>Location Map</CardTitle>
                <CardDescription>Interactive map to select your location</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[420px]">
                <LocationPicker />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Locations;
