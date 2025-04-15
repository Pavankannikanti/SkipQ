
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, CheckCircle2, Award, Clock, DollarSign } from 'lucide-react';
import { toast } from "sonner";

interface JobCompletionFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
  agentName: string;
  waitTime: string;
  totalAmount: number;
}

const JobCompletionFlow = ({ 
  open, 
  onOpenChange, 
  jobId,
  jobTitle, 
  agentName, 
  waitTime,
  totalAmount
}: JobCompletionFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'confirm' | 'review' | 'complete'>('confirm');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('review');
      toast.success("Job confirmed as completed", {
        description: `Your payment of $${totalAmount.toFixed(2)} has been processed`,
        duration: 5000
      });
    }, 1500);
  };

  const handleSubmitReview = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('complete');
      toast.success("Review submitted successfully", {
        description: "Thank you for your feedback",
        duration: 5000
      });
    }, 1500);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after animation completes
    setTimeout(() => {
      setCurrentStep('confirm');
      setRating(0);
    }, 300);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center justify-center gap-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 rounded-full transition-transform ${rating >= star ? 'scale-110' : ''}`}
          >
            <Star
              className={`h-8 w-8 ${
                rating >= star
                  ? 'text-primary fill-primary'
                  : 'text-muted-foreground'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-2xl">
            {currentStep === 'confirm' && "Complete Job"}
            {currentStep === 'review' && "Rate Your Experience"}
            {currentStep === 'complete' && "Thank You!"}
          </SheetTitle>
          <SheetDescription>
            {currentStep === 'confirm' && `Job ID: ${jobId}`}
            {currentStep === 'review' && "Your feedback helps our community"}
            {currentStep === 'complete' && "We appreciate your business"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {currentStep === 'confirm' && (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg">{jobTitle}</h3>
                <p className="text-muted-foreground">Q Agent: {agentName}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Wait Time</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {waitTime}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      ${totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-medium">Confirm Job Completion</h4>
                  <p className="text-sm text-muted-foreground">Confirm that the service was delivered as expected</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  onClick={handleConfirm} 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm & Pay"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  disabled={isSubmitting}
                  onClick={() => onOpenChange(false)}
                >
                  Report Issue
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="mb-2">How was your experience with {agentName}?</div>
                {renderStarRating()}
                <div className="text-sm text-muted-foreground mb-8">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Punctual
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Communicative
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Professional
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  Followed Instructions
                </Button>
              </div>
              
              <Button 
                onClick={handleSubmitReview}
                className="w-full"
                disabled={rating === 0 || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="flex flex-col items-center space-y-6 py-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Award className="h-10 w-10 text-primary" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Job Completed!</h3>
                <p className="text-muted-foreground">
                  Thank you for using SkipQ. Your job has been completed and your review has been submitted.
                </p>
              </div>
              
              <div className="w-full max-w-xs pt-6">
                <Button onClick={handleClose} className="w-full">
                  Close
                </Button>
                <div className="text-center mt-4">
                  <a href="#" className="text-sm text-primary hover:underline">
                    View Job History
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default JobCompletionFlow;
