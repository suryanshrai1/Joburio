import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MapPin,
  Users,
  Star,
  Building2,
  TrendingUp,
  Filter,
  SlidersHorizontal,
  ArrowRight,
  Briefcase,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  founded: string;
  rating: number;
  reviewCount: number;
  openJobs: number;
  description: string;
  website: string;
  featured?: boolean;
  hiring?: boolean;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Mock companies data
  const mockCompanies: Company[] = [
    {
      id: "techcorp",
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.jpg",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "500-1000",
      founded: "2015",
      rating: 4.8,
      reviewCount: 124,
      openJobs: 23,
      description:
        "Leading software development company specializing in AI and machine learning solutions.",
      website: "https://techcorp.com",
      featured: true,
      hiring: true,
    },
    {
      id: "innovatehealth",
      name: "InnovateHealth",
      logo: "/company-logos/innovatehealth.jpg",
      industry: "Healthcare",
      location: "Boston, MA",
      size: "1000-5000",
      founded: "2012",
      rating: 4.6,
      reviewCount: 89,
      openJobs: 15,
      description:
        "Revolutionary healthcare technology company improving patient outcomes through innovation.",
      website: "https://innovatehealth.com",
      featured: true,
      hiring: true,
    },
    {
      id: "greenenergy",
      name: "GreenEnergy Co",
      logo: "/company-logos/greenenergy.jpg",
      industry: "Clean Energy",
      location: "Austin, TX",
      size: "200-500",
      founded: "2018",
      rating: 4.7,
      reviewCount: 56,
      openJobs: 8,
      description:
        "Sustainable energy solutions company focused on solar and wind power innovations.",
      website: "https://greenenergy.com",
      featured: true,
    },
    {
      id: "datadriven",
      name: "DataDriven Analytics",
      logo: "/company-logos/datadriven.jpg",
      industry: "Data Science",
      location: "Seattle, WA",
      size: "100-200",
      founded: "2019",
      rating: 4.9,
      reviewCount: 67,
      openJobs: 12,
      description:
        "Advanced analytics and business intelligence solutions for enterprise clients.",
      website: "https://datadriven.com",
      hiring: true,
    },
    {
      id: "creativestudio",
      name: "CreativeStudio",
      logo: "/company-logos/creativestudio.jpg",
      industry: "Design",
      location: "New York, NY",
      size: "50-100",
      founded: "2016",
      rating: 4.5,
      reviewCount: 43,
      openJobs: 6,
      description:
        "Full-service creative agency specializing in branding and digital experiences.",
      website: "https://creativestudio.com",
    },
    {
      id: "financeforward",
      name: "FinanceForward",
      logo: "/company-logos/financeforward.jpg",
      industry: "Fintech",
      location: "Chicago, IL",
      size: "200-500",
      founded: "2017",
      rating: 4.4,
      reviewCount: 78,
      openJobs: 18,
      description:
        "Next-generation financial services platform revolutionizing digital banking.",
      website: "https://financeforward.com",
      hiring: true,
    },
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Design",
    "Marketing",
    "Education",
    "Clean Energy",
    "Data Science",
    "Fintech",
  ];

  const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Chicago, IL",
    "Remote",
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCompanies = companies
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry =
        !industryFilter ||
        industryFilter === "all" ||
        company.industry === industryFilter;
      const matchesSize =
        !sizeFilter || sizeFilter === "all" || company.size === sizeFilter;
      const matchesLocation =
        !locationFilter ||
        locationFilter === "all" ||
        company.location.includes(locationFilter.split(",")[0]);

      return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "jobs":
          return b.openJobs - a.openJobs;
        case "size":
          return (
            parseInt(b.size.split("-")[1] || "0") -
            parseInt(a.size.split("-")[1] || "0")
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const CompanyCard = ({ company }: { company: Company }) => (
    <Card className="card-hover group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={company.logo} alt={company.name} />
            <AvatarFallback className="text-lg font-semibold">
              {company.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-joburio-600 dark:group-hover:text-joburio-400 transition-colors">
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {company.industry}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {company.featured && (
                  <Badge className="bg-joburio-600 text-white">Featured</Badge>
                )}
                {company.hiring && (
                  <Badge className="bg-green-600 text-white">Hiring</Badge>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{company.size} employees</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Star className="h-4 w-4 mr-2 flex-shrink-0 text-yellow-500" />
                <span>{company.rating}</span>
                <span className="mx-1">•</span>
                <span>{company.reviewCount} reviews</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              {company.description}
            </p>

            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-joburio-600 border-joburio-600"
              >
                {company.openJobs} open positions
              </Badge>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/companies/${company.id}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CompanyCardSkeleton = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="h-16 w-16 bg-slate-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Discover Amazing Companies
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Explore top companies that are building the future and actively
              hiring talented professionals.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search companies, industries, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Select
                    value={industryFilter}
                    onValueChange={setIndustryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Size Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Size</label>
                  <Select value={sizeFilter} onValueChange={setSizeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Popular Industries */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industries.slice(0, 6).map((industry) => {
                    const count = companies.filter(
                      (c) => c.industry === industry,
                    ).length;
                    return (
                      <button
                        key={industry}
                        onClick={() => setIndustryFilter(industry)}
                        className="w-full flex items-center justify-between text-sm text-left hover:text-joburio-600 transition-colors p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <span>{industry}</span>
                        <Badge variant="secondary" className="text-xs">
                          {count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {loading ? (
                    <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
                  ) : (
                    `${filteredCompanies.length} companies found`
                  )}
                </h2>
                {searchQuery && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Results for "{searchQuery}"
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="jobs">Most Jobs</SelectItem>
                    <SelectItem value="size">Company Size</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CompanyCardSkeleton key={index} />
                  ))
                : filteredCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
            </div>

            {/* No Results */}
            {!loading && filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Building2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    No companies found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Try adjusting your search criteria or browse all companies.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setIndustryFilter("all");
                      setSizeFilter("all");
                      setLocationFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Load More */}
            {!loading && filteredCompanies.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Companies
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Companies;
