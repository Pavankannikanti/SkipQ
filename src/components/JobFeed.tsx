
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FilterX, Sliders, AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RequestCard from "@/components/RequestCard";
import { allRequestPosts } from "@/data/sampleRequests";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

interface JobFeedProps {
  cityFilter?: string | null;
  jobTypeFilter?: string;
  searchQuery?: string;
}

const JobFeed = ({ cityFilter = null, jobTypeFilter = "all", searchQuery = "" }: JobFeedProps) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJob, setLoadingJob] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch jobs from Firestore
  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would query Firestore
      // For now, we'll use our sample data and filter it
      
      let filteredJobs = [...allRequestPosts];
      
      // Apply city filter if selected
      if (cityFilter) {
        filteredJobs = filteredJobs.filter(job => 
          job.city === cityFilter || job.location.toLowerCase().includes(cityFilter.toLowerCase())
        );
      }
      
      // Apply job type filter if not "all"
      if (jobTypeFilter && jobTypeFilter !== "all") {
        filteredJobs = filteredJobs.filter(job => job.jobType === jobTypeFilter);
      }
      
      // Apply search query if provided
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(lowerQuery) || 
          job.location.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Only show open jobs
      filteredJobs = filteredJobs.filter(job => job.status === "open");
      
      // Sort by most recent first using createdAt or postedAt
      filteredJobs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 
                     a.postedAt ? new Date(a.postedAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 
                     b.postedAt ? new Date(b.postedAt).getTime() : 0;
        return dateB - dateA;
      });
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch jobs when filters change
  useEffect(() => {
    fetchJobs();
  }, [cityFilter, jobTypeFilter, searchQuery]);
  
  const handleAcceptJob = async (jobId: string) => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to accept jobs");
      return;
    }
    
    setLoadingJob(jobId);
    
    try {
      // In a real app, this would update the job in Firestore
      // and create a job assignment record
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the job in our local state
      const jobIndex = jobs.findIndex(job => job.id === jobId);
      
      if (jobIndex >= 0) {
        // Update the job status
        const updatedJobs = [...jobs];
        updatedJobs.splice(jobIndex, 1); // Remove the job from the list
        setJobs(updatedJobs);
        
        // Show success message
        toast.success("Job accepted successfully! Check the Dashboard for details.");
        
        // Send a notification to the job requester (simulated)
        console.log(`Notification sent to job requester for job ${jobId}`);
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      toast.error("Failed to accept job");
    } finally {
      setLoadingJob(null);
    }
  };
  
  const renderJob = (job: any) => (
    <div key={job.id} className="mb-4">
      <RequestCard
        id={job.id}
        title={job.title}
        location={job.location}
        estimatedTime={job.estimatedTime}
        payment={job.payment}
        status={job.status as any}
        username={job.username}
        userInitials={job.userInitials}
        postedAt={job.postedAt}
        distance={job.distance}
      />
      <div className="mt-2 flex justify-end">
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => handleAcceptJob(job.id)}
          disabled={loadingJob === job.id || isLoading}
        >
          {loadingJob === job.id ? "Accepting..." : "Accept Job"}
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Available Jobs</h2>
        <Collapsible open={openFilters} onOpenChange={setOpenFilters}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              <Sliders className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 border rounded-md">
            <div className="space-y-4">
              <h3 className="font-medium">Filter Jobs</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Nearby</Button>
                <Button variant="outline" size="sm">High Pay</Button>
                <Button variant="outline" size="sm">Quick Jobs</Button>
                <Button variant="outline" size="sm">New Only</Button>
              </div>
              <div className="pt-2 flex justify-end">
                <Button variant="ghost" size="sm" onClick={fetchJobs}>
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="space-y-1">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-amber-500 font-medium">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={fetchJobs}>
              Try Again
            </Button>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map(renderJob)
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No available jobs match your filters.</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFeed;
