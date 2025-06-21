import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import JobCard from "@/components/JobCard";
import {
  Briefcase,
  Heart,
  Eye,
  FileText,
  User,
  Bell,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Edit,
  Plus,
  Search,
  Filter,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interview" | "rejected" | "offered";
  salary: string;
  location: string;
}

interface SavedJob {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    location: string;
  };
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  tags: string[];
  postedAt: string;
  savedAt: string;
}

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const {
    getUserApplications,
    savedJobs,
    jobs,
    getJobSeekerStats,
    getJob,
    loading,
  } = useData();
  const [activeTab, setActiveTab] = useState("overview");

  const userApplications = getUserApplications();
  const userSavedJobs = savedJobs.filter((save) => save.userId === user?.id);
  const stats = getJobSeekerStats();

  // Mock data
  const applications: Application[] = [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      appliedDate: "2024-01-15",
      status: "interview",
      salary: "$120k - $160k",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      jobTitle: "Product Manager",
      company: "InnovateHealth",
      appliedDate: "2024-01-12",
      status: "reviewing",
      salary: "$90k - $120k",
      location: "Boston, MA",
    },
    {
      id: "3",
      jobTitle: "UX Designer",
      company: "CreativeStudio",
      appliedDate: "2024-01-10",
      status: "pending",
      salary: "$85k - $110k",
      location: "New York, NY",
    },
    {
      id: "4",
      jobTitle: "Data Scientist",
      company: "DataDriven Analytics",
      appliedDate: "2024-01-08",
      status: "rejected",
      salary: "$100k - $130k",
      location: "Seattle, WA",
    },
  ];

  const profileCompletion = 75;
  const profileTasks = [
    { task: "Add profile photo", completed: true },
    { task: "Upload resume", completed: true },
    { task: "Complete skills section", completed: true },
    { task: "Add work experience", completed: false },
    { task: "Write professional summary", completed: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reviewing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "interview":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "offered":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "reviewing":
        return <Eye className="h-4 w-4" />;
      case "interview":
        return <Calendar className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      case "offered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, John!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Here's what's happening with your job search
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link to="/profile">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
          <Button className="button-gradient" asChild>
            <Link to="/jobs">
              <Search className="h-4 w-4 mr-2" />
              Find Jobs
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Applications
                </p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Saved Jobs
                </p>
                <p className="text-2xl font-bold">{savedJobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Profile Views
                </p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Interviews Scheduled
                </p>
                <p className="text-2xl font-bold">
                  {stats.interviewsScheduled}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Profile Completion: {profileCompletion}%
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle
                    className={cn(
                      "h-4 w-4",
                      task.completed
                        ? "text-green-600"
                        : "text-slate-400 dark:text-slate-600",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      task.completed
                        ? "text-slate-900 dark:text-slate-100"
                        : "text-slate-600 dark:text-slate-400",
                    )}
                  >
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">
            Applications ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Applications</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard?tab=applications">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {app.jobTitle}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {app.company} • {app.location}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Applied{" "}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recommended for You</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/jobs">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSavedJobs.length > 0 ? (
                      userSavedJobs.slice(0, 2).map((save) => {
                        const job = getJob(save.jobId);
                        return job ? (
                          <div
                            key={save.id}
                            className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">
                                {job.title}
                              </h4>
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                              {job.company.name} • {job.location}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {job.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs px-1 py-0"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ) : null;
                      })
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          No saved jobs yet
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{app.jobTitle}</h3>
                          <Badge className={getStatusColor(app.status)}>
                            {getStatusIcon(app.status)}
                            <span className="ml-1 capitalize">
                              {app.status}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {app.company}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {app.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied{" "}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {app.salary}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {app.status === "interview" && (
                          <Button size="sm" className="button-gradient">
                            Schedule Interview
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Saved Jobs</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userSavedJobs.length > 0 ? (
                  userSavedJobs.map((save) => {
                    const job = getJob(save.jobId);
                    return job ? <JobCard key={save.id} job={job} /> : null;
                  })
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      No saved jobs yet
                    </p>
                    <Button className="button-gradient" asChild>
                      <Link to="/jobs">Browse Jobs</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Application Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "Pending", count: 1, color: "bg-yellow-500" },
                      { status: "Reviewing", count: 1, color: "bg-blue-500" },
                      { status: "Interview", count: 1, color: "bg-green-500" },
                      { status: "Rejected", count: 1, color: "bg-red-500" },
                    ].map((item) => (
                      <div
                        key={item.status}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="flex-1 text-sm">{item.status}</span>
                        <span className="text-sm font-semibold">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Views</span>
                      <span className="font-semibold">23 this month</span>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Offers Received
                        </p>
                        <p className="text-2xl font-bold">
                          {stats.offersReceived}
                        </p>
                      </div>
                      <span className="text-sm">Response Rate</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interview Rate</span>
                      <span className="font-semibold">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default JobSeekerDashboard;
