import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  Building2,
  Users,
  DollarSign,
  MapPin,
  FileText,
  Target,
  CheckCircle,
} from "lucide-react";

const PostJob = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Post a Job
            </h1>
            <Badge variant="outline" className="mb-4">
              🚧 Coming Soon
            </Badge>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Our job posting system is being developed to help employers find
              the perfect candidates.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-joburio-600" />
                  Job Description Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Create compelling job descriptions with our guided builder.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Rich text editor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Template library</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>SEO optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-joburio-600" />
                  Smart Targeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Reach the right candidates with intelligent targeting options.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Skills-based matching</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Location filtering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Experience level targeting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-joburio-600" />
                  Applicant Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Efficiently manage and review candidate applications.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Application tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Candidate scoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Interview scheduling</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-joburio-600" />
                  Flexible Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Choose from various pricing options to fit your hiring needs.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Pay-per-post</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Monthly subscriptions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Featured job promotions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Posting Process */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
              How Job Posting Will Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Create Account",
                  description: "Sign up as an employer and verify your company",
                  icon: Building2,
                },
                {
                  step: 2,
                  title: "Build Job Post",
                  description:
                    "Use our guided form to create compelling job descriptions",
                  icon: FileText,
                },
                {
                  step: 3,
                  title: "Set Preferences",
                  description:
                    "Configure targeting, budget, and application settings",
                  icon: Target,
                },
                {
                  step: 4,
                  title: "Go Live",
                  description:
                    "Publish your job and start receiving applications",
                  icon: CheckCircle,
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="bg-joburio-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              Ready to find your next great hire? The job posting system will
              include advanced features for modern recruiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="button-gradient" disabled>
                Post Your First Job (Coming Soon)
              </Button>
              <Button variant="outline" asChild>
                <Link to="/jobs">Browse Existing Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJob;
