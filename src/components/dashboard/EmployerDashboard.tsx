import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  Users,
  Eye,
  Plus,
  MoreHorizontal,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  DollarSign,
  Filter,
  Search,
  Download,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import ApplicationManagement from "./ApplicationManagement";
import { cn } from "@/lib/utils";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract";
  status: "active" | "paused" | "closed" | "draft";
  postedDate: string;
  expiresDate: string;
  applicants: number;
  views: number;
  salary: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  appliedDate: string;
  status: "new" | "reviewed" | "interview" | "offered" | "hired" | "rejected";
  experience: string;
  location: string;
  rating: number;
  resumeUrl?: string;
}

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications, getEmployerStats, loading } = useData();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = getEmployerStats();
  const companyJobs = jobs.filter((job) => job.company.id === "techcorp"); // Assuming current user is from TechCorp
  const companyApplications = applications.filter((app) =>
    companyJobs.some((job) => job.id === app.jobId),
  );

  // Mock data
  const jobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "full-time",
      status: "active",
      postedDate: "2024-01-15",
      expiresDate: "2024-02-15",
      applicants: 47,
      views: 1284,
      salary: "$120k - $160k",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "full-time",
      status: "active",
      postedDate: "2024-01-12",
      expiresDate: "2024-02-12",
      applicants: 23,
      views: 892,
      salary: "$140k - $180k",
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      location: "Austin, TX",
      type: "full-time",
      status: "paused",
      postedDate: "2024-01-10",
      expiresDate: "2024-02-10",
      applicants: 34,
      views: 567,
      salary: "$95k - $125k",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "contract",
      status: "draft",
      postedDate: "2024-01-08",
      expiresDate: "2024-02-08",
      applicants: 0,
      views: 0,
      salary: "$110k - $140k",
    },
  ];

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/avatars/sarah.jpg",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-16",
      status: "interview",
      experience: "5+ years",
      location: "San Francisco, CA",
      rating: 4.8,
      resumeUrl: "/resumes/sarah-johnson.pdf",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-15",
      status: "reviewed",
      experience: "7+ years",
      location: "Remote",
      rating: 4.6,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      position: "Product Manager",
      appliedDate: "2024-01-14",
      status: "new",
      experience: "4+ years",
      location: "Austin, TX",
      rating: 4.4,
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@email.com",
      position: "UX Designer",
      appliedDate: "2024-01-13",
      status: "offered",
      experience: "6+ years",
      location: "New York, NY",
      rating: 4.9,
    },
  ];

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "offered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "hired":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const totalApplications = candidates.length;
  const activeJobs = jobPostings.filter(
    (job) => job.status === "active",
  ).length;
  const totalViews = jobPostings.reduce((sum, job) => sum + job.views, 0);
  const newApplications = candidates.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            TechCorp Solutions Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your job postings and track candidate applications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link to="/companies/techcorp">
              <Eye className="h-4 w-4 mr-2" />
              View Company Page
            </Link>
          </Button>
          <Button className="button-gradient" asChild>
            <Link to="/post-job">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
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
                  Active Jobs
                </p>
                <p className="text-2xl font-bold">{stats.activeJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">{stats.totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Views
                </p>
                <p className="text-2xl font-bold">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  New Applications
                </p>
                <p className="text-2xl font-bold">{stats.newApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({companyJobs.length})</TabsTrigger>
          <TabsTrigger value="candidates">
            Candidates ({companyApplications.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            <UserCheck className="h-4 w-4 mr-2" />
            Applications
          </TabsTrigger>
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
                      <Link to="/dashboard?tab=candidates">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates.slice(0, 4).map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={candidate.avatar}
                            alt={candidate.name}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">
                            {candidate.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                            {candidate.position} • {candidate.experience}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            Applied{" "}
                            {new Date(
                              candidate.appliedDate,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          className={getCandidateStatusColor(candidate.status)}
                        >
                          {candidate.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Job Postings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Job Postings</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard?tab=jobs">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobPostings
                      .filter((job) => job.status === "active")
                      .slice(0, 3)
                      .map((job) => (
                        <div
                          key={job.id}
                          className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">
                              {job.title}
                            </h4>
                            <Badge className={getJobStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                            {job.department} • {job.location} • {job.salary}
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                            <span>{job.applicants} applications</span>
                            <span>{job.views} views</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Job Postings</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="button-gradient" size="sm" asChild>
                      <Link to="/post-job">
                        <Plus className="h-4 w-4 mr-2" />
                        Post Job
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobPostings.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{job.title}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {job.salary}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge className={getJobStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applicants}</TableCell>
                        <TableCell>{job.views.toLocaleString()}</TableCell>
                        <TableCell>
                          {new Date(job.postedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Job
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                View Applications
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Job
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Candidate Applications</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={candidate.avatar}
                            alt={candidate.name}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{candidate.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Applied for {candidate.position}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-500 mt-1">
                            <span>{candidate.experience}</span>
                            <span>{candidate.location}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              {candidate.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={getCandidateStatusColor(candidate.status)}
                        >
                          {candidate.status}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" className="button-gradient">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <ApplicationManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Application Status Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "New", count: 1, color: "bg-blue-500" },
                      { status: "Reviewed", count: 1, color: "bg-yellow-500" },
                      { status: "Interview", count: 1, color: "bg-purple-500" },
                      { status: "Offered", count: 1, color: "bg-green-500" },
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
                  <CardTitle>Hiring Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        Application-to-Interview Rate
                      </span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interview-to-Offer Rate</span>
                      <span className="font-semibold">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Time to Hire</span>
                      <span className="font-semibold">14 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cost per Hire</span>
                      <span className="font-semibold">$2,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobPostings
                      .sort((a, b) => b.applicants - a.applicants)
                      .slice(0, 3)
                      .map((job) => (
                        <div
                          key={job.id}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <div className="font-semibold text-sm">
                              {job.title}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {job.department}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {job.applicants}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              applications
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Jobs Posted</span>
                      <span className="font-semibold">4 this month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Applications</span>
                      <span className="font-semibold">104 applications</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Views</span>
                      <span className="font-semibold">2,743 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hires Made</span>
                      <span className="font-semibold">2 hires</span>
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

export default EmployerDashboard;
