
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type JobStatus = "waiting" | "on_the_way" | "arrived" | "you_are_next" | "completed" | "cancelled";

interface JobTrackerProps {
  jobId: string;
}

interface JobData {
  status: JobStatus;
  agentName?: string;
  agentInitials?: string;
  agentPhone?: string;
  eta?: number; // in minutes
  position?: number; // position in queue
  startTime?: { seconds: number; nanoseconds: number };
  endTime?: { seconds: number; nanoseconds: number };
  location?: string;
  notes?: string;
}

const statusMessages = {
  waiting: "Waiting for an agent to accept",
  on_the_way: "Agent on the way",
  arrived: "Agent has arrived",
  you_are_next: "You're next in line!",
  completed: "Job completed",
  cancelled: "Job cancelled"
};

const statusColors = {
  waiting: "bg-amber-100 text-amber-800",
  on_the_way: "bg-blue-100 text-blue-800",
  arrived: "bg-green-100 text-green-800",
  you_are_next: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800"
};

const JobTracker = ({ jobId }: JobTrackerProps) => {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't try to fetch if no jobId is provided
    if (!jobId) {
      setLoading(false);
      setError("No job ID provided");
      return () => {};
    }

    try {
      const unsubscribe = onSnapshot(
        doc(db, "jobs", jobId),
        (doc) => {
          if (doc.exists()) {
            setJobData(doc.data() as JobData);
          } else {
            console.log(`Job document with ID ${jobId} does not exist`);
            setError("Job not found");
          }
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching job:", err);
          setError("Failed to load job status");
          toast.error("Failed to load job status");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.error("Error setting up job listener:", e);
      setError("Failed to connect to database");
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, [jobId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">Loading job status...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24 flex-col gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!jobData) {
    return null;
  }

  const getProgressValue = () => {
    switch (jobData.status) {
      case "waiting": return 20;
      case "on_the_way": return 40;
      case "arrived": return 60;
      case "you_are_next": return 80;
      case "completed": return 100;
      case "cancelled": return 100;
      default: return 0;
    }
  };

  return (
    <Card className="border border-border/60">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Job Status</h3>
            <Badge className={statusColors[jobData.status] || "bg-gray-100 text-gray-800"}>
              {statusMessages[jobData.status] || "Unknown"}
            </Badge>
          </div>

          <Progress value={getProgressValue()} className="h-2" />

          <div className="space-y-3 pt-2">
            {jobData.agentName && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Agent: <span className="font-medium">{jobData.agentName}</span>
                </span>
              </div>
            )}
            
            {jobData.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{jobData.location}</span>
              </div>
            )}
            
            {jobData.eta !== undefined && jobData.status !== "completed" && jobData.status !== "cancelled" && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  ETA: <span className="font-medium">{jobData.eta} minutes</span>
                </span>
              </div>
            )}
            
            {jobData.position && jobData.position > 0 && (
              <div className="bg-accent/50 p-3 rounded-md text-center mt-2">
                <p className="text-sm">
                  <span className="font-bold text-lg">{jobData.position}</span> {jobData.position === 1 ? "person" : "people"} ahead of you in line
                </p>
              </div>
            )}
            
            {jobData.notes && (
              <p className="text-sm text-muted-foreground mt-2 pt-2 border-t border-border/50">
                Note: {jobData.notes}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTracker;
