import { useState } from "react";
import { Link } from "react-router-dom";
import UserManagement from "./UserManagement";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Briefcase,
  Building2,
  BarChart3,
  Shield,
  Flag,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Settings,
  Mail,
  Ban,
  Clock,
  Star,
  Activity,
  DollarSign,
  MapPin,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  FileText,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  type: "jobseeker" | "employer";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastLogin: string;
  avatar?: string;
  jobsPosted?: number;
  applicationsSubmitted?: number;
  location: string;
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  employer: string;
  status: "active" | "pending" | "rejected" | "expired";
  postedDate: string;
  applicants: number;
  views: number;
  reported: boolean;
  reportCount: number;
  location: string;
  salary: string;
}

interface Report {
  id: string;
  type: "job" | "user" | "company";
  targetId: string;
  targetName: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
  severity: "low" | "medium" | "high";
}

interface PlatformMetrics {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  totalApplications: number;
  monthlyGrowth: {
    users: number;
    jobs: number;
    applications: number;
  };
  topCategories: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  userActivity: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
  };
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      type: "jobseeker",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      location: "San Francisco, CA",
      applicationsSubmitted: 12,
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "hr@techcorp.com",
      type: "employer",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19",
      location: "Boston, MA",
      jobsPosted: 5,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@spam.com",
      type: "jobseeker",
      status: "suspended",
      joinDate: "2024-01-18",
      lastLogin: "2024-01-18",
      location: "New York, NY",
      applicationsSubmitted: 45,
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emily@designco.com",
      type: "employer",
      status: "pending",
      joinDate: "2024-01-20",
      lastLogin: "2024-01-20",
      location: "Seattle, WA",
      jobsPosted: 0,
    },
  ];

  const jobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      employer: "hr@techcorp.com",
      status: "active",
      postedDate: "2024-01-15",
      applicants: 47,
      views: 1284,
      reported: false,
      reportCount: 0,
      location: "San Francisco, CA",
      salary: "$120k - $160k",
    },
    {
      id: "2",
      title: "Suspicious Job Posting",
      company: "Fake Company Inc",
      employer: "fake@scam.com",
      status: "pending",
      postedDate: "2024-01-20",
      applicants: 0,
      views: 23,
      reported: true,
      reportCount: 3,
      location: "Remote",
      salary: "$200k - $300k",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "InnovateHealth",
      employer: "jobs@innovatehealth.com",
      status: "active",
      postedDate: "2024-01-12",
      applicants: 23,
      views: 892,
      reported: false,
      reportCount: 0,
      location: "Boston, MA",
      salary: "$140k - $180k",
    },
  ];

  const reports: Report[] = [
    {
      id: "1",
      type: "job",
      targetId: "2",
      targetName: "Suspicious Job Posting",
      reportedBy: "user123@email.com",
      reason: "Fraudulent posting",
      description:
        "This job posting looks like a scam. The salary is unrealistic and the company doesn't exist.",
      status: "pending",
      createdAt: "2024-01-20T10:30:00Z",
      severity: "high",
    },
    {
      id: "2",
      type: "user",
      targetId: "3",
      targetName: "Mike Johnson",
      reportedBy: "employer@company.com",
      reason: "Spam applications",
      description:
        "This user is sending spam applications to multiple positions without relevant qualifications.",
      status: "resolved",
      createdAt: "2024-01-19T14:15:00Z",
      severity: "medium",
    },
    {
      id: "3",
      type: "company",
      targetId: "fake-company",
      targetName: "Fake Company Inc",
      reportedBy: "multiple-users",
      reason: "Fake company",
      description: "Multiple reports indicate this is not a real company.",
      status: "pending",
      createdAt: "2024-01-20T09:00:00Z",
      severity: "high",
    },
  ];

  const metrics: PlatformMetrics = {
    totalUsers: 15847,
    totalJobs: 3421,
    totalCompanies: 892,
    totalApplications: 28394,
    monthlyGrowth: {
      users: 12.5,
      jobs: 8.3,
      applications: 15.7,
    },
    topCategories: [
      { name: "Technology", count: 1250, percentage: 36.5 },
      { name: "Healthcare", count: 890, percentage: 26.0 },
      { name: "Finance", count: 567, percentage: 16.6 },
      { name: "Education", count: 432, percentage: 12.6 },
      { name: "Marketing", count: 282, percentage: 8.3 },
    ],
    userActivity: {
      dailyActiveUsers: 2847,
      weeklyActiveUsers: 8923,
      monthlyActiveUsers: 12456,
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "suspended":
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "resolved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "dismissed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user ${userId}`);
    // In real app, this would make API calls
  };

  const handleJobAction = (jobId: string, action: string) => {
    console.log(`${action} job ${jobId}`);
    // In real app, this would make API calls
  };

  const handleReportAction = (reportId: string, action: string) => {
    console.log(`${action} report ${reportId}`);
    // In real app, this would make API calls
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage platform content, users, and analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Users
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">
                    {metrics.totalUsers.toLocaleString()}
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    +{metrics.monthlyGrowth.users}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active Jobs
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">
                    {metrics.totalJobs.toLocaleString()}
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    +{metrics.monthlyGrowth.jobs}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Companies
                </p>
                <p className="text-2xl font-bold">
                  {metrics.totalCompanies.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flag className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Pending Reports
                </p>
                <p className="text-2xl font-bold">
                  {reports.filter((r) => r.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-1 bg-green-100 rounded">
                        <UserCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New user registered
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          emily@designco.com joined as employer
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-1 bg-red-100 rounded">
                        <Flag className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Job posting reported
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          "Suspicious Job Posting" flagged as fraudulent
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">4h ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-1 bg-blue-100 rounded">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New job posted</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          TechCorp posted "Senior Frontend Developer"
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">6h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-semibold">
                        {metrics.userActivity.dailyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Job Applications Today</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Moderation</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {reports.filter((r) => r.status === "pending").length}
                        </span>
                        {reports.filter((r) => r.status === "pending").length >
                          0 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="font-semibold">~2.3s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {user.type === "jobseeker"
                              ? "Job Seeker"
                              : "Employer"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {user.type === "jobseeker"
                              ? `${user.applicationsSubmitted} applications`
                              : `${user.jobsPosted} jobs posted`}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction(user.id, "view")
                                }
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction(user.id, "message")
                                }
                              >
                                <Mail className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              {user.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction(user.id, "suspend")
                                  }
                                  className="text-orange-600"
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction(user.id, "activate")
                                  }
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUserAction(user.id, "delete")
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
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

          {/* User Management Tab */}
          <TabsContent value="user-management">
            <UserManagement />
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Job Moderation</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search jobs..." className="w-64" />
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Metrics</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobPostings.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {job.location} • {job.salary}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.company}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {job.employer}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{job.applicants} applications</div>
                            <div className="text-slate-600 dark:text-slate-400">
                              {job.views} views
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {job.reported ? (
                            <Badge className="bg-red-100 text-red-800">
                              {job.reportCount} reports
                            </Badge>
                          ) : (
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              No reports
                            </span>
                          )}
                        </TableCell>
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
                              <DropdownMenuItem
                                onClick={() => handleJobAction(job.id, "view")}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Job
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleJobAction(job.id, "edit")}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Job
                              </DropdownMenuItem>
                              {job.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleJobAction(job.id, "approve")
                                    }
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleJobAction(job.id, "reject")
                                    }
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem
                                onClick={() =>
                                  handleJobAction(job.id, "delete")
                                }
                                className="text-red-600"
                              >
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

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Flag className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">
                                {report.targetName}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {report.type}
                              </Badge>
                              <Badge
                                className={getSeverityColor(report.severity)}
                              >
                                {report.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              Reported by: {report.reportedBy}
                            </p>
                            <p className="text-sm font-medium mb-2">
                              Reason: {report.reason}
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {report.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {report.status === "pending" && (
                        <div className="flex items-center space-x-3 pt-4 border-t">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleReportAction(report.id, "investigate")
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Investigate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() =>
                              handleReportAction(report.id, "resolve")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleReportAction(report.id, "dismiss")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monthly User Growth</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          +{metrics.monthlyGrowth.users}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Job Posting Growth</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-600">
                          +{metrics.monthlyGrowth.jobs}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Application Growth</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold text-purple-600">
                          +{metrics.monthlyGrowth.applications}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Applications</span>
                      <span className="font-semibold">
                        {metrics.totalApplications.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Job Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.topCategories.map((category, index) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {category.count} jobs ({category.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-joburio-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-semibold">
                        {metrics.userActivity.dailyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Active Users</span>
                      <span className="font-semibold">
                        {metrics.userActivity.weeklyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monthly Active Users</span>
                      <span className="font-semibold">
                        {metrics.userActivity.monthlyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Retention Rate</span>
                      <span className="font-semibold text-green-600">
                        87.5%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monthly Revenue</span>
                      <span className="font-semibold">$24,567</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Job Posting Revenue</span>
                      <span className="font-semibold">$18,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Premium Subscriptions</span>
                      <span className="font-semibold">$6,117</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Revenue per User</span>
                      <span className="font-semibold">$1.55</span>
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

export default AdminDashboard;
