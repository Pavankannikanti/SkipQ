
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, User, ArrowRight, UserPlus, Users } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export type RequestStatus = "open" | "in-progress" | "completed";
export type JobType = "hold-switch" | "hold-share";

export interface RequestCardProps {
  id: string;
  title: string;
  location: string;
  estimatedTime: string;
  payment: number;
  status: RequestStatus;
  username?: string;
  userInitials?: string;
  postedAt?: string;
  distance?: string;
  timeElapsed?: number;
  totalEstimatedTime?: number;
  jobType?: JobType;
}

const RequestCard = ({
  id,
  title,
  location,
  estimatedTime,
  payment,
  status,
  username,
  userInitials,
  postedAt,
  distance,
  timeElapsed,
  totalEstimatedTime,
  jobType
}: RequestCardProps) => {
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "open":
        return "bg-emerald-500";
      case "in-progress":
        return "bg-amber-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "open":
        return "Open";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getJobTypeColor = (type?: JobType) => {
    if (!type) return {};
    return type === "hold-switch" 
      ? { icon: <UserPlus className="h-3.5 w-3.5 mr-1.5 text-primary" />, color: "text-primary" }
      : { icon: <Users className="h-3.5 w-3.5 mr-1.5 text-secondary" />, color: "text-secondary" };
  };

  // Calculate progress percentage if time data is available
  const progressPercentage = timeElapsed && totalEstimatedTime
    ? Math.min(100, (timeElapsed / totalEstimatedTime) * 100)
    : null;

  const jobTypeInfo = getJobTypeColor(jobType);

  return (
    <Card className="uber-card border-none shadow-sm hover:shadow transition-shadow duration-200 w-full max-w-full">
      <CardHeader className="p-3 xs:p-4 pb-2 flex flex-row items-center justify-between bg-card w-full">
        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
            <span className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {getStatusLabel(status)}
            </span>
            {postedAt && (
              <span className="text-xs text-muted-foreground">• {postedAt}</span>
            )}
            {jobType && (
              <Badge variant="outline" className={`ml-1 text-xs ${jobType === "hold-switch" ? "bg-primary/10" : "bg-secondary/10"}`}>
                {jobType === "hold-switch" ? "Premium" : "Budget"}
              </Badge>
            )}
          </div>
          <h3 className="text-sm xs:text-base font-medium mt-1 break-words max-w-[90vw] xs:max-w-full">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <FavoriteButton itemId={id} itemType="request" />
          {username && userInitials && (
            <Avatar className="h-7 w-7 xs:h-8 xs:w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 xs:p-4 pt-2 space-y-3 w-full">
        <div className="flex items-center text-xs xs:text-sm text-muted-foreground w-full">
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground flex-shrink-0" />
          <span className="truncate flex-1">{location}</span>
          {distance && (
            <span className="ml-auto text-xs font-medium">{distance}</span>
          )}
        </div>
        <div className="flex items-center text-xs xs:text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
          <span>{estimatedTime}</span>
        </div>
        <div className="flex items-center text-xs xs:text-sm font-medium">
          <DollarSign className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
          <span className="text-foreground">${payment.toFixed(2)} CAD</span>
          {jobType && (
            <span className={`ml-2 text-xs ${jobTypeInfo.color}`}>
              {jobTypeInfo.icon}
              {jobType === "hold-switch" ? 
                "$7 + $1.25/4min" : 
                "$4 + $0.75/4min"}
            </span>
          )}
        </div>
        
        {progressPercentage !== null && (
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {username && (
          <div className="flex items-center text-sm">
            <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <span className="text-muted-foreground">{username}</span>
          </div>
        )}
        <Button size="sm" className="ml-auto gap-1" variant="outline">
          <span>View</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
