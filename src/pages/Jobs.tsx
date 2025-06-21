import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  MapPin,
  Briefcase,
  TrendingUp,
  Clock,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Job {
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
  featured?: boolean;
}

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jobTypes: [],
    locations: [],
    salaryRange: { min: 0, max: 200000 },
    experienceLevel: [],
    industries: [],
    skills: [],
    remote: false,
  });

  // Mock jobs data for demonstration
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: {
        name: "TechCorp Solutions",
        logo: "/company-logos/techcorp.jpg",
        location: "San Francisco, CA",
      },
      location: "San Francisco, CA (Remote)",
      type: "full-time",
      salary: { min: 120000, max: 160000, currency: "USD" },
      description:
        "We're looking for a Senior Frontend Developer to join our innovative team building next-generation web applications using React, TypeScript, and modern development practices.",
      tags: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      postedAt: "2024-01-15T10:00:00Z",
      featured: true,
    },
    {
      id: "2",
      title: "Product Marketing Manager",
      company: {
        name: "InnovateHealth",
        logo: "/company-logos/innovatehealth.jpg",
        location: "Boston, MA",
      },
      location: "Boston, MA",
      type: "full-time",
      salary: { min: 90000, max: 120000, currency: "USD" },
      description:
        "Drive product marketing strategy for our cutting-edge healthcare technology platform serving millions of users worldwide.",
      tags: ["Marketing", "Strategy", "Healthcare", "Analytics", "B2B"],
      postedAt: "2024-01-14T14:30:00Z",
      featured: true,
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: {
        name: "CreativeStudio",
        logo: "/company-logos/creativestudio.jpg",
        location: "New York, NY",
      },
      location: "New York, NY (Hybrid)",
      type: "full-time",
      salary: { min: 85000, max: 110000, currency: "USD" },
      description:
        "Create beautiful, intuitive user experiences for our diverse portfolio of digital products and services.",
      tags: ["UI/UX", "Figma", "Design Systems", "User Research"],
      postedAt: "2024-01-13T09:15:00Z",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: {
        name: "DataDriven Analytics",
        logo: "/company-logos/datadriven.jpg",
        location: "Seattle, WA",
      },
      location: "Seattle, WA (Remote)",
      type: "full-time",
      salary: { min: 110000, max: 140000, currency: "USD" },
      description:
        "Build and maintain scalable infrastructure for our data analytics platform processing billions of events daily.",
      tags: ["AWS", "Kubernetes", "Docker", "CI/CD", "Python"],
      postedAt: "2024-01-12T16:45:00Z",
    },
    {
      id: "5",
      title: "Data Scientist",
      company: {
        name: "AI Innovations",
        logo: "/company-logos/ai-innovations.jpg",
        location: "Austin, TX",
      },
      location: "Austin, TX",
      type: "full-time",
      salary: { min: 100000, max: 130000, currency: "USD" },
      description:
        "Apply machine learning and statistical analysis to solve complex business problems and drive data-driven decisions.",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
      postedAt: "2024-01-11T11:20:00Z",
    },
    {
      id: "6",
      title: "Full Stack Developer",
      company: {
        name: "StartupHub",
        logo: "/company-logos/startuphub.jpg",
        location: "Remote",
      },
      location: "Remote",
      type: "contract",
      salary: { min: 80000, max: 100000, currency: "USD" },
      description:
        "Join our fast-growing startup to build innovative web applications from front to back using modern technologies.",
      tags: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      postedAt: "2024-01-10T08:30:00Z",
    },
  ];

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setTotalJobs(mockJobs.length);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const handleSearch = (query: string, newFilters: any) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (newFilters.jobTypes.length > 0) {
      params.set("types", newFilters.jobTypes.join(","));
    }
    if (newFilters.remote) params.set("remote", "true");
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // In real app, this would trigger a new API call with sort parameter
  };

  const JobListingSkeleton = () => (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Find Your Perfect Job
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Discover opportunities from top companies that match your skills
              and career goals.
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile, shown on larger screens */}
          <aside className="hidden lg:block w-80 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Stats */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                      <div className="text-lg font-semibold text-joburio-600">
                        {totalJobs.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Total Jobs
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                      <div className="text-lg font-semibold text-green-600">
                        245
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        New Today
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Popular Categories</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Technology", count: 1250 },
                      { name: "Marketing", count: 890 },
                      { name: "Design", count: 675 },
                      { name: "Sales", count: 543 },
                      { name: "Finance", count: 432 },
                    ].map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between text-sm cursor-pointer hover:text-joburio-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Top Locations</h4>
                  <div className="space-y-2">
                    {[
                      "San Francisco, CA",
                      "New York, NY",
                      "Seattle, WA",
                      "Boston, MA",
                      "Austin, TX",
                    ].map((location) => (
                      <div
                        key={location}
                        className="flex items-center text-sm cursor-pointer hover:text-joburio-600 transition-colors"
                      >
                        <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Job Listings */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {loading ? (
                    <Skeleton className="h-6 w-48" />
                  ) : (
                    `${totalJobs.toLocaleString()} jobs found`
                  )}
                </h2>
                {searchParams.get("q") && (
                  <Badge variant="outline" className="text-joburio-600">
                    "{searchParams.get("q")}"
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="date">Most Recent</SelectItem>
                    <SelectItem value="salary-high">
                      Salary: High to Low
                    </SelectItem>
                    <SelectItem value="salary-low">
                      Salary: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0",
                      viewMode === "grid" && "bg-slate-100 dark:bg-slate-800",
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0",
                      viewMode === "list" && "bg-slate-100 dark:bg-slate-800",
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div
              className={cn(
                "space-y-6",
                viewMode === "grid" &&
                  "grid grid-cols-1 xl:grid-cols-2 gap-6 space-y-0",
              )}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <JobListingSkeleton key={index} />
                  ))
                : jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      className={cn(
                        viewMode === "list" && "lg:flex lg:items-center",
                      )}
                    />
                  ))}
            </div>

            {/* Load More / Pagination */}
            {!loading && jobs.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-joburio-600 text-joburio-600 hover:bg-joburio-600 hover:text-white"
                >
                  Load More Jobs
                </Button>
              </div>
            )}

            {/* No Results */}
            {!loading && jobs.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Briefcase className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Try adjusting your search criteria or browse all available
                    positions.
                  </p>
                  <Button className="button-gradient">Browse All Jobs</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
