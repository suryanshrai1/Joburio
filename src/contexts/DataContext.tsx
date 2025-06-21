import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

// Types
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    location: string;
    website?: string;
    size?: string;
    industry?: string;
    founded?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
  };
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary: {
    min: number;
    max: number;
    currency: string;
    period?: "yearly" | "monthly" | "hourly";
  };
  description: string;
  responsibilities?: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits: string[];
  tags: string[];
  experienceLevel?: string;
  education?: string;
  postedAt: string;
  expiresAt?: string;
  featured?: boolean;
  department: string;
  applicationCount: number;
  viewCount: number;
  status: "active" | "paused" | "closed" | "draft";
  remote?: boolean;
  urgentHiring?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  appliedAt: string;
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
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  rating?: number;
  interviewDate?: string;
  lastUpdated: string;
}

export interface SavedJob {
  id: string;
  jobId: string;
  userId: string;
  savedAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description: string;
  size: string;
  industry: string;
  founded: string;
  headquarters: string;
  benefits: string[];
  perks: string[];
  rating: number;
  reviewCount: number;
  employees: string;
  openJobs: number;
  culture: {
    values: string[];
    workEnvironment: string;
    diversity: string;
  };
  locations: {
    name: string;
    address: string;
    type: "headquarters" | "office" | "remote";
  }[];
  reviews: {
    id: string;
    rating: number;
    title: string;
    pros: string;
    cons: string;
    author: string;
    position: string;
    date: string;
  }[];
  news: {
    id: string;
    title: string;
    summary: string;
    date: string;
    source: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  location?: string;
  phone?: string;
  bio?: string;
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    location: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    description?: string;
  }[];
  skills: string[];
  links: {
    website?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  preferences: {
    jobTypes: string[];
    locations: string[];
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    remoteWork: boolean;
  };
}

interface DataContextType {
  // Data
  jobs: Job[];
  applications: Application[];
  savedJobs: SavedJob[];
  companies: Company[];
  userProfile: UserProfile | null;

  // Loading states
  loading: boolean;
  applicationsLoading: boolean;

  // Job functions
  getJob: (jobId: string) => Job | undefined;
  getJobsByCompany: (companyId: string) => Job[];
  searchJobs: (query: string, filters?: any) => Job[];
  applyToJob: (jobId: string, coverLetter?: string) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;

  // Saved jobs functions
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isJobSaved: (jobId: string) => boolean;

  // Application functions
  getUserApplications: () => Application[];
  getApplicationsForJob: (jobId: string) => Application[];
  updateApplicationStatus: (
    applicationId: string,
    status: Application["status"],
  ) => Promise<void>;
  hasAppliedToJob: (jobId: string) => boolean;

  // Company functions
  getCompany: (companyId: string) => Company | undefined;

  // Profile functions
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;

  // Stats
  getJobSeekerStats: () => {
    totalApplications: number;
    savedJobs: number;
    interviewsScheduled: number;
    offersReceived: number;
  };

  getEmployerStats: () => {
    activeJobs: number;
    totalApplications: number;
    totalViews: number;
    newApplications: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      // Load saved data from localStorage
      const savedJobsData = localStorage.getItem("joburio_saved_jobs");
      const savedApplicationsData = localStorage.getItem(
        "joburio_applications",
      );
      const savedProfiles = localStorage.getItem("joburio_profiles");

      if (savedJobsData) {
        setSavedJobs(JSON.parse(savedJobsData));
      }

      if (savedApplicationsData) {
        setApplications(JSON.parse(savedApplicationsData));
      }

      if (savedProfiles && user) {
        const profiles = JSON.parse(savedProfiles);
        const userProfile = profiles[user.id];
        if (userProfile) {
          setUserProfile(userProfile);
        }
      }

      // Initialize with mock data
      setJobs(initialJobs);
      setCompanies(initialCompanies);
      setLoading(false);
    };

    initializeData();
  }, [user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("joburio_saved_jobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("joburio_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (userProfile && user) {
      const profiles = JSON.parse(
        localStorage.getItem("joburio_profiles") || "{}",
      );
      profiles[user.id] = userProfile;
      localStorage.setItem("joburio_profiles", JSON.stringify(profiles));
    }
  }, [userProfile, user]);

  // Job functions
  const getJob = useCallback(
    (jobId: string) => {
      return jobs.find((job) => job.id === jobId);
    },
    [jobs],
  );

  const getJobsByCompany = useCallback(
    (companyId: string) => {
      return jobs.filter((job) => job.company.id === companyId);
    },
    [jobs],
  );

  const searchJobs = useCallback(
    (query: string, filters?: any) => {
      return jobs.filter((job) => {
        const matchesQuery = query
          ? job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.name.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase()) ||
            job.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase()),
            )
          : true;

        // Apply filters if provided
        if (filters) {
          if (filters.jobType && filters.jobType !== "all") {
            if (job.type !== filters.jobType) return false;
          }
          if (filters.location && filters.location !== "all") {
            if (
              !job.location
                .toLowerCase()
                .includes(filters.location.toLowerCase())
            )
              return false;
          }
          if (filters.company && filters.company !== "all") {
            if (job.company.id !== filters.company) return false;
          }
        }

        return matchesQuery;
      });
    },
    [jobs],
  );

  const applyToJob = useCallback(
    async (jobId: string, coverLetter?: string) => {
      if (!user) throw new Error("User must be logged in to apply");

      setApplicationsLoading(true);
      try {
        // Check if already applied
        const existingApplication = applications.find(
          (app) => app.jobId === jobId && app.userId === user.id,
        );

        if (existingApplication) {
          throw new Error("You have already applied to this job");
        }

        // Create new application
        const newApplication: Application = {
          id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          jobId,
          userId: user.id,
          appliedAt: new Date().toISOString(),
          status: "new",
          coverLetter,
          lastUpdated: new Date().toISOString(),
        };

        setApplications((prev) => [...prev, newApplication]);

        // Update job application count
        setJobs((prev) =>
          prev.map((job) =>
            job.id === jobId
              ? { ...job, applicationCount: job.applicationCount + 1 }
              : job,
          ),
        );
      } finally {
        setApplicationsLoading(false);
      }
    },
    [user, applications],
  );

  const withdrawApplication = useCallback(
    async (applicationId: string) => {
      if (!user) throw new Error("User must be logged in");

      setApplicationsLoading(true);
      try {
        const application = applications.find(
          (app) => app.id === applicationId,
        );
        if (!application) throw new Error("Application not found");

        // Update application status to withdrawn
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId
              ? {
                  ...app,
                  status: "withdrawn" as const,
                  lastUpdated: new Date().toISOString(),
                }
              : app,
          ),
        );

        // Update job application count
        setJobs((prev) =>
          prev.map((job) =>
            job.id === application.jobId
              ? {
                  ...job,
                  applicationCount: Math.max(0, job.applicationCount - 1),
                }
              : job,
          ),
        );
      } finally {
        setApplicationsLoading(false);
      }
    },
    [user, applications],
  );

  // Saved jobs functions
  const saveJob = useCallback(
    async (jobId: string) => {
      if (!user) throw new Error("User must be logged in to save jobs");

      const existingSave = savedJobs.find(
        (save) => save.jobId === jobId && save.userId === user.id,
      );

      if (!existingSave) {
        const newSave: SavedJob = {
          id: `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          jobId,
          userId: user.id,
          savedAt: new Date().toISOString(),
        };

        setSavedJobs((prev) => [...prev, newSave]);
      }
    },
    [user, savedJobs],
  );

  const unsaveJob = useCallback(
    async (jobId: string) => {
      if (!user) throw new Error("User must be logged in");

      setSavedJobs((prev) =>
        prev.filter(
          (save) => !(save.jobId === jobId && save.userId === user.id),
        ),
      );
    },
    [user],
  );

  const isJobSaved = useCallback(
    (jobId: string) => {
      if (!user) return false;
      return savedJobs.some(
        (save) => save.jobId === jobId && save.userId === user.id,
      );
    },
    [user, savedJobs],
  );

  // Application functions
  const getUserApplications = useCallback(() => {
    if (!user) return [];
    return applications.filter((app) => app.userId === user.id);
  }, [user, applications]);

  const getApplicationsForJob = useCallback(
    (jobId: string) => {
      return applications.filter((app) => app.jobId === jobId);
    },
    [applications],
  );

  const updateApplicationStatus = useCallback(
    async (applicationId: string, status: Application["status"]) => {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status, lastUpdated: new Date().toISOString() }
            : app,
        ),
      );
    },
    [],
  );

  const hasAppliedToJob = useCallback(
    (jobId: string) => {
      if (!user) return false;
      return applications.some(
        (app) =>
          app.jobId === jobId &&
          app.userId === user.id &&
          app.status !== "withdrawn",
      );
    },
    [user, applications],
  );

  // Company functions
  const getCompany = useCallback(
    (companyId: string) => {
      return companies.find((company) => company.id === companyId);
    },
    [companies],
  );

  // Profile functions
  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!user) throw new Error("User must be logged in");

      setUserProfile((prev) => {
        if (!prev) {
          // Create new profile
          const newProfile: UserProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            experience: [],
            education: [],
            skills: [],
            links: {},
            preferences: {
              jobTypes: [],
              locations: [],
              salaryRange: { min: 50000, max: 150000, currency: "USD" },
              remoteWork: false,
            },
            ...updates,
          };
          return newProfile;
        }

        return { ...prev, ...updates };
      });
    },
    [user],
  );

  // Stats functions
  const getJobSeekerStats = useCallback(() => {
    if (!user)
      return {
        totalApplications: 0,
        savedJobs: 0,
        interviewsScheduled: 0,
        offersReceived: 0,
      };

    const userApplications = applications.filter(
      (app) => app.userId === user.id,
    );
    const userSavedJobs = savedJobs.filter((save) => save.userId === user.id);

    return {
      totalApplications: userApplications.length,
      savedJobs: userSavedJobs.length,
      interviewsScheduled: userApplications.filter(
        (app) =>
          app.status === "interview_scheduled" || app.status === "interviewed",
      ).length,
      offersReceived: userApplications.filter(
        (app) => app.status === "offered" || app.status === "hired",
      ).length,
    };
  }, [user, applications, savedJobs]);

  const getEmployerStats = useCallback(() => {
    // For employers, calculate stats based on their company's jobs
    const companyJobs = jobs.filter((job) => job.status === "active");
    const totalApplications = applications.length;
    const totalViews = jobs.reduce((sum, job) => sum + job.viewCount, 0);
    const newApplications = applications.filter(
      (app) =>
        app.status === "new" &&
        new Date(app.appliedAt) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    ).length;

    return {
      activeJobs: companyJobs.length,
      totalApplications,
      totalViews,
      newApplications,
    };
  }, [jobs, applications]);

  const value: DataContextType = {
    // Data
    jobs,
    applications,
    savedJobs,
    companies,
    userProfile,

    // Loading states
    loading,
    applicationsLoading,

    // Functions
    getJob,
    getJobsByCompany,
    searchJobs,
    applyToJob,
    withdrawApplication,
    saveJob,
    unsaveJob,
    isJobSaved,
    getUserApplications,
    getApplicationsForJob,
    updateApplicationStatus,
    hasAppliedToJob,
    getCompany,
    updateProfile,
    getJobSeekerStats,
    getEmployerStats,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Initial jobs data with comprehensive details
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: {
      id: "techcorp",
      name: "TechCorp Solutions",
      logo: "/companies/techcorp.png",
      location: "San Francisco, CA",
      website: "https://techcorp.com",
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2015",
      description:
        "TechCorp Solutions is a leading software development company specializing in AI and machine learning solutions. We're building the future of technology with innovative products that serve millions of users worldwide.",
      rating: 4.8,
      reviewCount: 124,
    },
    location: "San Francisco, CA",
    type: "full-time",
    salary: { min: 120000, max: 160000, currency: "USD", period: "yearly" },
    description:
      "We're looking for a Senior Frontend Developer to join our innovative team building next-generation web applications. You'll work with cutting-edge technologies including React, TypeScript, and modern development practices to create exceptional user experiences that scale to millions of users.",
    responsibilities: [
      "Develop and maintain high-quality React applications with TypeScript",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Optimize applications for maximum performance and scalability",
      "Lead code reviews and mentor junior developers",
      "Participate in architecture decisions and technical planning",
      "Work closely with backend teams to integrate APIs and services",
      "Implement responsive designs and ensure cross-browser compatibility",
      "Contribute to our design system and component library",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React and TypeScript",
      "Strong understanding of modern JavaScript (ES6+)",
      "Experience with state management (Redux, Zustand, or similar)",
      "Proficiency in CSS-in-JS solutions and responsive design",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Familiarity with build tools (Webpack, Vite, etc.)",
      "Understanding of web performance optimization",
      "Experience with version control (Git) and CI/CD pipelines",
      "Strong problem-solving skills and attention to detail",
    ],
    niceToHave: [
      "Experience with Next.js or other React frameworks",
      "Knowledge of GraphQL and Apollo Client",
      "Experience with cloud platforms (AWS, GCP, Azure)",
      "Familiarity with Docker and containerization",
      "Understanding of accessibility (WCAG) standards",
      "Experience with design tools (Figma, Sketch)",
      "Background in UI/UX design principles",
      "Experience with micro-frontends architecture",
    ],
    benefits: [
      "Competitive salary with equity compensation",
      "Comprehensive health, dental, and vision insurance",
      "401(k) retirement plan with company matching",
      "Unlimited paid time off policy",
      "Remote work flexibility with home office stipend",
      "$3,000 annual learning and development budget",
      "Top-tier equipment (MacBook Pro, external monitors)",
      "Catered lunches and snacks in office",
      "Annual company retreats and team building events",
      "Mental health and wellness programs",
    ],
    tags: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    experienceLevel: "Senior (5+ years)",
    education: "Bachelor's degree in Computer Science or equivalent experience",
    postedAt: "2024-01-15T10:00:00Z",
    featured: true,
    department: "Engineering",
    applicationCount: 0,
    viewCount: 1284,
    status: "active",
    expiresAt: "2024-02-15T10:00:00Z",
    remote: true,
    urgentHiring: false,
  },
  {
    id: "2",
    title: "Product Manager",
    company: {
      id: "techcorp",
      name: "TechCorp Solutions",
      logo: "/companies/techcorp.png",
      location: "San Francisco, CA",
      website: "https://techcorp.com",
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2015",
      description:
        "TechCorp Solutions is a leading software development company specializing in AI and machine learning solutions.",
      rating: 4.8,
      reviewCount: 124,
    },
    location: "Remote",
    type: "full-time",
    salary: { min: 140000, max: 180000, currency: "USD", period: "yearly" },
    description:
      "Join our product team to drive innovation and growth. As a Product Manager, you'll work cross-functionally to deliver products that delight our users and drive business success. You'll be responsible for the entire product lifecycle from ideation to launch and beyond.",
    responsibilities: [
      "Define product vision, strategy, and roadmap in collaboration with stakeholders",
      "Conduct user research and market analysis to identify opportunities",
      "Work closely with engineering teams to deliver high-quality features",
      "Collaborate with design teams to create exceptional user experiences",
      "Analyze product metrics and user feedback to drive data-informed decisions",
      "Communicate product updates and success metrics to stakeholders",
      "Prioritize features and manage product backlog effectively",
      "Lead cross-functional teams through product development cycles",
    ],
    requirements: [
      "4+ years of product management experience",
      "Experience with agile methodologies and product development",
      "Strong analytical skills with experience in data analysis",
      "Excellent communication and presentation skills",
      "Experience with product management tools (Jira, Confluence, etc.)",
      "Understanding of user experience design principles",
      "Ability to work effectively with technical teams",
      "Bachelor's degree in Business, Engineering, or related field",
    ],
    niceToHave: [
      "MBA or advanced degree in relevant field",
      "Experience in B2B SaaS products",
      "Technical background or engineering experience",
      "Experience with A/B testing and experimentation",
      "Knowledge of SQL and data analysis tools",
      "Experience with product analytics platforms",
      "Background in user research and usability testing",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health Insurance with dental and vision",
      "401k with company matching",
      "Stock options and equity participation",
      "Learning budget for professional development",
      "Flexible work arrangements and remote options",
      "Wellness programs and mental health support",
      "Professional development opportunities",
    ],
    tags: ["Product Management", "Strategy", "Agile", "Analytics"],
    experienceLevel: "Mid-level (4+ years)",
    education: "Bachelor's degree in Business, Engineering, or related field",
    postedAt: "2024-01-12T14:00:00Z",
    department: "Product",
    applicationCount: 0,
    viewCount: 892,
    status: "active",
    remote: true,
    urgentHiring: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: {
      id: "creativestudio",
      name: "CreativeStudio",
      logo: "/companies/creativestudio.png",
      location: "Austin, TX",
      website: "https://creativestudio.com",
      size: "50-200 employees",
      industry: "Design & Creative",
      founded: "2018",
      description:
        "CreativeStudio is a cutting-edge design agency that helps companies create beautiful and functional digital experiences.",
      rating: 4.6,
      reviewCount: 89,
    },
    location: "Austin, TX",
    type: "full-time",
    salary: { min: 95000, max: 125000, currency: "USD", period: "yearly" },
    description:
      "Create beautiful and intuitive user experiences for our diverse portfolio of clients. As a UX Designer, you'll work on exciting projects ranging from mobile apps to complex web applications, always putting the user at the center of your design process.",
    responsibilities: [
      "Conduct user research to understand user needs and behaviors",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product managers and developers throughout the design process",
      "Develop and maintain design systems and style guides",
      "Conduct usability testing and iterate based on feedback",
      "Present design concepts and rationale to clients and stakeholders",
      "Stay current with design trends and best practices",
      "Mentor junior designers and contribute to team knowledge sharing",
    ],
    requirements: [
      "3+ years of UX design experience",
      "Proficiency in Figma, Sketch, and design tools",
      "Experience with user research and usability testing",
      "Strong portfolio showcasing design process and thinking",
      "Understanding of responsive design principles",
      "Experience with design systems and component libraries",
      "Excellent communication and presentation skills",
      "Bachelor's degree in Design, HCI, or related field",
    ],
    niceToHave: [
      "Experience with prototyping tools (Principle, Framer, etc.)",
      "Knowledge of front-end development (HTML, CSS, JavaScript)",
      "Experience with accessibility standards and inclusive design",
      "Background in psychology or cognitive science",
      "Experience with design thinking methodologies",
      "Familiarity with data visualization and information architecture",
      "Experience working in agile development environments",
    ],
    benefits: [
      "Competitive salary with performance reviews",
      "Health Insurance with dental and vision coverage",
      "Creative time for personal projects",
      "Equipment budget for design tools and hardware",
      "Professional development and conference attendance",
      "Flexible work hours and remote work options",
      "Modern office space with collaborative areas",
      "Team lunches and creative workshops",
    ],
    tags: ["UI/UX", "Figma", "Design Systems", "User Research"],
    experienceLevel: "Mid-level (3+ years)",
    education: "Bachelor's degree in Design, HCI, or related field",
    postedAt: "2024-01-10T09:00:00Z",
    department: "Design",
    applicationCount: 0,
    viewCount: 567,
    status: "active",
    remote: false,
    urgentHiring: false,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: {
      id: "techcorp",
      name: "TechCorp Solutions",
      logo: "/companies/techcorp.png",
      location: "San Francisco, CA",
      website: "https://techcorp.com",
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2015",
      description:
        "TechCorp Solutions is a leading software development company specializing in AI and machine learning solutions.",
      rating: 4.8,
      reviewCount: 124,
    },
    location: "Remote",
    type: "contract",
    salary: { min: 110000, max: 140000, currency: "USD", period: "yearly" },
    description:
      "Build and maintain our cloud infrastructure to support our rapidly growing platform. As a DevOps Engineer, you'll work with modern tools and technologies to ensure our applications are scalable, reliable, and secure.",
    responsibilities: [
      "Design and implement scalable cloud infrastructure on AWS",
      "Automate deployment processes using CI/CD pipelines",
      "Monitor system performance and implement improvements",
      "Manage containerized applications with Docker and Kubernetes",
      "Implement infrastructure as code using Terraform",
      "Ensure security best practices across all environments",
      "Collaborate with development teams to optimize application performance",
      "Troubleshoot production issues and implement preventive measures",
    ],
    requirements: [
      "3+ years of DevOps or infrastructure engineering experience",
      "Strong experience with AWS cloud services",
      "Proficiency with Docker and Kubernetes",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
      "Experience with monitoring and logging tools",
      "Strong scripting skills (Python, Bash, or similar)",
      "Understanding of networking and security principles",
    ],
    niceToHave: [
      "AWS certification (Solutions Architect, DevOps Engineer)",
      "Experience with multiple cloud providers (GCP, Azure)",
      "Knowledge of service mesh technologies (Istio, Consul)",
      "Experience with database administration and optimization",
      "Familiarity with machine learning infrastructure",
      "Experience with configuration management tools (Ansible, Chef)",
      "Background in software development",
    ],
    benefits: [
      "Competitive contract rate with potential for full-time",
      "Flexible schedule and fully remote work",
      "Equipment and home office stipend",
      "Access to online learning platforms",
      "Opportunity to work with cutting-edge technologies",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    experienceLevel: "Mid-level (3+ years)",
    education: "Bachelor's degree in Computer Science or equivalent experience",
    postedAt: "2024-01-08T11:00:00Z",
    department: "Engineering",
    applicationCount: 0,
    viewCount: 423,
    status: "active",
    remote: true,
    urgentHiring: true,
  },
  {
    id: "5",
    title: "Data Scientist",
    company: {
      id: "datadriven",
      name: "DataDriven Analytics",
      logo: "/companies/datadriven.png",
      location: "New York, NY",
      website: "https://datadriven.com",
      size: "200-500 employees",
      industry: "Data & Analytics",
      founded: "2016",
      description:
        "DataDriven Analytics helps companies make data-informed decisions through advanced analytics and machine learning solutions.",
      rating: 4.7,
      reviewCount: 156,
    },
    location: "New York, NY",
    type: "full-time",
    salary: { min: 130000, max: 170000, currency: "USD", period: "yearly" },
    description:
      "Unlock insights from data to drive business decisions and create predictive models that impact millions of users. Join our world-class data science team to work on challenging problems at the intersection of statistics, machine learning, and business strategy.",
    responsibilities: [
      "Develop and deploy machine learning models for various business use cases",
      "Analyze large datasets to identify trends and actionable insights",
      "Collaborate with product and engineering teams to implement data solutions",
      "Design and conduct A/B tests to measure feature impact",
      "Create data visualizations and reports for stakeholders",
      "Build and maintain data pipelines for model training and inference",
      "Research and implement new machine learning techniques",
      "Mentor junior data scientists and contribute to best practices",
    ],
    requirements: [
      "MS/PhD in Data Science, Statistics, Computer Science, or related field",
      "4+ years of experience in data science or machine learning",
      "Strong programming skills in Python and SQL",
      "Experience with ML frameworks (scikit-learn, TensorFlow, PyTorch)",
      "Proficiency in statistical analysis and hypothesis testing",
      "Experience with data visualization tools (Matplotlib, Plotly, Tableau)",
      "Knowledge of big data technologies (Spark, Hadoop)",
      "Strong communication skills for presenting findings to non-technical audiences",
    ],
    niceToHave: [
      "Experience with cloud ML platforms (AWS SageMaker, Google AI Platform)",
      "Knowledge of deep learning and neural networks",
      "Experience with MLOps and model deployment",
      "Background in specific domains (NLP, computer vision, recommendation systems)",
      "Experience with distributed computing frameworks",
      "Knowledge of causal inference and experimental design",
      "Publications in peer-reviewed journals or conferences",
    ],
    benefits: [
      "Competitive salary with equity participation",
      "Comprehensive health, dental, and vision insurance",
      "401k with company matching",
      "Research time for exploring new techniques",
      "Conference and training budget",
      "Access to high-performance computing resources",
      "Flexible work arrangements",
      "Collaborative and innovative work environment",
    ],
    tags: ["Python", "Machine Learning", "SQL", "Statistics"],
    experienceLevel: "Senior (4+ years)",
    education: "MS/PhD in Data Science, Statistics, or related field",
    postedAt: "2024-01-05T15:00:00Z",
    department: "Data",
    applicationCount: 0,
    viewCount: 756,
    status: "active",
    remote: false,
    urgentHiring: false,
  },
  {
    id: "6",
    title: "Marketing Specialist",
    company: {
      id: "greenenergy",
      name: "GreenEnergy Co",
      logo: "/companies/greenenergy.png",
      location: "Portland, OR",
      website: "https://greenenergy.com",
      size: "100-250 employees",
      industry: "Clean Energy",
      founded: "2019",
      description:
        "GreenEnergy Co is pioneering sustainable energy solutions through innovative technology and community partnerships.",
      rating: 4.5,
      reviewCount: 67,
    },
    location: "Portland, OR",
    type: "full-time",
    salary: { min: 75000, max: 95000, currency: "USD", period: "yearly" },
    description:
      "Drive marketing initiatives for sustainable energy solutions that make a real impact on the environment. Join our mission-driven team to create compelling campaigns that educate, inspire, and drive adoption of clean energy technologies.",
    responsibilities: [
      "Develop and execute digital marketing campaigns across multiple channels",
      "Create engaging content for website, blog, social media, and email campaigns",
      "Manage social media presence and community engagement",
      "Analyze campaign performance and optimize for better results",
      "Collaborate with sales team to generate and nurture leads",
      "Coordinate events, webinars, and trade show participation",
      "Conduct market research and competitive analysis",
      "Support brand development and maintain brand consistency",
    ],
    requirements: [
      "3+ years of digital marketing experience",
      "Strong content creation and copywriting skills",
      "Experience with marketing automation tools (HubSpot, Marketo)",
      "Proficiency in Google Analytics and social media platforms",
      "Knowledge of SEO best practices and content optimization",
      "Experience with email marketing and lead nurturing",
      "Strong project management and organizational skills",
      "Bachelor's degree in Marketing, Communications, or related field",
    ],
    niceToHave: [
      "Experience in clean energy or sustainability sector",
      "Knowledge of B2B marketing in technical industries",
      "Experience with PPC advertising (Google Ads, Facebook Ads)",
      "Graphic design skills and familiarity with design tools",
      "Experience with CRM systems and sales enablement",
      "Knowledge of marketing attribution and multi-touch modeling",
      "Video production and editing experience",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health insurance with dental and vision",
      "401k retirement plan",
      "Remote Fridays and flexible work arrangements",
      "Professional development opportunities",
      "Sustainability focus and meaningful work",
      "Team building and volunteer activities",
      "Employee discounts on green energy products",
    ],
    tags: ["Digital Marketing", "Content", "SEO", "Analytics"],
    experienceLevel: "Mid-level (3+ years)",
    education:
      "Bachelor's degree in Marketing, Communications, or related field",
    postedAt: "2024-01-03T12:00:00Z",
    department: "Marketing",
    applicationCount: 0,
    viewCount: 334,
    status: "active",
    remote: false,
    urgentHiring: false,
  },
];

const initialCompanies: Company[] = [
  {
    id: "techcorp",
    name: "TechCorp Solutions",
    logo: "/companies/techcorp.png",
    website: "https://techcorp.com",
    description:
      "Leading technology solutions company focused on innovation and digital transformation.",
    size: "1000-5000",
    industry: "Technology",
    founded: "2010",
    headquarters: "San Francisco, CA",
    benefits: ["Health Insurance", "401k", "Stock Options", "Flexible Hours"],
    perks: ["Free Lunch", "Gym Membership", "Learning Budget", "Remote Work"],
    rating: 4.5,
    reviewCount: 234,
    employees: "2,500+",
    openJobs: 15,
    culture: {
      values: ["Innovation", "Collaboration", "Excellence", "Integrity"],
      workEnvironment:
        "Fast-paced, collaborative environment with focus on innovation and continuous learning.",
      diversity:
        "Committed to building a diverse and inclusive workplace where everyone can thrive.",
    },
    locations: [
      {
        name: "San Francisco HQ",
        address: "123 Tech Street, San Francisco, CA",
        type: "headquarters",
      },
      {
        name: "Austin Office",
        address: "456 Innovation Ave, Austin, TX",
        type: "office",
      },
      { name: "Remote", address: "Work from anywhere", type: "remote" },
    ],
    reviews: [
      {
        id: "1",
        rating: 5,
        title: "Great place to work",
        pros: "Excellent work-life balance, great benefits, innovative projects",
        cons: "Can be fast-paced at times",
        author: "Software Engineer",
        position: "Current Employee",
        date: "2024-01-15",
      },
    ],
    news: [
      {
        id: "1",
        title: "TechCorp Announces New AI Initiative",
        summary:
          "Company invests $50M in artificial intelligence research and development.",
        date: "2024-01-10",
        source: "Tech News",
      },
    ],
  },
  // Additional companies would go here...
];
