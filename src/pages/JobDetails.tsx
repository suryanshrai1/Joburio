import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Users,
  Bookmark,
  BookmarkCheck,
  Share2,
  Flag,
  ExternalLink,
  CheckCircle,
  Calendar,
  Globe,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  MessageSquare,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Eye,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    getJob,
    saveJob,
    unsaveJob,
    isJobSaved,
    hasAppliedToJob,
    applyToJob,
    applicationsLoading,
    jobs,
  } = useData();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const saved = id ? isJobSaved(id) : false;
  const applied = id ? hasAppliedToJob(id) : false;

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        if (id) {
          const foundJob = getJob(id);
          setJob(foundJob);

          // Increment view count (in a real app, this would be tracked server-side)
          if (foundJob) {
            // This is just for demo - in real app, views would be tracked on backend
            console.log(`Viewing job: ${foundJob.title}`);
          }
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, getJob]);

  const handleSaveToggle = async () => {
    if (!user) {
      navigate(
        "/login?redirect=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }

    if (!id) return;

    try {
      if (saved) {
        await unsaveJob(id);
        toast({
          title: "Job Unsaved",
          description: "Job removed from your saved list.",
        });
      } else {
        await saveJob(id);
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

  const handleApply = () => {
    if (!user) {
      navigate(
        "/login?redirect=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!id) return;

    try {
      await applyToJob(id, coverLetter);
      setShowApplicationModal(false);
      setCoverLetter("");
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

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = job
      ? `${job.title} at ${job.company.name}`
      : "Job Opportunity";

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Link Copied",
          description: "Job link copied to clipboard.",
        });
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out this job opportunity: ${title}`,
        )}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url,
        )}`,
        "_blank",
      );
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`,
        "_blank",
      );
    }
  };

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

  // Get similar jobs from real data
  const similarJobs = jobs
    .filter(
      (j) =>
        j.id !== id &&
        j.status === "active" &&
        (j.department === job?.department ||
          j.tags.some((tag) => job?.tags.includes(tag))),
    )
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage
                      src={job.company.logo}
                      alt={job.company.name}
                    />
                    <AvatarFallback>
                      <Building2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {job.title}
                    </h1>
                    <Link
                      to={`/companies/${job.company.id}`}
                      className="text-xl text-joburio-600 hover:text-joburio-700 dark:text-joburio-400 dark:hover:text-joburio-300 font-medium"
                    >
                      {job.company.name}
                    </Link>
                  </div>
                </div>
                {job.featured && (
                  <Badge className="bg-joburio-600 text-white">Featured</Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted {formatTimeAgo(job.postedAt)}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {job.applicationCount} applicants
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {job.viewCount} views
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {formatSalary(
                      job.salary.min,
                      job.salary.max,
                      job.salary.currency,
                    )}
                  </span>
                  {job.salary.period && (
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      per {job.salary.period}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveToggle}
                  >
                    {saved ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save Job
                      </>
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleShare("copy")}>
                        <Copy className="h-4 w-4 mr-2" />
                        {copied ? "Copied!" : "Copy Link"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("twitter")}>
                        <Twitter className="h-4 w-4 mr-2" />
                        Share on Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                        <Linkedin className="h-4 w-4 mr-2" />
                        Share on LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("facebook")}>
                        <Facebook className="h-4 w-4 mr-2" />
                        Share on Facebook
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities.map(
                      (responsibility: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {responsibility}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map(
                    (requirement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {requirement}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Nice to Have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Nice to Have</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.niceToHave.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-joburio-600 mr-2" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills/Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-joburio-100 text-joburio-800 dark:bg-joburio-900 dark:text-joburio-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <Card>
              <CardContent className="p-6">
                <Button
                  className="w-full button-gradient mb-4"
                  size="lg"
                  onClick={handleApply}
                  disabled={applied || applicationsLoading}
                >
                  {applicationsLoading
                    ? "Applying..."
                    : applied
                      ? "Applied"
                      : "Apply Now"}
                </Button>
                {applied && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      You have already applied to this position.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Job Type
                  </span>
                  <span className="font-medium">
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Department
                  </span>
                  <span className="font-medium">{job.department}</span>
                </div>
                {job.experienceLevel && (
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Experience
                    </span>
                    <span className="font-medium">{job.experienceLevel}</span>
                  </div>
                )}
                {job.education && (
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Education
                    </span>
                    <span className="font-medium">{job.education}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Posted
                  </span>
                  <span className="font-medium">
                    {formatTimeAgo(job.postedAt)}
                  </span>
                </div>
                {job.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Expires
                    </span>
                    <span className="font-medium">
                      {new Date(job.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={job.company.logo}
                      alt={job.company.name}
                    />
                    <AvatarFallback>
                      <Building2 className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{job.company.name}</h3>
                    {job.company.size && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {job.company.size}
                      </p>
                    )}
                  </div>
                </div>
                {job.company.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {job.company.description}
                  </p>
                )}
                <div className="space-y-2 text-sm">
                  {job.company.industry && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Industry
                      </span>
                      <span>{job.company.industry}</span>
                    </div>
                  )}
                  {job.company.founded && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Founded
                      </span>
                      <span>{job.company.founded}</span>
                    </div>
                  )}
                  {job.company.rating && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Rating
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{job.company.rating}</span>
                        {job.company.reviewCount && (
                          <span className="text-slate-500 ml-1">
                            ({job.company.reviewCount})
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link to={`/companies/${job.company.id}`}>
                      View Company
                    </Link>
                  </Button>
                  {job.company.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={job.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <JobCard key={similarJob.id} job={similarJob} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Application Modal */}
      <Dialog
        open={showApplicationModal}
        onOpenChange={setShowApplicationModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this position at {job.company.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Cover Letter (Optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a brief cover letter explaining why you're interested in this position..."
                className="w-full mt-1 p-3 border rounded-md min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowApplicationModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                disabled={applicationsLoading}
                className="button-gradient"
              >
                {applicationsLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default JobDetails;
