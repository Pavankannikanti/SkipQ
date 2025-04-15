
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import RequestCard, { RequestStatus } from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Search as SearchIcon,
  ChevronDown,
  ArrowRight,
  Bell
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import EarningsDashboard from "@/components/EarningsDashboard";
import { initializeNotifications, subscribeToNearbyJobs, setupMessageListener } from "@/lib/notifications";
import { toast } from "sonner";
import JobTracker from "@/components/JobTracker";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigate = useNavigate();
  
  // Check if notifications are enabled on component mount
  useEffect(() => {
    const checkNotificationPermission = async () => {
      const permission = await Notification.permission;
      setNotificationsEnabled(permission === "granted");
      
      if (permission === "granted") {
        // Set up the message listener for FCM
        setupMessageListener();
      }
    };
    
    checkNotificationPermission();
  }, []);
  
  const enableNotifications = async () => {
    try {
      const token = await initializeNotifications();
      if (token) {
        // Subscribe to nearby jobs (default 5km radius)
        // In a real app, we would get the user's actual location
        await subscribeToNearbyJobs(43.6532, -79.3832, 5); // Toronto coordinates
        
        setNotificationsEnabled(true);
        toast.success("Notifications enabled successfully!");
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      toast.error("Failed to enable notifications");
    }
  };
  
  // Mock data (would be replaced with real data from Firestore)
  const stats = {
    totalEarnings: 285.00,
    activeRequests: 2,
    completedRequests: 8,
    averageWaitTime: 52, // minutes
    positiveRatings: 96 // percentage
  };
  
  // Your Requests
  const yourRequests = [
    {
      id: "1",
      title: "Wait in line at CN Tower observation deck",
      location: "CN Tower, Toronto",
      estimatedTime: "1-2 hours",
      payment: 25.00,
      status: "open" as RequestStatus
    },
    {
      id: "2",
      title: "Need someone to wait for customs at Pearson T1",
      location: "Toronto Pearson Airport, Terminal 1",
      estimatedTime: "30-45 min",
      payment: 20.00,
      status: "in-progress" as RequestStatus
    }
  ];
  
  // Your Waiting Jobs
  const yourWaitingJobs = [
    {
      id: "3",
      title: "Line waiter needed at new iPhone release",
      location: "Apple Store, Eaton Centre",
      estimatedTime: "3-4 hours",
      payment: 45.00,
      status: "in-progress" as RequestStatus,
      username: "Sarah M.",
      userInitials: "SM",
      timeElapsed: 45, // minutes
      totalEstimatedTime: 180 // minutes
    }
  ];
  
  // Recent activity feed
  const recentActivity = [
    {
      id: "a1",
      type: "payment_received",
      message: "You received a payment of $32.50 for waiting at IKEA",
      time: "2 hours ago"
    },
    {
      id: "a2",
      type: "request_accepted",
      message: "Michael K. accepted your request at Pearson Airport",
      time: "5 hours ago"
    },
    {
      id: "a3",
      type: "job_completed",
      message: "You completed a waiting job at Toronto Zoo",
      time: "Yesterday"
    },
    {
      id: "a4",
      type: "new_request",
      message: "You created a new request at CN Tower",
      time: "2 days ago"
    }
  ];
  
  // Recommended jobs
  const recommendedJobs = [
    {
      id: "r1",
      title: "Wait in line at ROM special exhibit",
      location: "Royal Ontario Museum, Toronto",
      estimatedTime: "1 hour",
      payment: 18.00,
      status: "open" as RequestStatus
    },
    {
      id: "r2",
      title: "Concert ticket pickup at Scotiabank Arena",
      location: "Scotiabank Arena, Toronto",
      estimatedTime: "45 min",
      payment: 15.00,
      status: "open" as RequestStatus
    }
  ];

  return (
    <Layout>
      <div className="container max-w-5xl">
        <div className="flex flex-col space-y-8">
          
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, user!</p>
            </div>
            
            {!notificationsEnabled && (
              <Button onClick={enableNotifications} className="gap-2">
                <Bell className="h-4 w-4" />
                Enable Notifications
              </Button>
            )}
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <span className="text-muted-foreground text-sm">Total Earnings</span>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-xl font-bold">${stats.totalEarnings.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col">
                <span className="text-muted-foreground text-sm">Requests</span>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-xl font-bold">{stats.activeRequests} Active</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col">
                <span className="text-muted-foreground text-sm">Completed</span>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-xl font-bold">{stats.completedRequests}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col">
                <span className="text-muted-foreground text-sm">Rating</span>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="text-xl font-bold">{stats.positiveRatings}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="findJobs">Find Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Active Job Tracker */}
              {yourWaitingJobs.length > 0 && (
                <JobTracker jobId={yourWaitingJobs[0].id} />
              )}
            
              {/* Your Requests */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Your Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {yourRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {yourRequests.map(request => (
                        <RequestCard key={request.id} {...request} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You don't have any active requests</p>
                      <Button onClick={() => navigate("/new-request")}>Create a Request</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Your Waiting Jobs */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Your Waiting Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {yourWaitingJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {yourWaitingJobs.map(job => (
                        <RequestCard key={job.id} {...job} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">You're not waiting in any lines right now</p>
                      <Button variant="outline" onClick={() => navigate("/find-jobs")}>
                        <SearchIcon className="mr-2 h-4 w-4" />
                        Find Waiting Jobs
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {recentActivity.map(activity => (
                      <li key={activity.id} className="flex items-start justify-between pb-2 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 text-muted-foreground">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings">
              <EarningsDashboard />
            </TabsContent>
            
            <TabsContent value="findJobs" className="space-y-6">
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for waiting jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Recommended Jobs Near You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedJobs.map(job => (
                      <RequestCard key={job.id} {...job} />
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" onClick={() => navigate("/find-jobs")}>
                      Browse All Jobs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
