
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookmarkCheck, Star, Bookmark, MapPin, Heart, X } from "lucide-react";
import { toast } from "sonner";
import RequestCard, { RequestCardProps } from "@/components/RequestCard";
import LocationCard from "@/components/LocationCard";

// Sample favorite requests
const favRequests = [
  {
    id: "req1",
    title: "Wait in line at DMV",
    location: "San Francisco DMV, 1377 Fell St",
    estimatedTime: "1-2 hours",
    payment: 25.00,
    status: "open",
    username: "johndoe",
    userInitials: "JD",
    jobType: "hold-switch"
  },
  {
    id: "req2",
    title: "Hold spot at popular restaurant",
    location: "Zazie, 941 Cole St, San Francisco",
    estimatedTime: "30-45 min",
    payment: 15.00,
    status: "open",
    username: "sarahjane",
    userInitials: "SJ",
    jobType: "hold-share"
  }
] as RequestCardProps[];

// Sample favorite locations
const favLocations = [
  {
    id: "loc1",
    name: "San Francisco DMV",
    image: "https://images.unsplash.com/photo-1577017040065-650ee4d43339?auto=format&fit=crop&q=80&w=1000",
    address: "1377 Fell St, San Francisco, CA",
    waitTime: "1-2 hours",
    isPopular: true
  },
  {
    id: "loc2",
    name: "Zazie Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    address: "941 Cole St, San Francisco, CA",
    waitTime: "45-60 min",
    activeRequests: 3
  }
];

const Favorites = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("service-requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({
    requests: [...favRequests],
    locations: [...favLocations]
  });

  const handleRemoveFavorite = (type: "requests" | "locations", id: string) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    toast.success(`Removed from favorites!`);
  };

  // Filter favorites based on search query
  const filteredFavorites = {
    requests: favorites.requests.filter(req => 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.location.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    locations: favorites.locations.filter(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <BookmarkCheck className="mr-2 h-5 w-5 text-primary" />
              My Favorites
            </h1>
            <p className="text-muted-foreground">Your saved service requests and locations</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search favorites..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="service-requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Star className="mr-2 h-4 w-4" />
              Service Requests
            </TabsTrigger>
            <TabsTrigger value="locations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Locations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="service-requests" className="mt-0 space-y-4">
            {filteredFavorites.requests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFavorites.requests.map((request) => (
                  <Card key={request.id} className="relative group">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={() => handleRemoveFavorite("requests", request.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <RequestCard {...request} />
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>No favorite requests</CardTitle>
                  <p className="text-muted-foreground">
                    You haven't saved any service requests to your favorites yet.
                  </p>
                  <Button onClick={() => navigate("/browse")} className="mt-2">
                    Browse Requests
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="locations" className="mt-0 space-y-4">
            {filteredFavorites.locations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFavorites.locations.map((location) => (
                  <div key={location.id} className="relative group">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/80 hover:bg-white"
                      onClick={() => handleRemoveFavorite("locations", location.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <LocationCard {...location} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>No favorite locations</CardTitle>
                  <p className="text-muted-foreground">
                    You haven't saved any locations to your favorites yet.
                  </p>
                  <Button onClick={() => navigate("/locations")} className="mt-2">
                    Browse Locations
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Favorites;
