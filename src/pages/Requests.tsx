import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import RequestCard, { RequestStatus } from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Requests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const fetchRequests = async () => {
      setLoading(true);
      const q = query(
        collection(db, "requests"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchRequests();
  }, [currentUser]);

  // Filter requests based on search query
  const filterRequests = (reqs: any[]) => {
    if (!searchQuery) return reqs;
    return reqs.filter(request =>
      request.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (!currentUser) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Please sign in to view your requests.</h2>
        </div>
      </Layout>
    );
  }

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
            <Input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 uber-input"
            />
          </div>
          <div className="bg-background rounded-lg overflow-hidden">
            {loading ? (
              <div className="py-12 text-center">Loading...</div>
            ) : requests.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p>You have no requests yet. Create your first request!</p>
                <Button onClick={() => navigate("/new-request")} className="mt-4">
                  <Plus className="h-4 w-4" />
                  Create Request
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full grid grid-cols-4 rounded-none bg-muted/50 p-0 h-auto">
                  <TabsTrigger value="all" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">All</TabsTrigger>
                  <TabsTrigger value="active" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Active</TabsTrigger>
                  <TabsTrigger value="completed" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Completed</TabsTrigger>
                  <TabsTrigger value="drafts" className="py-3 rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="p-0 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRequests(requests).map(request => (
                      <RequestCard key={request.id} {...request} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="active" className="p-0 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRequests(requests.filter(r => r.status === "open" || r.status === "in-progress")).map(request => (
                      <RequestCard key={request.id} {...request} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="p-0 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRequests(requests.filter(r => r.status === "completed")).map(request => (
                      <RequestCard key={request.id} {...request} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="drafts" className="p-0 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterRequests(requests.filter(r => r.status === "draft")).map(request => (
                      <RequestCard key={request.id} {...request} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
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
