import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyProfile from "./pages/CompanyProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post-job" element={<PostJob />} />

              {/* Placeholder routes that will be built later */}
              <Route path="/resources" element={<NotFound />} />
              <Route path="/career-advice" element={<NotFound />} />
              <Route path="/resume-builder" element={<NotFound />} />
              <Route path="/salary-guide" element={<NotFound />} />
              <Route path="/interview-tips" element={<NotFound />} />
              <Route path="/browse-resumes" element={<NotFound />} />
              <Route path="/employer-resources" element={<NotFound />} />
              <Route path="/pricing" element={<NotFound />} />
              <Route path="/solutions" element={<NotFound />} />
              <Route path="/about" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="/blog" element={<NotFound />} />
              <Route path="/press" element={<NotFound />} />
              <Route path="/careers" element={<NotFound />} />
              <Route path="/help" element={<NotFound />} />
              <Route path="/privacy" element={<NotFound />} />
              <Route path="/terms" element={<NotFound />} />
              <Route path="/cookies" element={<NotFound />} />
              <Route path="/sitemap" element={<NotFound />} />

              {/* Catch-all route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
