import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import { useData } from "@/contexts/DataContext";
import {
  Search,
  Users,
  Building2,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Globe,
  Target,
  Award,
  Play,
} from "lucide-react";

const Index = () => {
  const { jobs, loading } = useData();
  const [searchResults, setSearchResults] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer at TechCorp",
      avatar: "/avatars/sarah.jpg",
      content:
        "I found my dream job through Joburio in just 2 weeks! The platform made it so easy to connect with top companies.",
      rating: 5,
      company: "TechCorp Solutions",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at InnovateTech",
      avatar: "/avatars/michael.jpg",
      content:
        "The job recommendations were spot-on. Joburio helped me transition from engineering to product management seamlessly.",
      rating: 5,
      company: "InnovateTech",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director at GreenEnergy",
      avatar: "/avatars/emily.jpg",
      content:
        "The career resources and interview preparation tools on Joburio gave me the confidence to land my ideal role.",
      rating: 5,
      company: "GreenEnergy Co",
    },
  ];

  const handleSearch = (query: string, filters: any) => {
    // Navigate to jobs page with search parameters
    window.location.href = `/jobs?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-joburio-600 via-joburio-700 to-joburio-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>

        <div className="relative container py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🎉 Over 15,000 jobs posted this month
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Find Your Dream Career with{" "}
              <span className="text-white">Joburio</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-joburio-100 max-w-3xl mx-auto leading-relaxed">
              Connect with top companies, discover exciting opportunities, and
              take the next step in your professional journey.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-joburio-100">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>50,000+ Job Seekers</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                <span>5,000+ Companies</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-16 md:h-20 fill-background"
          >
            <path d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Search Results or Default Content */}
      {searchResults ? (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">
                  No jobs found. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* Featured Jobs */}
          <section className="py-16">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Featured Jobs
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Discover hand-picked opportunities from top companies actively
                  looking for talented professionals like you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {loading
                  ? // Loading skeleton
                    Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-800 rounded-lg p-6 animate-pulse"
                      >
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20" />
                        </div>
                      </div>
                    ))
                  : jobs
                      .filter((job) => job.featured || job.status === "active")
                      .slice(0, 6)
                      .map((job) => <JobCard key={job.id} job={job} />)}
              </div>

              <div className="text-center">
                <Button size="lg" asChild className="button-gradient">
                  <Link to="/jobs">
                    View All Jobs
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Companies */}
          <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="container">
              <FeaturedCompanies />
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  How Joburio Works
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Find your next opportunity in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-joburio-100 dark:bg-joburio-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-joburio-600 dark:text-joburio-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    1. Search & Discover
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Browse thousands of job opportunities from top companies
                    worldwide. Use our advanced filters to find the perfect
                    match.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-joburio-100 dark:bg-joburio-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-joburio-600 dark:text-joburio-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    2. Apply & Connect
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Submit your application with our streamlined process.
                    Connect directly with hiring managers and showcase your
                    skills.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-joburio-100 dark:bg-joburio-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-joburio-600 dark:text-joburio-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">3. Get Hired</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Land your dream job with our career support tools. Get
                    interview tips, salary insights, and ongoing guidance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Success Stories
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Hear from professionals who found their dream careers through
                  Joburio
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-joburio-600 to-joburio-700">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Start Your Career Journey?
                </h2>
                <p className="text-xl mb-8 text-joburio-100">
                  Join thousands of professionals who have found their dream
                  jobs through Joburio. Your next opportunity is just a click
                  away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-joburio-600 hover:bg-joburio-50"
                    asChild
                  >
                    <Link to="/signup">
                      Get Started Free
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-joburio-600"
                    asChild
                  >
                    <Link to="/jobs">
                      Browse Jobs
                      <Briefcase className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="py-16">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-joburio-600 mb-2">
                    50K+
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Active Job Seekers
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-joburio-600 mb-2">
                    5K+
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Partner Companies
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-joburio-600 mb-2">
                    15K+
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Jobs Posted Monthly
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-joburio-600 mb-2">
                    95%
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
