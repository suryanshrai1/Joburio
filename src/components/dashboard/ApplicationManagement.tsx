import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  ExternalLink,
  Tag,
  Archive,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Linkedin,
  Github,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar?: string;
  jobId: string;
  jobTitle: string;
  department: string;
  appliedDate: string;
  status:
    | "new"
    | "reviewed"
    | "shortlisted"
    | "interview_scheduled"
    | "interviewed"
    | "offered"
    | "hired"
    | "rejected"
    | "withdrawn";
  rating?: number;
  experience: string;
  location: string;
  salary_expectation?: string;
  availability?: string;
  resumeUrl?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: string[];
  education: string;
  notes?: string;
  interviewDate?: string;
  interviewType?: "phone" | "video" | "in_person";
  rejectionReason?: string;
  source:
    | "direct"
    | "linkedin"
    | "indeed"
    | "glassdoor"
    | "referral"
    | "company_website";
  lastUpdated: string;
}

interface ApplicationFilters {
  status: string;
  job: string;
  department: string;
  experience: string;
  location: string;
  dateRange: string;
  rating: string;
  source: string;
}

const ApplicationManagement = () => {
  const { user } = useAuth();
  const { applications, jobs, getJob, updateApplicationStatus } = useData();
  const [activeView, setActiveView] = useState<"grid" | "list" | "pipeline">(
    "list",
  );
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "rating" | "status">(
    "date",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<ApplicationFilters>({
    status: "all",
    job: "all",
    department: "all",
    experience: "all",
    location: "all",
    dateRange: "all",
    rating: "all",
    source: "all",
  });
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Convert real applications to display format
  const formattedApplications = applications
    .map((app) => {
      const job = getJob(app.jobId);
      if (!job) return null;

      return {
        id: app.id,
        candidateId: app.userId,
        candidateName: `User ${app.userId}`, // In a real app, you'd fetch user details
        candidateEmail: `user${app.userId}@example.com`,
        candidatePhone: "+1 (555) 123-4567",
        candidateAvatar: undefined,
        jobId: app.jobId,
        jobTitle: job.title,
        department: job.department,
        appliedDate: app.appliedAt,
        status: app.status,
        rating: app.rating,
        experience: "3+ years",
        location: job.location,
        salary_expectation: `$${job.salary.min}k - $${job.salary.max}k`,
        availability: "2 weeks notice",
        resumeUrl: app.resumeUrl,
        coverLetter: app.coverLetter,
        portfolioUrl: undefined,
        linkedinUrl: undefined,
        githubUrl: undefined,
        skills: job.tags,
        education: "Bachelor's Degree",
        notes: app.notes,
        interviewDate: app.interviewDate,
        interviewType: "video" as const,
        rejectionReason: undefined,
        source: "direct" as const,
        lastUpdated: app.lastUpdated,
      };
    })
    .filter(Boolean) as Application[];

  // Keep the original mock data structure for the type definition
  const mockApplications: Application[] = [
    {
      id: "1",
      candidateId: "c1",
      candidateName: "Sarah Johnson",
      candidateEmail: "sarah.johnson@email.com",
      candidatePhone: "+1 (555) 123-4567",
      candidateAvatar: "/avatars/sarah.jpg",
      jobId: "j1",
      jobTitle: "Senior Frontend Developer",
      department: "Engineering",
      appliedDate: "2024-01-16T10:30:00Z",
      status: "interview_scheduled",
      rating: 4.8,
      experience: "5+ years",
      location: "San Francisco, CA",
      salary_expectation: "$140k - $160k",
      availability: "2 weeks notice",
      resumeUrl: "/resumes/sarah-johnson.pdf",
      coverLetter:
        "I am excited to apply for the Senior Frontend Developer position at your company. With over 5 years of experience in React, TypeScript, and modern web technologies, I believe I would be a great fit for your team.",
      portfolioUrl: "https://sarahjohnson.dev",
      linkedinUrl: "https://linkedin.com/in/sarahjohnson",
      githubUrl: "https://github.com/sarahjohnson",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      education: "BS Computer Science, Stanford University",
      notes:
        "Strong technical background, excellent communication skills. Recommended by John Doe.",
      interviewDate: "2024-01-20T14:00:00Z",
      interviewType: "video",
      source: "linkedin",
      lastUpdated: "2024-01-17T09:15:00Z",
    },
    {
      id: "2",
      candidateId: "c2",
      candidateName: "Michael Chen",
      candidateEmail: "michael.chen@email.com",
      candidatePhone: "+1 (555) 234-5678",
      jobId: "j1",
      jobTitle: "Senior Frontend Developer",
      department: "Engineering",
      appliedDate: "2024-01-15T14:20:00Z",
      status: "reviewed",
      rating: 4.6,
      experience: "7+ years",
      location: "Remote",
      salary_expectation: "$150k - $170k",
      availability: "Immediate",
      resumeUrl: "/resumes/michael-chen.pdf",
      portfolioUrl: "https://michaelchen.io",
      linkedinUrl: "https://linkedin.com/in/michaelchen",
      skills: ["React", "Vue.js", "Python", "Docker", "Kubernetes"],
      education: "MS Software Engineering, UC Berkeley",
      notes: "Excellent technical skills, previous startup experience.",
      source: "company_website",
      lastUpdated: "2024-01-16T11:30:00Z",
    },
    {
      id: "3",
      candidateId: "c3",
      candidateName: "Emily Rodriguez",
      candidateEmail: "emily.r@email.com",
      candidatePhone: "+1 (555) 345-6789",
      jobId: "j2",
      jobTitle: "Product Manager",
      department: "Product",
      appliedDate: "2024-01-14T16:45:00Z",
      status: "new",
      rating: 4.4,
      experience: "4+ years",
      location: "Austin, TX",
      salary_expectation: "$130k - $150k",
      availability: "3 weeks notice",
      resumeUrl: "/resumes/emily-rodriguez.pdf",
      linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
      skills: ["Product Strategy", "Agile", "Data Analysis", "User Research"],
      education: "MBA Harvard Business School",
      source: "referral",
      lastUpdated: "2024-01-14T16:45:00Z",
    },
    {
      id: "4",
      candidateId: "c4",
      candidateName: "David Kim",
      candidateEmail: "david.kim@email.com",
      jobId: "j3",
      jobTitle: "UX Designer",
      department: "Design",
      appliedDate: "2024-01-13T11:20:00Z",
      status: "offered",
      rating: 4.9,
      experience: "6+ years",
      location: "New York, NY",
      salary_expectation: "$120k - $140k",
      availability: "1 month notice",
      resumeUrl: "/resumes/david-kim.pdf",
      portfolioUrl: "https://davidkim.design",
      linkedinUrl: "https://linkedin.com/in/davidkim",
      skills: [
        "Figma",
        "Sketch",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
      education: "BFA Design, Parsons School of Design",
      notes: "Exceptional design portfolio, strong user research background.",
      source: "indeed",
      lastUpdated: "2024-01-18T10:00:00Z",
    },
    {
      id: "5",
      candidateId: "c5",
      candidateName: "Lisa Zhang",
      candidateEmail: "lisa.zhang@email.com",
      jobId: "j4",
      jobTitle: "DevOps Engineer",
      department: "Engineering",
      appliedDate: "2024-01-12T09:30:00Z",
      status: "rejected",
      experience: "3+ years",
      location: "Seattle, WA",
      salary_expectation: "$110k - $130k",
      resumeUrl: "/resumes/lisa-zhang.pdf",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      education: "BS Computer Engineering, University of Washington",
      rejectionReason: "Insufficient experience with our tech stack",
      source: "glassdoor",
      lastUpdated: "2024-01-15T14:20:00Z",
    },
    {
      id: "6",
      candidateId: "c6",
      candidateName: "Robert Wilson",
      candidateEmail: "robert.wilson@email.com",
      jobId: "j1",
      jobTitle: "Senior Frontend Developer",
      department: "Engineering",
      appliedDate: "2024-01-11T13:15:00Z",
      status: "hired",
      rating: 4.7,
      experience: "8+ years",
      location: "Boston, MA",
      salary_expectation: "$160k - $180k",
      resumeUrl: "/resumes/robert-wilson.pdf",
      portfolioUrl: "https://robertwilson.dev",
      skills: ["React", "Angular", "Node.js", "PostgreSQL", "Redis"],
      education: "MS Computer Science, MIT",
      source: "direct",
      lastUpdated: "2024-01-19T16:30:00Z",
    },
  ];

  const statusConfig = {
    new: {
      label: "New",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      icon: Eye,
    },
    reviewed: {
      label: "Reviewed",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      icon: CheckCircle,
    },
    shortlisted: {
      label: "Shortlisted",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      icon: Star,
    },
    interview_scheduled: {
      label: "Interview Scheduled",
      color:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      icon: Calendar,
    },
    interviewed: {
      label: "Interviewed",
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      icon: MessageSquare,
    },
    offered: {
      label: "Offered",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: Award,
    },
    hired: {
      label: "Hired",
      color:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
      icon: UserCheck,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      icon: UserX,
    },
    withdrawn: {
      label: "Withdrawn",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      icon: Archive,
    },
  };

  const sourceConfig = {
    direct: { label: "Direct Application", color: "bg-blue-100 text-blue-800" },
    linkedin: { label: "LinkedIn", color: "bg-blue-100 text-blue-800" },
    indeed: { label: "Indeed", color: "bg-green-100 text-green-800" },
    glassdoor: { label: "Glassdoor", color: "bg-purple-100 text-purple-800" },
    referral: { label: "Referral", color: "bg-yellow-100 text-yellow-800" },
    company_website: {
      label: "Company Website",
      color: "bg-indigo-100 text-indigo-800",
    },
  };

  // Filter and sort applications
  const filteredApplications = formattedApplications
    .filter((app) => {
      if (
        searchQuery &&
        !app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !app.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (filters.status !== "all" && app.status !== filters.status)
        return false;
      if (filters.job !== "all" && app.jobId !== filters.job) return false;
      if (filters.department !== "all" && app.department !== filters.department)
        return false;
      if (filters.source !== "all" && app.source !== filters.source)
        return false;

      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.candidateName;
          bValue = b.candidateName;
          break;
        case "rating":
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.appliedDate).getTime();
          bValue = new Date(b.appliedDate).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplications((prev) =>
      prev.includes(applicationId)
        ? prev.filter((id) => id !== applicationId)
        : [...prev, applicationId],
    );
  };

  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id));
    }
  };

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: string,
  ) => {
    try {
      await updateApplicationStatus(applicationId, newStatus as any);
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(
      `Performing bulk action ${action} on applications:`,
      selectedApplications,
    );
    setSelectedApplications([]);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const statusStats = Object.keys(statusConfig).map((status) => ({
    status,
    count: formattedApplications.filter((app) => app.status === status).length,
    ...statusConfig[status as keyof typeof statusConfig],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Application Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Track and manage candidate applications across all your job postings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {selectedApplications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions ({selectedApplications.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction("review")}>
                  Mark as Reviewed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("shortlist")}>
                  Add to Shortlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("reject")}>
                  Reject Applications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                  Export Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statusStats.map(({ status, count, label, color, icon: Icon }) => (
          <Card
            key={status}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setFilters((prev) => ({ ...prev, status }))}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search candidates, jobs, or emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={activeView === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === "pipeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("pipeline")}
            >
              <Briefcase className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {activeView === "list" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedApplications.length ===
                          filteredApplications.length &&
                        filteredApplications.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow
                    key={application.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedApplications.includes(application.id)}
                        onCheckedChange={() =>
                          handleSelectApplication(application.id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={application.candidateAvatar}
                            alt={application.candidateName}
                          />
                          <AvatarFallback>
                            {application.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">
                            {application.candidateName}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {application.candidateEmail}
                          </div>
                          <div className="text-sm text-slate-500">
                            {application.experience} • {application.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {application.jobTitle}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {application.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[application.status].color}>
                        {statusConfig[application.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {application.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {application.rating}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          {getTimeAgo(application.appliedDate)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(
                            application.appliedDate,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={sourceConfig[application.source].color}
                      >
                        {sourceConfig[application.source].label}
                      </Badge>
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
                            onClick={() => {
                              setSelectedApplication(application);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(application.id, "shortlisted")
                            }
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Add to Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(application.id, "offered")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Make Offer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              handleStatusUpdate(application.id, "rejected")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject Application
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
      )}

      {/* Grid View */}
      {activeView === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <Card
              key={application.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedApplication(application);
                setIsDetailsOpen(true);
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={application.candidateAvatar}
                        alt={application.candidateName}
                      />
                      <AvatarFallback>
                        {application.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {application.candidateName}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {application.candidateEmail}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusConfig[application.status].color}>
                    {statusConfig[application.status].label}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-2 text-slate-500" />
                    {application.jobTitle}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                    {application.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    {getTimeAgo(application.appliedDate)}
                  </div>
                  {application.rating && (
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      {application.rating}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={sourceConfig[application.source].color}
                  >
                    {sourceConfig[application.source].label}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pipeline View */}
      {activeView === "pipeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(statusConfig)
            .slice(0, 6)
            .map(([status, config]) => {
              const statusApplications = filteredApplications.filter(
                (app) => app.status === status,
              );
              return (
                <Card key={status}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center space-x-2">
                        <config.icon className="h-5 w-5" />
                        <span>{config.label}</span>
                      </div>
                      <Badge variant="secondary">
                        {statusApplications.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {statusApplications.map((application) => (
                      <div
                        key={application.id}
                        className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedApplication(application);
                          setIsDetailsOpen(true);
                        }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={application.candidateAvatar}
                              alt={application.candidateName}
                            />
                            <AvatarFallback className="text-xs">
                              {application.candidateName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {application.candidateName}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                              {application.jobTitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{getTimeAgo(application.appliedDate)}</span>
                          {application.rating && (
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              {application.rating}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {statusApplications.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <config.icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No applications</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}

      {/* Application Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedApplication.candidateAvatar}
                      alt={selectedApplication.candidateName}
                    />
                    <AvatarFallback>
                      {selectedApplication.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-bold">
                      {selectedApplication.candidateName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Applied for {selectedApplication.jobTitle}
                    </div>
                  </div>
                  <Badge
                    className={statusConfig[selectedApplication.status].color}
                  >
                    {statusConfig[selectedApplication.status].label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span>{selectedApplication.candidateEmail}</span>
                      </div>
                      {selectedApplication.candidatePhone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span>{selectedApplication.candidatePhone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span>{selectedApplication.location}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills & Experience */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Skills & Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Experience Level
                        </Label>
                        <p className="text-sm">
                          {selectedApplication.experience}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Education</Label>
                        <p className="text-sm">
                          {selectedApplication.education}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedApplication.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedApplication.salary_expectation && (
                        <div>
                          <Label className="text-sm font-medium">
                            Salary Expectation
                          </Label>
                          <p className="text-sm">
                            {selectedApplication.salary_expectation}
                          </p>
                        </div>
                      )}
                      {selectedApplication.availability && (
                        <div>
                          <Label className="text-sm font-medium">
                            Availability
                          </Label>
                          <p className="text-sm">
                            {selectedApplication.availability}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Cover Letter */}
                  {selectedApplication.coverLetter && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cover Letter</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          {selectedApplication.coverLetter}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Internal Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add your notes about this candidate..."
                        value={selectedApplication.notes || ""}
                        className="min-h-[100px]"
                      />
                      <Button className="mt-3" size="sm">
                        Save Notes
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Star className="h-4 w-4 mr-2" />
                        Add to Shortlist
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Status Update */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Update Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Select
                        value={selectedApplication.status}
                        onValueChange={(value) =>
                          handleStatusUpdate(selectedApplication.id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(
                            ([status, config]) => (
                              <SelectItem key={status} value={status}>
                                {config.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Documents & Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Documents & Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedApplication.resumeUrl && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <a
                            href={selectedApplication.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Resume
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                      {selectedApplication.portfolioUrl && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <a
                            href={selectedApplication.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            Portfolio
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                      {selectedApplication.linkedinUrl && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <a
                            href={selectedApplication.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                      {selectedApplication.githubUrl && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <a
                            href={selectedApplication.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Application Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Application Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Applied
                        </span>
                        <span>
                          {new Date(
                            selectedApplication.appliedDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Source
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            sourceConfig[selectedApplication.source].color
                          }
                        >
                          {sourceConfig[selectedApplication.source].label}
                        </Badge>
                      </div>
                      {selectedApplication.rating && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Rating
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {selectedApplication.rating}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Last Updated
                        </span>
                        <span>
                          {getTimeAgo(selectedApplication.lastUpdated)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Applications</DialogTitle>
            <DialogDescription>
              Filter applications by various criteria to find what you're
              looking for.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <SelectItem key={status} value={status}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={filters.department}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Source</Label>
              <Select
                value={filters.source}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, source: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {Object.entries(sourceConfig).map(([source, config]) => (
                    <SelectItem key={source} value={source}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience</Label>
              <Select
                value={filters.experience}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, experience: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                  <SelectItem value="senior">
                    Senior Level (5+ years)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  status: "all",
                  job: "all",
                  department: "all",
                  experience: "all",
                  location: "all",
                  dateRange: "all",
                  rating: "all",
                  source: "all",
                })
              }
            >
              Clear Filters
            </Button>
            <Button onClick={() => setIsFiltersOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationManagement;
