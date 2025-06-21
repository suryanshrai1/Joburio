import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, MapPin, Users, Star, ArrowRight } from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  employeeCount: string;
  rating: number;
  reviewCount: number;
  openJobs: number;
  description: string;
  featured?: boolean;
}

interface FeaturedCompaniesProps {
  companies?: Company[];
  showAll?: boolean;
}

const FeaturedCompanies = ({
  companies = [],
  showAll = false,
}: FeaturedCompaniesProps) => {
  // Mock data for demonstration
  const mockCompanies: Company[] = [
    {
      id: "1",
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.jpg",
      industry: "Technology",
      location: "San Francisco, CA",
      employeeCount: "500-1000",
      rating: 4.8,
      reviewCount: 124,
      openJobs: 23,
      description:
        "Leading software development company specializing in AI and machine learning solutions.",
      featured: true,
    },
    {
      id: "2",
      name: "InnovateHealth",
      logo: "/company-logos/innovatehealth.jpg",
      industry: "Healthcare",
      location: "Boston, MA",
      employeeCount: "1000-5000",
      rating: 4.6,
      reviewCount: 89,
      openJobs: 15,
      description:
        "Revolutionary healthcare technology company improving patient outcomes through innovation.",
      featured: true,
    },
    {
      id: "3",
      name: "GreenEnergy Co",
      logo: "/company-logos/greenenergy.jpg",
      industry: "Clean Energy",
      location: "Austin, TX",
      employeeCount: "200-500",
      rating: 4.7,
      reviewCount: 56,
      openJobs: 8,
      description:
        "Sustainable energy solutions company focused on solar and wind power innovations.",
      featured: true,
    },
    {
      id: "4",
      name: "DataDriven Analytics",
      logo: "/company-logos/datadriven.jpg",
      industry: "Data Science",
      location: "Seattle, WA",
      employeeCount: "100-200",
      rating: 4.9,
      reviewCount: 67,
      openJobs: 12,
      description:
        "Advanced analytics and business intelligence solutions for enterprise clients.",
    },
    {
      id: "5",
      name: "CreativeStudio",
      logo: "/company-logos/creativestudio.jpg",
      industry: "Design",
      location: "New York, NY",
      employeeCount: "50-100",
      rating: 4.5,
      reviewCount: 43,
      openJobs: 6,
      description:
        "Full-service creative agency specializing in branding and digital experiences.",
    },
    {
      id: "6",
      name: "FinanceForward",
      logo: "/company-logos/financeforward.jpg",
      industry: "Fintech",
      location: "Chicago, IL",
      employeeCount: "200-500",
      rating: 4.4,
      reviewCount: 78,
      openJobs: 18,
      description:
        "Next-generation financial services platform revolutionizing digital banking.",
    },
  ];

  const displayCompanies = companies.length > 0 ? companies : mockCompanies;
  const companiesToShow = showAll
    ? displayCompanies
    : displayCompanies.slice(0, 6);

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Featured Companies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover amazing companies that are actively hiring and building the
            future across various industries.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companiesToShow.map((company) => (
            <Card
              key={company.id}
              className="card-hover group cursor-pointer relative overflow-hidden"
            >
              {company.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-joburio-600 text-white">Featured</Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
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
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-joburio-600 dark:group-hover:text-joburio-400 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{company.employeeCount} employees</span>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-joburio-600 hover:text-joburio-700"
                    asChild
                  >
                    <Link to={`/companies/${company.id}`}>
                      View Company
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-joburio-600 text-joburio-600 hover:bg-joburio-600 hover:text-white"
              asChild
            >
              <Link to="/companies">
                <Building2 className="h-4 w-4 mr-2" />
                View All Companies
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCompanies;
