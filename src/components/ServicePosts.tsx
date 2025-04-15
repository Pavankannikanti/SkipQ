
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sliders } from "lucide-react";
import RequestCard from "@/components/RequestCard";
import { RequestData } from "@/data/sampleRequests";

interface ServicePostsProps {
  holdSwitchPosts: RequestData[];
  holdSharePosts: RequestData[];
  maxPerTab?: number;
}

const ServicePosts: React.FC<ServicePostsProps> = ({
  holdSwitchPosts,
  holdSharePosts,
  maxPerTab = 6
}) => {
  const [activeTab, setActiveTab] = useState("hold-switch");

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Service Posts</h2>
            <p className="text-muted-foreground mt-1">Choose from our waiting service options</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Sliders className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button asChild variant="outline" className="gap-2">
              <Link to="/browse">
                View All
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="hold-switch" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Hold &amp; Switch
            </TabsTrigger>
            <TabsTrigger value="hold-share" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Hold &amp; Share
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hold-switch" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {holdSwitchPosts.slice(0, maxPerTab).map((post) => (
                <RequestCard 
                  key={post.id} 
                  {...post} 
                />
              ))}
            </div>
            {holdSwitchPosts.length > maxPerTab && (
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <Link to="/browse">View More Hold &amp; Switch</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hold-share" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {holdSharePosts.slice(0, maxPerTab).map((post) => (
                <RequestCard 
                  key={post.id} 
                  {...post} 
                />
              ))}
            </div>
            {holdSharePosts.length > maxPerTab && (
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <Link to="/browse">View More Hold &amp; Share</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ServicePosts;
