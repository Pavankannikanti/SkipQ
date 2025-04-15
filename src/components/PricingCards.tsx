
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PricingCards = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  const handleButtonClick = (action: string) => {
    setIsLoading(action);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(null);
      
      if (action === "request") {
        toast.success("Request page loading", {
          description: "You'll be able to post a line waiting request"
        });
      } else {
        toast.success("Browse jobs page loading", {
          description: "You'll see available line waiting opportunities"
        });
      }
    }, 800);
  };

  return (
    <section className="py-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-secondary/10 to-transparent" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pay only for the time saved, with a clear pricing structure that keeps things simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex flex-col h-full relative z-10">
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors duration-300">Hold & Share (Budget)</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">$4</span>
                  <span className="text-lg font-medium text-muted-foreground ml-1">flat rate</span>
                </div>
                <p className="mt-2 text-muted-foreground">Plus $0.75 per 4 minutes waited.</p>
              </div>
              
              <ul className="mt-6 space-y-4 flex-1">
                <li className="flex">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                  <span>Ideal for takeout lines and standard queues</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                  <span>You join the line when you're near</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                  <span>No physical handover required</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                  <span>Base platform fee: $1.00</span>
                </li>
              </ul>
              
              <Button 
                asChild={!isLoading} 
                onClick={isLoading ? undefined : () => handleButtonClick("request")}
                className="mt-8 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300" 
                size="lg"
                disabled={isLoading !== null}
              >
                {isLoading === "request" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <Link to="/new-request">Post a Request</Link>
                )}
              </Button>
            </div>
          </div>
          
          <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex flex-col h-full relative z-10">
              <div>
                <h3 className="text-xl font-bold mb-2">Hold & Switch (Premium)</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">$7</span>
                  <span className="text-lg font-medium opacity-80 ml-1">flat rate</span>
                </div>
                <p className="mt-2 opacity-90">Plus $1.25 per 4 minutes waited.</p>
              </div>
              
              <ul className="mt-6 space-y-4 flex-1">
                <li className="flex">
                  <Check className="h-5 w-5 text-primary-foreground flex-shrink-0 mr-3" />
                  <span>Perfect for concerts, sneaker drops, high-stakes lines</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary-foreground flex-shrink-0 mr-3" />
                  <span>Q Agent fully switches places with you</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary-foreground flex-shrink-0 mr-3" />
                  <span>Guaranteed spot in line</span>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary-foreground flex-shrink-0 mr-3" />
                  <span>Base platform fee: $1.50</span>
                </li>
              </ul>
              
              <Button 
                asChild={!isLoading}
                onClick={isLoading ? undefined : () => handleButtonClick("browse")}
                className="mt-8 bg-white text-primary hover:bg-white/90 group-hover:bg-white/95 transition-colors duration-300" 
                size="lg"
                disabled={isLoading !== null}
              >
                {isLoading === "browse" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <Link to="/browse">Become a Q Agent</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
