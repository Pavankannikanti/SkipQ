import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchJobs = async () => {
      setLoading(true);
      const q = query(
        collection(db, "requests"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      setJobs(querySnapshot.docs.map(doc => doc.data()));
      setLoading(false);
    };
    fetchJobs();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Please sign in to view your profile.</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg border-4 border-card">
              <AvatarImage src={currentUser.photoURL || undefined} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {currentUser.displayName
                  ? currentUser.displayName
                      .split(" ")
                      .map(word => word[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {currentUser.displayName || "New User"}
                </h1>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Verified</Badge>
              </div>
              <p className="text-muted-foreground mt-1">{currentUser.email}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Location not set</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                <span>Member since {currentUser.metadata?.creationTime
                  ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                  : "recently"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {loading ? (
              <div className="py-12 text-center">Loading...</div>
            ) : jobs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p>No work history yet. Start by posting your first request!</p>
              </div>
            ) : (
              <div>
                <h2 className="font-semibold mb-2">Your Jobs</h2>
                <ul>
                  {jobs.map((job, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="font-medium">{job.title}</span> — {job.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            <div className="py-12 text-center text-muted-foreground">
              {jobs.length === 0
                ? "No payment or review history yet."
                : "Feature coming soon."}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{review.author}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3.5 w-3.5 ${
                                      i < review.rating 
                                      ? "fill-amber-400 text-amber-400" 
                                      : "text-muted-foreground"
                                    }`} 
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mt-2">{review.comment}</p>
                        </div>
                      </div>
                      {reviews.indexOf(review) !== reviews.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <Card className="border border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-muted/30 rounded-lg p-4 border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                      <span className="font-bold">V</span>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 04/2025</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Badge className="bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/30">
                      Default
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4 w-full sm:w-auto">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border/40">
                    <div>
                      <p className="font-medium">Wait at CN Tower</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Yesterday</p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:text-right">
                      <p className="font-medium text-green-600">+$25.00</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border/40">
                    <div>
                      <p className="font-medium">Wait at Eaton Centre</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Last week</p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:text-right">
                      <p className="font-medium text-green-600">+$18.00</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border/40">
                    <div>
                      <p className="font-medium">Q Agent for Scotiabank Arena</p>
                      <p className="text-sm text-muted-foreground mt-0.5">2 weeks ago</p>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:text-right">
                      <p className="font-medium text-red-600">-$35.00</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Paid</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4 w-full sm:w-auto">
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
