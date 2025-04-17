import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import JoinWaitlistForm from "@/components/JoinWaitlistForm";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    // Delay the animation slightly for better effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-12 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className={`transition-all duration-700 ease-out delay-100 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-2 py-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary" />
                <span>Skip the line. Save time.</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="text-primary">Never Wait</span> in Line Again
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hire a Q Agent to wait in line for you at busy places. Pay only for the time they wait.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Button asChild size="lg" className="text-md px-8 rounded-full shadow-md hover:shadow-lg transition-all">
              <Link to="/new-request">Post a Request</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-md px-8 rounded-full">
              <Link to="/find-jobs">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
          </div>
          
          <div className={`pt-8 transition-all duration-700 ease-out delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <a 
              href="#how-it-works" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowDownCircle className="h-4 w-4 mr-2 animate-pulse-slow" />
              See how it works
            </a>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Hero;
