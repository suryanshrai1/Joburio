import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building2,
  Plus,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salaryMin: string;
  salaryMax: string;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  tags: string[];
  experienceLevel: string;
  education: string;
  remote: boolean;
  urgentHiring: boolean;
}

const PostJob = () => {
  const { user } = useAuth();
  const { addJob } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentResponsibility, setCurrentResponsibility] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentNiceToHave, setCurrentNiceToHave] = useState("");
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [currentTag, setCurrentTag] = useState("");

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    description: "",
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    benefits: [],
    tags: [],
    experienceLevel: "",
    education: "",
    remote: false,
    urgentHiring: false,
  });

  // Authentication check
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in as an employer to post jobs.",
        variant: "destructive",
      });
      navigate("/login?redirect=/post-job&userType=employer");
      return;
    }

    if (user.type !== "employer" && user.type !== "admin") {
      toast({
        title: "Access Denied",
        description: "Only employers can post jobs.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
  }, [user, navigate, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addToArray = (
    field: keyof JobFormData,
    value: string,
    setter: (value: string) => void,
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
      setter("");
    }
  };

  const removeFromArray = (field: keyof JobFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.title || !formData.description || !formData.location) {
        throw new Error("Please fill in all required fields");
      }

      if (!formData.salaryMin || !formData.salaryMax) {
        throw new Error("Please provide salary range");
      }

      if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
        throw new Error("Maximum salary must be higher than minimum salary");
      }

      if (formData.requirements.length === 0) {
        throw new Error("Please add at least one requirement");
      }

      // Create job object and add it to the jobs list
      const jobData = {
        title: formData.title,
        company: {
          id: user.type === "admin" ? "techcorp" : "techcorp", // In real app, get from user's company
          name:
            user.type === "admin" ? "TechCorp Solutions" : "TechCorp Solutions",
          logo: "/companies/techcorp.png",
          location: formData.location,
          website: "https://techcorp.com",
          size: "500-1000 employees",
          industry: "Technology",
          founded: "2015",
          description: "Leading technology solutions company.",
          rating: 4.8,
          reviewCount: 124,
        },
        location: formData.location,
        type: formData.type,
        salary: {
          min: parseInt(formData.salaryMin),
          max: parseInt(formData.salaryMax),
          currency: formData.currency,
          period: "yearly" as const,
        },
        description: formData.description,
        responsibilities: formData.responsibilities,
        requirements: formData.requirements,
        niceToHave: formData.niceToHave,
        benefits: formData.benefits,
        tags: formData.tags,
        experienceLevel: formData.experienceLevel,
        education: formData.education,
        featured: false,
        department: formData.department,
        status: "active" as const,
        remote: formData.remote,
        urgentHiring: formData.urgentHiring,
      };

      // Add the job to the global jobs list
      const newJob = await addJob(jobData);

      // Reset form for potential next job posting
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "full-time",
        salaryMin: "",
        salaryMax: "",
        currency: "USD",
        description: "",
        responsibilities: [],
        requirements: [],
        niceToHave: [],
        benefits: [],
        tags: [],
        experienceLevel: "",
        education: "",
        remote: false,
        urgentHiring: false,
      });

      toast({
        title: "Job Posted Successfully!",
        description: `"${newJob.title}" is now live and accepting applications.`,
      });

      // Redirect to the new job details page
      navigate(`/jobs/${newJob.id}`);
    } catch (error: any) {
      toast({
        title: "Error Posting Job",
        description: error.message || "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render if user is not authenticated or not an employer
  if (!user || (user.type !== "employer" && user.type !== "admin")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Post a New Job
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Find the perfect candidate for your team by posting a detailed job
              listing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Frontend Developer"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        handleSelectChange("department", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Data">Data & Analytics</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. San Francisco, CA"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Job Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="salaryMin">Min Salary *</Label>
                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax">Max Salary *</Label>
                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      placeholder="80000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        handleSelectChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, company, and what makes this opportunity exciting..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentResponsibility}
                    onChange={(e) => setCurrentResponsibility(e.target.value)}
                    placeholder="Add a key responsibility..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          "responsibilities",
                          currentResponsibility,
                          setCurrentResponsibility,
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addToArray(
                        "responsibilities",
                        currentResponsibility,
                        setCurrentResponsibility,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.responsibilities.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromArray("responsibilities", index)
                        }
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    placeholder="Add a requirement..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          "requirements",
                          currentRequirement,
                          setCurrentRequirement,
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addToArray(
                        "requirements",
                        currentRequirement,
                        setCurrentRequirement,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromArray("requirements", index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {formData.requirements.length === 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Please add at least one requirement for this position.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Nice to Have */}
            <Card>
              <CardHeader>
                <CardTitle>Nice to Have</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentNiceToHave}
                    onChange={(e) => setCurrentNiceToHave(e.target.value)}
                    placeholder="Add a nice-to-have skill..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          "niceToHave",
                          currentNiceToHave,
                          setCurrentNiceToHave,
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addToArray(
                        "niceToHave",
                        currentNiceToHave,
                        setCurrentNiceToHave,
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.niceToHave.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromArray("niceToHave", index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentBenefit}
                    onChange={(e) => setCurrentBenefit(e.target.value)}
                    placeholder="Add a benefit or perk..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray(
                          "benefits",
                          currentBenefit,
                          setCurrentBenefit,
                        );
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addToArray("benefits", currentBenefit, setCurrentBenefit)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromArray("benefits", index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a skill or technology..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addToArray("tags", currentTag, setCurrentTag);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addToArray("tags", currentTag, setCurrentTag)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((item, index) => (
                    <Badge
                      key={index}
                      className="flex items-center gap-1 bg-joburio-100 text-joburio-800"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeFromArray("tags", index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Input
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior (5+ years)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education Requirements</Label>
                    <Input
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder="e.g. Bachelor's degree in Computer Science"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remote"
                      name="remote"
                      checked={formData.remote}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="remote">Remote work available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="urgentHiring"
                      name="urgentHiring"
                      checked={formData.urgentHiring}
                      onChange={handleInputChange}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="urgentHiring">Urgent hiring</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="button-gradient"
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Post Job
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJob;
