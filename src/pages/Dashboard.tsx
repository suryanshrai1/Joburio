import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobSeekerDashboard from "@/components/dashboard/JobSeekerDashboard";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  BriefcaseIcon,
  Users,
  Building2,
  ArrowRight,
  Shield,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent("/dashboard"));
    }
  }, [user, navigate]);

  // Show loading or redirect to login if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Required</h1>
            <p className="text-slate-600 mb-6">
              Please sign in to access your dashboard.
            </p>
            <Button className="button-gradient" asChild>
              <Link to="/login">Sign In</Link>
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
        {/* Show appropriate dashboard based on user type */}
        {user.type === "employer" ? (
          <EmployerDashboard />
        ) : user.type === "jobseeker" ? (
          <JobSeekerDashboard />
        ) : user.type === "admin" ? (
          <AdminDashboard />
        ) : (
          // Default dashboard for unknown user types
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Admin Dashboard
              </h1>
              <Badge variant="outline" className="mb-4">
                🚧 Under Development
              </Badge>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Admin dashboard with system management tools is coming soon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Manage job seekers and employer accounts across the
                    platform.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Users
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-green-600" />
                    Job Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Review and approve job postings, manage featured listings.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Jobs
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-purple-600" />
                    Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    View platform metrics, user engagement, and growth
                    analytics.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Analytics
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Full admin dashboard with comprehensive management tools will be
                available soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="button-gradient" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/companies">View Companies</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
