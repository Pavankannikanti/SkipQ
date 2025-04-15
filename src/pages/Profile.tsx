import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, DollarSign, MapPin, Star, ThumbsUp, User } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Job Success",
      value: "98%",
      icon: ThumbsUp,
      color: "text-green-500"
    },
    {
      title: "Response Rate",
      value: "100%",
      icon: Clock,
      color: "text-primary"
    },
    {
      title: "Jobs Completed",
      value: "24",
      icon: Star,
      color: "text-amber-500"
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "David L.",
      initials: "DL",
      rating: 5,
      date: "2 weeks ago",
      comment: "Michael was punctual and kept me updated throughout the entire wait. Excellent service!"
    },
    {
      id: 2,
      author: "Sarah M.",
      initials: "SM",
      rating: 5,
      date: "1 month ago",
      comment: "Very reliable and professional. Will definitely use his services again."
    },
    {
      id: 3,
      author: "Alex K.",
      initials: "AK",
      rating: 4,
      date: "2 months ago",
      comment: "Good communication and arrived on time. Saved me a lot of waiting."
    }
  ];

  const skills = [
    { name: "Fast Response", level: 95 },
    { name: "Communication", level: 90 },
    { name: "Reliability", level: 98 },
    { name: "Punctuality", level: 92 }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg border-4 border-card">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">MC</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Michael Chen</h1>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Verified</Badge>
              </div>
              <p className="text-muted-foreground mt-1">Q Agent & Customer</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Toronto, Canada</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                <span>Member since June 2023</span>
              </div>
              
              <div className="flex items-center text-sm text-amber-500">
                <Star className="h-4 w-4 mr-1 fill-amber-500" />
                <span className="font-medium">4.9</span>
                <span className="text-muted-foreground ml-1">(24 reviews)</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border border-border/60 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border/60 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    I'm a university student who's great at waiting in lines! I'm patient,
                    reliable, and always on time. Whether you need tickets for a concert or don't want to
                    wait in line at a popular restaurant, I'm your person. I'll keep you updated throughout
                    the wait and make sure you don't waste your valuable time.
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Skills</h4>
                    
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/60 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <p className="font-medium">Completed a waiting job at CN Tower</p>
                        <p className="text-sm text-muted-foreground mt-1">Yesterday</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <p className="font-medium">Received a 5-star review from Sarah M.</p>
                        <p className="text-sm text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div>
                        <p className="font-medium">Q Agent for Scotiabank Arena</p>
                        <p className="text-sm text-muted-foreground mt-1">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <Card className="border border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-3xl font-bold mb-1">4.9</p>
                    <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm min-w-8">{rating} star</span>
                        <Progress 
                          value={rating === 5 ? 85 : rating === 4 ? 15 : 0} 
                          className="h-2" 
                        />
                        <span className="text-sm min-w-8">
                          {rating === 5 ? '85%' : rating === 4 ? '15%' : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {review.initials}
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
