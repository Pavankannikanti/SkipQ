import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, UserCircle, MapPin, DollarSign, CheckCircle } from 'lucide-react';

type OnboardingStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

interface OnboardingFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'requester' | 'agent';
}

const agentSteps: OnboardingStep[] = [
  {
    title: "Welcome, Q Agent!",
    description: "Start earning by waiting in lines",
    icon: <UserCircle className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4 py-4">
        <p>As a Q Agent, you'll earn money by waiting in line for others. Turn your free time into income!</p>
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md">
          <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
          <p className="text-sm">Most Q Agents earn $15-25 per hour on average</p>
        </div>
      </div>
    )
  },
  {
    title: "Find Opportunities",
    description: "Browse available requests in your area",
    icon: <MapPin className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4 py-4">
        <p>You'll see available requests in your area sorted by:</p>
        <ul className="space-y-2 ml-4">
          <li className="flex gap-2 items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            <span>Distance from your location</span>
          </li>
          <li className="flex gap-2 items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            <span>Estimated wait time & earning potential</span>
          </li>
          <li className="flex gap-2 items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            <span>Service type (Hold & Share or Hold & Switch)</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "Get Paid",
    description: "Secure, reliable payments after each job",
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4 py-4">
        <p>Payments are automatically processed when a job is completed.</p>
        <div className="rounded-md p-3 border border-muted bg-muted/30 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Base rate:</span>
            <span className="font-medium">$4 or $7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Wait time earnings:</span>
            <span className="font-medium">$0.75-$1.25 per 4 mins</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Platform fee:</span>
            <span className="font-medium">$1-$1.50 per job</span>
          </div>
        </div>
      </div>
    )
  }
];

const requesterSteps: OnboardingStep[] = [
    {
      title: "Welcome to SkipQ",
      description: "Skip the lines with our platform",
      icon: <UserCircle className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4 py-4">
          <p>SkipQ connects you with people who can wait in line for you. Save your valuable time for what matters most.</p>
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md">
            <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Create your first request in just a few minutes</p>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Location",
      description: "Tell us where you need someone to wait",
      icon: <MapPin className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4 py-4">
          <p>Search for any location where you need a line Q Agent. Popular places include:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Restaurant takeouts</span>
            </li>
            <li className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Concert venues & event spaces</span>
            </li>
            <li className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Government offices</span>
            </li>
            <li className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Popular retail stores</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Select Your Service",
      description: "Choose how you want your line handled",
      icon: <DollarSign className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4 py-4">
          <div className="p-3 rounded-md border border-muted mb-4">
            <h3 className="font-medium">Hold & Share ($4 flat)</h3>
            <p className="text-sm text-muted-foreground mt-1">Q Agent holds your spot and you join when near</p>
          </div>
          <div className="p-3 rounded-md border border-primary/40 bg-primary/5">
            <h3 className="font-medium">Hold & Switch ($7 flat)</h3>
            <p className="text-sm text-muted-foreground mt-1">Q Agent waits the entire time and switches with you</p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Both options also include per-minute charges based on wait time</p>
        </div>
      )
    }
  ];

const OnboardingFlow = ({ open, onOpenChange, userType }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = userType === 'requester' ? requesterSteps : agentSteps;
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
      setCurrentStep(0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-2">{steps[currentStep].icon}</div>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <Progress value={progressPercentage} className="h-1.5 mb-4" />
          {steps[currentStep].content}
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentStep === 0}
            className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          
          <Button onClick={handleNext} className="ml-auto">
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
