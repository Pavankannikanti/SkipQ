import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, MapPin, Search, UserCheck } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Post Your Request",
    description: "Specify the location, estimated wait time, and how much you're willing to pay."
  },
  {
    icon: UserCheck,
    title: "Choose a Q Agent",
    description: "Select from available Q Agents based on ratings and response time."
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Monitor your Q Agent's position and status updates throughout the wait."
  },
  {
    icon: Clock,
    title: "Pay for Time Waited",
    description: "Only pay for the actual time waited, plus a small $1.50 service fee."
  }
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");
          
          if (entry.isIntersecting && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-index]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [visibleItems]);

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our service is designed to be straightforward and easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              data-index={index} 
              className={`transition-all duration-700 ease-out transform ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Why Choose SkipQ?</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {[
              "No subscription fees",
              "Secure payment process",
              "Verified Q Agents",
              "GPS tracking for safety",
              "Rating system",
              "24/7 customer support"
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
