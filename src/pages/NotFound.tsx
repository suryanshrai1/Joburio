import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home, Search, ArrowLeft, BriefcaseIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-joburio-600 to-joburio-700 flex items-center justify-center">
              <BriefcaseIcon className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-joburio-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or is currently under
            development. Let's get you back on track to finding your dream job!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="button-gradient" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/jobs">
                <Search className="h-4 w-4 mr-2" />
                Browse Jobs
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm">
              <Link to="/jobs" className="text-joburio-600 hover:underline">
                Job Search
              </Link>
              <span className="text-slate-400">•</span>
              <Link
                to="/companies"
                className="text-joburio-600 hover:underline"
              >
                Companies
              </Link>
              <span className="text-slate-400">•</span>
              <Link to="/post-job" className="text-joburio-600 hover:underline">
                Post a Job
              </Link>
              <span className="text-slate-400">•</span>
              <Link to="/login" className="text-joburio-600 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
