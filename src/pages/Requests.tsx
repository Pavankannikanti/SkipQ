import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import RequestCard, { RequestStatus } from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Requests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Sample data - active requests
  const activeRequests = [
    {
      id: "1",
      title: "Wait in line at CN Tower observation deck",
      location: "CN Tower, Toronto",
      estimatedTime: "1-2 hours",
      payment: 25.00,
      status: "open" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "10 min ago"
    },
    {
      id: "2",
      title: "Need someone to wait for customs at Pearson T1",
      location: "Toronto Pearson Airport, Terminal 1",
      estimatedTime: "30-45 min",
      payment: 20.00,
      status: "in-progress" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "25 min ago"
    },
    {
      id: "3",
      title: "Q Agent needed at new iPhone release",
      location: "Apple Store, Eaton Centre",
      estimatedTime: "3-4 hours",
      payment: 45.00,
      status: "open" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "2 hours ago"
    },
    {
      id: "4",
      title: "Wait for table at Canoe Restaurant",
      location: "Canoe Restaurant, Toronto",
      estimatedTime: "1 hour",
      payment: 15.00,
      status: "open" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "3 hours ago"
    }
  ];

  // Completed requests
  const completedRequests = [
    {
      id: "5",
      title: "Wait in line at ROM special exhibit",
      location: "Royal Ontario Museum, Toronto",
      estimatedTime: "1 hour",
      payment: 18.00,
      status: "completed" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "2 days ago"
    },
    {
      id: "6",
      title: "Concert ticket pickup at Scotiabank Arena",
      location: "Scotiabank Arena, Toronto",
      estimatedTime: "45 min",
      payment: 15.00,
      status: "completed" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "1 week ago"
    }
  ];

  // Draft requests
  const draftRequests = [
    {
      id: "7",
      title: "Wait at Service Ontario - Passport renewal",
      location: "Service Ontario - Bay St, Toronto",
      estimatedTime: "2-3 hours",
      payment: 30.00,
      status: "open" as RequestStatus,
      username: "You",
      userInitials: "YO",
      postedAt: "Draft"
    }
  ];

  // All requests combined
  const allRequests = [...activeRequests, ...completedRequests, ...draftRequests];

  // Filter requests based on search query
  const filterRequests = (requests: typeof activeRequests) => {
    if (!searchQuery) return requests;
    
    return requests.filter(request => 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Layout>
      <div className="container max-w-5xl">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Requests</h1>
              <p className="text-muted-foreground mt-1">Manage all your line waiting requests</p>
            </div>
            
            <Button onClick={() => navigate("/new-request")} className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 uber-input"
            />
          </div>
          
          <div className="bg-background rounded-lg overflow-hidden">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-none bg-muted/50 p-0 h-auto">
                <TabsTrigger value="all" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">All</TabsTrigger>
                <TabsTrigger value="active" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Active</TabsTrigger>
                <TabsTrigger value="completed" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Completed</TabsTrigger>
                <TabsTrigger value="drafts" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Drafts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="p-0 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterRequests(allRequests).length > 0 ? (
                    filterRequests(allRequests).map((request) => (
                      <RequestCard key={request.id} {...request} />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <p className="text-muted-foreground">No requests found. Try a different search term.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="p-0 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterRequests(activeRequests).length > 0 ? (
                    filterRequests(activeRequests).map((request) => (
                      <RequestCard key={request.id} {...request} />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <p className="text-muted-foreground">No active requests found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="p-0 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterRequests(completedRequests).length > 0 ? (
                    filterRequests(completedRequests).map((request) => (
                      <RequestCard key={request.id} {...request} />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <p className="text-muted-foreground">No completed requests found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="drafts" className="p-0 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterRequests(draftRequests).length > 0 ? (
                    filterRequests(draftRequests).map((request) => (
                      <RequestCard key={request.id} {...request} />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center">
                      <p className="text-muted-foreground">No draft requests found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
