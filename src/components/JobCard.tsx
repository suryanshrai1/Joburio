import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useData, type Job } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  className?: string;
  showSaveButton?: boolean;
  showApplyButton?: boolean;
}

const JobCard = ({
  job,
  className,
  showSaveButton = true,
  showApplyButton = true,
}: JobCardProps) => {
  const { user } = useAuth();
  const {
    saveJob,
    unsaveJob,
    isJobSaved,
    hasAppliedToJob,
    applyToJob,
    applicationsLoading,
  } = useData();
  const { toast } = useToast();

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "remote":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const isSaved = isJobSaved(job.id);
  const hasApplied = hasAppliedToJob(job.id);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isSaved) {
        await unsaveJob(job.id);
        toast({
          title: "Job Unsaved",
          description: "Job removed from your saved list.",
        });
      } else {
        await saveJob(job.id);
        toast({
          title: "Job Saved",
          description: "Job added to your saved list.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleQuickApply = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    if (user.type !== "jobseeker") {
      toast({
        title: "Access Denied",
        description: "Only job seekers can apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    if (hasApplied) {
      toast({
        title: "Already Applied",
        description: "You have already applied to this job.",
        variant: "destructive",
      });
      return;
    }

    try {
      await applyToJob(job.id);
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className={cn(
        "card-hover relative group cursor-pointer",
        job.featured &&
          "ring-2 ring-joburio-200 dark:ring-joburio-800 bg-gradient-to-br from-joburio-50/50 to-transparent dark:from-joburio-950/50",
        className,
      )}
    >
      {job.featured && (
        <div className="absolute -top-2 left-4">
          <Badge className="bg-joburio-600 text-white">Featured</Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Link
            to={`/jobs/${job.id}`}
            className="flex items-start space-x-3 flex-1"
          >
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={job.company.logo} alt={job.company.name} />
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-joburio-600 dark:group-hover:text-joburio-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {job.company.name}
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-500 mt-1">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(job.postedAt)}
                </div>
              </div>
            </div>
          </Link>
          {showSaveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 text-joburio-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link to={`/jobs/${job.id}`} className="block">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Badge className={getJobTypeColor(job.type)}>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </Badge>
              <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                <DollarSign className="h-4 w-4 mr-1" />
                {formatSalary(
                  job.salary.min,
                  job.salary.max,
                  job.salary.currency,
                )}
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-500">
              <Users className="h-3 w-3 mr-1" />
              {job.applicationCount} applicants
            </div>
          </div>

          {job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {job.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs py-0 px-2 border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs py-0 px-2 border-slate-200 dark:border-slate-700"
                >
                  +{job.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </Link>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <Link
            to={`/jobs/${job.id}`}
            className="text-sm text-joburio-600 hover:text-joburio-700 dark:text-joburio-400 dark:hover:text-joburio-300 font-medium inline-flex items-center"
          >
            View Details
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>

          {showApplyButton && user?.type === "jobseeker" && (
            <Button
              size="sm"
              onClick={handleQuickApply}
              disabled={hasApplied || applicationsLoading}
              className={cn(
                hasApplied
                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                  : "button-gradient",
              )}
            >
              {applicationsLoading
                ? "Applying..."
                : hasApplied
                  ? "Applied"
                  : "Quick Apply"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
