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
    <div className="relative w-full overflow-hidden py-8 sm:py-12 md:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none" />
      
      <div className="container relative z-10 px-3 sm:px-4 md:px-6">
        <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto text-center space-y-7 sm:space-y-8">
          <div className={`transition-all duration-700 ease-out delay-100 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="inline-block mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 py-1 px-3 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary" />
                <span>Skip the line. Save time.</span>
              </div>
            </div>
            
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter break-words">
              <span className="text-primary">Never Wait</span> in Line Again
            </h1>
            
            <p className="mt-4 sm:mt-6 text-base xs:text-lg md:text-xl text-muted-foreground max-w-[90vw] sm:max-w-2xl mx-auto">
              Hire a Q Agent to wait in line for you at busy places. Pay only for the time they wait.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ease-out delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transition-all">
              <Link to="/new-request">Post a Request</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-6 sm:px-8 rounded-full">
              <Link to="/find-jobs">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
          </div>
          
          <div className={`pt-6 sm:pt-8 transition-all duration-700 ease-out delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <a 
              href="#how-it-works" 
              className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowDownCircle className="h-4 w-4 mr-2 animate-pulse-slow" />
              See how it works
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="w-full flex flex-col items-center mt-8 px-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200 shadow-sm text-xs sm:text-sm font-medium text-gray-700">
            <img src="https://www.gstatic.com/devrel-devsite/prod/vb1a6e2e2c9f6d7a5c6a4a1b4c7e3e4f0d5e2b7b0d1e4a9e2c7e2d3f8f1b8d6b0/firebase/images/touchicon-180.png" alt="Firebase" className="h-4 w-4" />
            Backed by Firebase
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200 shadow-sm text-xs sm:text-sm font-medium text-gray-700">
            <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v6m0 0H7m5 0h5" /></svg>
            Safe Payments
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200 shadow-sm text-xs sm:text-sm font-medium text-gray-700">
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Verified Agents
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
