import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Layout from "@/components/Layout";
import LocationCard from "@/components/LocationCard";
import RequestCard from "@/components/RequestCard";
import ServicePosts from "@/components/ServicePosts"; 
import PricingCards from "@/components/PricingCards";
import PricingCalculator from "@/components/PricingCalculator";
import OnboardingFlow from "@/components/OnboardingFlow";
import JobCompletionFlow from "@/components/JobCompletionFlow";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Info } from "lucide-react";
import { holdSwitchPosts, holdSharePosts } from "@/data/sampleRequests";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import ServiceAreaFilter from "@/components/ServiceAreaFilter";

const Index = () => {
  // State for city selection
  const [selectedCity, setSelectedCity] = useState<string | null>("toronto");
  
  // State for onboarding flows
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userType, setUserType] = useState<'requester' | 'agent'>('requester');
  
  // State for job completion demo
  const [showJobCompletion, setShowJobCompletion] = useState(false);
  
  // Sample data for locations and requests
  const [popularLocations, setPopularLocations] = useState([
    {
      id: "1",
      name: "CN Tower",
      image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=1000&auto=format&fit=crop",
      address: "290 Bremner Blvd, Toronto",
      waitTime: "45-60 min",
      isPopular: true,
      activeRequests: 3
    },
    {
      id: "2",
      name: "Toronto Pearson Airport",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
      address: "Toronto Pearson International Airport",
      waitTime: "30-45 min",
      isPopular: true,
      activeRequests: 5
    },
    {
      id: "3",
      name: "Eaton Centre",
      image: "https://images.unsplash.com/photo-1622020457014-24a745608d53?q=80&w=1000&auto=format&fit=crop",
      address: "220 Yonge St, Toronto",
      waitTime: "20-30 min",
      isPopular: true,
      activeRequests: 2
    },
    {
      id: "4",
      name: "Ripley's Aquarium",
      image: "https://images.unsplash.com/photo-1582120031356-8666741a14ab?q=80&w=1000&auto=format&fit=crop",
      address: "288 Bremner Blvd, Toronto",
      waitTime: "60-90 min",
      isPopular: true,
      activeRequests: 4
    }
  ]);
  
  const [recentRequests, setRecentRequests] = useState([
    {
      id: "1",
      title: "Wait in line at CN Tower observation deck",
      location: "CN Tower, Toronto",
      estimatedTime: "1-2 hours",
      payment: 25.00,
      status: "open" as const,
      username: "Sarah M.",
      userInitials: "SM",
      postedAt: "10 min ago"
    },
    {
      id: "2",
      title: "Need someone to wait for customs at Pearson T1",
      location: "Toronto Pearson Airport, Terminal 1",
      estimatedTime: "30-45 min",
      payment: 20.00,
      status: "open" as const,
      username: "Michael K.",
      userInitials: "MK",
      postedAt: "25 min ago"
    },
    {
      id: "3",
      title: "Line Q Agent needed at new iPhone release",
      location: "Apple Store, Eaton Centre",
      estimatedTime: "3-4 hours",
      payment: 45.00,
      status: "in-progress" as const,
      username: "David L.",
      userInitials: "DL",
      postedAt: "2 hours ago"
    }
  ]);
  
  // Check if it's the user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('skipq-visited');
    
    if (!hasVisited) {
      // Show onboarding after a slight delay for better UX
      setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      
      localStorage.setItem('skipq-visited', 'true');
    }
  }, []);
  
  // Fetch popular locations when city changes
  useEffect(() => {
    const fetchPopularLocations = async () => {
      try {
        // In a real app, this would query Firestore for popular locations
        // filtered by the selected city
        
        // For now, we'll just use our mock data
        if (selectedCity) {
          // Filter locations based on selected city (simulated)
          // In a real app, this would be a database query
          console.log(`Fetched popular locations for ${selectedCity}`);
        }
      } catch (error) {
        console.error("Error fetching popular locations:", error);
      }
    };
    
    fetchPopularLocations();
  }, [selectedCity]);
  
  // Fetch recent requests when city changes
  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        // In a real app, this would query Firestore for recent requests
        // filtered by the selected city
        
        // For now, we'll just use our mock data
        if (selectedCity) {
          // Filter requests based on selected city (simulated)
          // In a real app, this would be a database query
          console.log(`Fetched recent requests for ${selectedCity}`);
        }
      } catch (error) {
        console.error("Error fetching recent requests:", error);
      }
    };
    
    fetchRecentRequests();
  }, [selectedCity]);

  // Handle user role selection for onboarding
  const handleShowOnboarding = (type: 'requester' | 'agent') => {
    setUserType(type);
    setShowOnboarding(true);
  };

  // Show job completion demo
  const showJobCompletionDemo = () => {
    toast.info("Showing job completion demo", {
      description: "This is how users will complete and review jobs",
      duration: 5000,
      icon: <Info className="h-4 w-4" />
    });
    setShowJobCompletion(true);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-16 md:space-y-24 pb-16">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Service Area Selection */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Service Areas</h2>
              <p className="text-muted-foreground">Select your city to see local availability</p>
            </div>
            
            <ServiceAreaFilter 
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
            />
            
            {/* Onboarding Demo Buttons */}
            <div className="mt-8 p-4 border border-dashed border-muted rounded-md bg-muted/30">
              <h3 className="text-sm font-medium mb-3">UI/UX Demos:</h3>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" onClick={() => handleShowOnboarding('requester')}>
                  Try Requester Onboarding
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleShowOnboarding('agent')}>
                  Try Q Agent Onboarding
                </Button>
                <Button size="sm" variant="outline" onClick={showJobCompletionDemo}>
                  Try Job Completion Flow
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Posts Section */}
        <ServicePosts 
          holdSwitchPosts={holdSwitchPosts.filter(post => !selectedCity || post.city === selectedCity)}
          holdSharePosts={holdSharePosts.filter(post => !selectedCity || post.city === selectedCity)}
          maxPerTab={6}
        />
        
        {/* Pricing Section - Now using our PricingCards component */}
        <PricingCards />
        
        {/* Pricing Calculator Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <PricingCalculator />
          </div>
        </section>
        
        {/* Popular Locations Section */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Popular Locations</h2>
                <p className="text-muted-foreground mt-1">
                  {selectedCity ? `Busy places in ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}` : "Busy places with the most wait requests"}
                </p>
              </div>
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/locations">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularLocations.map((location) => (
                <LocationCard key={location.id} {...location} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Requests Section */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Recent Requests</h2>
                <p className="text-muted-foreground mt-1">Latest line-waiting opportunities</p>
              </div>
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/browse">
                  Browse All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRequests.map((request) => (
                <RequestCard key={request.id} {...request} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to skip the line?</h2>
                  <p className="text-primary-foreground/90 max-w-md">
                    Post your request now and connect with Q Agents in your area. New pricing available!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-black hover:bg-white/90 transition-colors shadow-lg font-medium rounded-full px-8"
                  >
                    <Link to="/new-request">Post a Request</Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300 shadow-md font-medium rounded-full px-8"
                  >
                    <Link to="/find-jobs">Become a Q Agent</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Onboarding Flow Component */}
      <OnboardingFlow 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding}
        userType={userType}
      />
      
      {/* Job Completion Flow Demo */}
      <JobCompletionFlow
        open={showJobCompletion}
        onOpenChange={setShowJobCompletion}
        jobId="DEMO-12345"
        jobTitle="Wait in line at Apple Store for iPhone launch"
        agentName="Alex Johnson"
        waitTime="1 hour 15 minutes"
        totalAmount={28.75}
      />
    </Layout>
  );
};

export default Index;
