import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Users,
  Star,
  ExternalLink,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Heart,
  Share2,
  Flag,
  Award,
  Target,
  Briefcase,
  Coffee,
  Zap,
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyProfile {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  tagline: string;
  description: string;
  industry: string;
  founded: string;
  size: string;
  headquarters: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  rating: number;
  reviewCount: number;
  salaryRating: number;
  cultureRating: number;
  careerRating: number;
  following: boolean;
  stats: {
    totalEmployees: number;
    openPositions: number;
    monthlyHires: number;
    responseRate: number;
  };
  values: string[];
  benefits: string[];
  locations: Array<{
    city: string;
    address: string;
    employeeCount: number;
    isHeadquarters: boolean;
  }>;
  perks: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  reviews: Array<{
    id: string;
    author: string;
    role: string;
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    date: string;
    helpful: number;
    verified: boolean;
  }>;
  news: Array<{
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image?: string;
    category: string;
  }>;
}

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock company data
  const mockCompanies: Record<string, CompanyProfile> = {
    innovatehealth: {
      id: "innovatehealth",
      name: "InnovateHealth",
      logo: "/company-logos/innovatehealth.jpg",
      coverImage: "/company-covers/innovatehealth-cover.jpg",
      tagline:
        "Revolutionizing healthcare through innovative technology solutions",
      description:
        "InnovateHealth is a revolutionary healthcare technology company that's transforming patient outcomes through cutting-edge innovation. Since 2012, we've been developing AI-powered diagnostic tools, telemedicine platforms, and patient management systems that serve over 5 million patients worldwide. Our mission is to make quality healthcare accessible to everyone, everywhere.",
      industry: "Healthcare Technology",
      founded: "2012",
      size: "1000-5000 employees",
      headquarters: "Boston, MA",
      website: "https://innovatehealth.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/innovatehealth",
        twitter: "https://twitter.com/innovatehealth",
      },
      rating: 4.6,
      reviewCount: 89,
      salaryRating: 4.5,
      cultureRating: 4.7,
      careerRating: 4.6,
      following: false,
      stats: {
        totalEmployees: 2800,
        openPositions: 15,
        monthlyHires: 12,
        responseRate: 88,
      },
      values: [
        "Patient-First Approach",
        "Innovation & Research",
        "Data-Driven Decisions",
        "Collaborative Care",
        "Continuous Learning",
        "Healthcare Equity",
      ],
      benefits: [
        "Comprehensive health and wellness programs",
        "401(k) with 7% company matching",
        "Flexible PTO and sabbatical options",
        "Remote work with quarterly team gatherings",
        "$4,000 annual professional development budget",
        "Stock options and performance bonuses",
        "Mental health and counseling services",
        "18 weeks parental leave",
        "On-site fitness center and wellness programs",
        "Medical, dental, and vision coverage",
      ],
      locations: [
        {
          city: "Boston, MA",
          address: "1 Health Innovation Plaza, Boston, MA 02215",
          employeeCount: 1500,
          isHeadquarters: true,
        },
        {
          city: "San Diego, CA",
          address: "500 Biotech Boulevard, San Diego, CA 92121",
          employeeCount: 800,
          isHeadquarters: false,
        },
        {
          city: "Chicago, IL",
          address: "200 Medical Center Drive, Chicago, IL 60611",
          employeeCount: 500,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "Shield",
          title: "Healthcare Excellence",
          description: "Best-in-class medical coverage and wellness programs",
        },
        {
          icon: "TrendingUp",
          title: "Career Development",
          description: "Clear advancement paths in healthcare technology",
        },
        {
          icon: "Award",
          title: "Research Opportunities",
          description: "Contribute to breakthrough medical research projects",
        },
        {
          icon: "Coffee",
          title: "Wellness Focus",
          description: "On-site fitness, healthy meals, and wellness programs",
        },
        {
          icon: "Globe",
          title: "Global Impact",
          description: "Work on solutions that improve healthcare worldwide",
        },
        {
          icon: "Zap",
          title: "Cutting-Edge Tech",
          description: "Access to latest healthcare technology and AI tools",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Dr. Maria S.",
          role: "Senior Data Scientist",
          rating: 5,
          title: "Meaningful work with real impact",
          content:
            "Working at InnovateHealth has been incredibly fulfilling. We're solving real healthcare problems and I can see the direct impact of our work on patient outcomes. The research environment is top-notch.",
          pros: [
            "Meaningful healthcare impact",
            "Strong research focus",
            "Excellent benefits",
            "Collaborative environment",
          ],
          cons: [
            "Regulatory compliance can slow things down",
            "High standards",
          ],
          date: "2024-01-08",
          helpful: 24,
          verified: true,
        },
        {
          id: "2",
          author: "James K.",
          role: "Product Manager",
          rating: 4,
          title: "Great place for healthcare innovation",
          content:
            "The company truly cares about advancing healthcare. Management is supportive and the team is brilliant. Great place to build a career in health tech.",
          pros: [
            "Healthcare mission",
            "Smart colleagues",
            "Good work-life balance",
            "Innovation culture",
          ],
          cons: ["Complex regulatory environment", "Can be demanding"],
          date: "2024-01-03",
          helpful: 18,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "InnovateHealth Receives FDA Approval for AI Diagnostic Tool",
          excerpt:
            "Our revolutionary AI-powered diagnostic platform receives FDA clearance, marking a major milestone in healthcare technology.",
          date: "2024-01-12",
          category: "Product Launch",
        },
        {
          id: "2",
          title: "Expanding Our Research Partnership with Harvard Medical",
          excerpt:
            "New 5-year research collaboration will focus on AI applications in personalized medicine and patient care.",
          date: "2024-01-05",
          category: "Partnership",
        },
      ],
    },
    greenenergy: {
      id: "greenenergy",
      name: "GreenEnergy Co",
      logo: "/company-logos/greenenergy.jpg",
      coverImage: "/company-covers/greenenergy-cover.jpg",
      tagline: "Powering the future with sustainable energy solutions",
      description:
        "GreenEnergy Co is at the forefront of the renewable energy revolution. Founded in 2018, we develop innovative solar and wind power solutions that help businesses and communities transition to clean energy. Our cutting-edge technology and sustainable practices have made us a leader in the clean energy sector, with installations across 15 states.",
      industry: "Clean Energy & Sustainability",
      founded: "2018",
      size: "200-500 employees",
      headquarters: "Austin, TX",
      website: "https://greenenergy.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/greenenergy",
        twitter: "https://twitter.com/greenenergy",
        instagram: "https://instagram.com/greenenergy",
      },
      rating: 4.7,
      reviewCount: 56,
      salaryRating: 4.4,
      cultureRating: 4.8,
      careerRating: 4.5,
      following: false,
      stats: {
        totalEmployees: 350,
        openPositions: 8,
        monthlyHires: 6,
        responseRate: 94,
      },
      values: [
        "Environmental Stewardship",
        "Sustainable Innovation",
        "Community Impact",
        "Transparency",
        "Renewable Future",
        "Social Responsibility",
      ],
      benefits: [
        "100% renewable energy office operations",
        "401(k) with environmental investment options",
        "Flexible work arrangements and remote options",
        "Electric vehicle charging stations",
        "$3,000 sustainability education budget",
        "Stock options in growing clean energy market",
        "Comprehensive health and wellness programs",
        "12 weeks parental leave",
        "Carbon offset programs for business travel",
        "Green building workspace with natural lighting",
      ],
      locations: [
        {
          city: "Austin, TX",
          address: "1000 Clean Energy Way, Austin, TX 78701",
          employeeCount: 200,
          isHeadquarters: true,
        },
        {
          city: "Denver, CO",
          address: "250 Solar Plaza, Denver, CO 80202",
          employeeCount: 100,
          isHeadquarters: false,
        },
        {
          city: "Phoenix, AZ",
          address: "500 Renewable Drive, Phoenix, AZ 85001",
          employeeCount: 50,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "Globe",
          title: "Environmental Impact",
          description: "Make a real difference in fighting climate change",
        },
        {
          icon: "Zap",
          title: "Cutting-Edge Technology",
          description: "Work with the latest renewable energy innovations",
        },
        {
          icon: "TrendingUp",
          title: "Growing Industry",
          description: "Career growth in the expanding clean energy sector",
        },
        {
          icon: "Coffee",
          title: "Green Workspace",
          description: "Eco-friendly offices powered by renewable energy",
        },
        {
          icon: "Award",
          title: "Innovation Culture",
          description: "Encouraged to develop sustainable solutions",
        },
        {
          icon: "Shield",
          title: "Future-Proof Career",
          description: "Build skills in the energy sector of the future",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Sarah T.",
          role: "Solar Engineer",
          rating: 5,
          title: "Passionate team working for a better future",
          content:
            "Love working here! The company's mission aligns perfectly with my values. We're genuinely making a difference in renewable energy adoption. Great team culture and innovative projects.",
          pros: [
            "Meaningful environmental mission",
            "Innovative projects",
            "Great team culture",
            "Growing industry",
          ],
          cons: ["Startup pace can be intense", "Limited remote options"],
          date: "2024-01-06",
          helpful: 19,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "GreenEnergy Co Completes Largest Solar Installation in Texas",
          excerpt:
            "Our 500MW solar farm in West Texas is now operational, providing clean energy to over 100,000 homes.",
          date: "2024-01-10",
          category: "Project Completion",
        },
      ],
    },
    datadriven: {
      id: "datadriven",
      name: "DataDriven Analytics",
      logo: "/company-logos/datadriven.jpg",
      coverImage: "/company-covers/datadriven-cover.jpg",
      tagline: "Transforming businesses through intelligent data analytics",
      description:
        "DataDriven Analytics specializes in advanced analytics and business intelligence solutions for enterprise clients. Founded in 2019, we help Fortune 500 companies unlock the power of their data through machine learning, predictive analytics, and custom BI platforms. Our team of data scientists and engineers delivers actionable insights that drive business growth.",
      industry: "Data Science & Analytics",
      founded: "2019",
      size: "100-200 employees",
      headquarters: "Seattle, WA",
      website: "https://datadriven.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/datadriven",
        twitter: "https://twitter.com/datadriven",
      },
      rating: 4.9,
      reviewCount: 67,
      salaryRating: 4.8,
      cultureRating: 4.9,
      careerRating: 4.7,
      following: false,
      stats: {
        totalEmployees: 150,
        openPositions: 12,
        monthlyHires: 4,
        responseRate: 96,
      },
      values: [
        "Data Excellence",
        "Client Success",
        "Innovation Culture",
        "Continuous Learning",
        "Analytical Rigor",
        "Collaborative Growth",
      ],
      benefits: [
        "Top-tier compensation packages",
        "401(k) with 8% company matching",
        "Unlimited PTO with mandatory minimums",
        "Full remote work flexibility",
        "$5,000 annual learning and conference budget",
        "Equity participation in company growth",
        "Premium health, dental, and vision coverage",
        "Home office setup allowance",
        "Latest technology and software licenses",
        "Quarterly team retreats and events",
      ],
      locations: [
        {
          city: "Seattle, WA",
          address: "2000 Data Center Drive, Seattle, WA 98101",
          employeeCount: 80,
          isHeadquarters: true,
        },
        {
          city: "Remote",
          address: "Distributed team across North America",
          employeeCount: 70,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "TrendingUp",
          title: "High-Impact Projects",
          description: "Work on data solutions for Fortune 500 companies",
        },
        {
          icon: "Zap",
          title: "Latest Technology",
          description: "Access to cutting-edge analytics tools and platforms",
        },
        {
          icon: "Award",
          title: "Learning Culture",
          description: "Continuous learning with conferences and courses",
        },
        {
          icon: "Globe",
          title: "Remote First",
          description: "Full flexibility to work from anywhere",
        },
        {
          icon: "Coffee",
          title: "Small Team Impact",
          description: "Your work directly impacts company success",
        },
        {
          icon: "Shield",
          title: "Data Security",
          description: "Work with enterprise-grade security standards",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Alex R.",
          role: "Senior Data Scientist",
          rating: 5,
          title: "Dream job for data professionals",
          content:
            "Best data science role I've ever had. Working with cutting-edge ML models, great clients, and an incredibly smart team. The learning opportunities are endless and the work is genuinely challenging.",
          pros: [
            "Cutting-edge data science work",
            "Smart and supportive team",
            "Excellent compensation",
            "Remote flexibility",
          ],
          cons: ["High expectations", "Fast-paced environment"],
          date: "2024-01-04",
          helpful: 31,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "DataDriven Analytics Wins AI Excellence Award",
          excerpt:
            "Recognized for our innovative machine learning platform that helped a major retailer increase revenue by 23%.",
          date: "2024-01-09",
          category: "Awards",
        },
      ],
    },
    creativestudio: {
      id: "creativestudio",
      name: "CreativeStudio",
      logo: "/company-logos/creativestudio.jpg",
      coverImage: "/company-covers/creativestudio-cover.jpg",
      tagline:
        "Crafting exceptional digital experiences through innovative design",
      description:
        "CreativeStudio is a full-service creative agency specializing in branding, digital experiences, and user interface design. Since 2016, we've partnered with startups and Fortune 500 companies to create memorable brand identities and digital products. Our multidisciplinary team combines strategy, design, and technology to deliver exceptional results.",
      industry: "Design & Creative Services",
      founded: "2016",
      size: "50-100 employees",
      headquarters: "New York, NY",
      website: "https://creativestudio.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/creativestudio",
        twitter: "https://twitter.com/creativestudio",
        instagram: "https://instagram.com/creativestudio",
      },
      rating: 4.5,
      reviewCount: 43,
      salaryRating: 4.3,
      cultureRating: 4.7,
      careerRating: 4.4,
      following: false,
      stats: {
        totalEmployees: 75,
        openPositions: 6,
        monthlyHires: 3,
        responseRate: 90,
      },
      values: [
        "Creative Excellence",
        "Client Partnership",
        "Design Innovation",
        "Cultural Diversity",
        "Collaborative Spirit",
        "Artistic Integrity",
      ],
      benefits: [
        "Creative-focused health and wellness programs",
        "401(k) with 5% company matching",
        "Flexible PTO and creative sabbaticals",
        "Hybrid work model with beautiful studio space",
        "$2,500 creative development budget",
        "Profit sharing and performance bonuses",
        "Designer software and hardware allowances",
        "Team building and creative workshops",
        "Art supplies and creative materials budget",
        "Gallery visits and design conference attendance",
      ],
      locations: [
        {
          city: "New York, NY",
          address: "450 Creative Square, New York, NY 10013",
          employeeCount: 60,
          isHeadquarters: true,
        },
        {
          city: "Los Angeles, CA",
          address: "1200 Design Boulevard, Los Angeles, CA 90028",
          employeeCount: 15,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "Award",
          title: "Creative Freedom",
          description:
            "Artistic freedom to explore innovative design solutions",
        },
        {
          icon: "Coffee",
          title: "Inspiring Workspace",
          description: "Beautiful studio spaces designed for creativity",
        },
        {
          icon: "Globe",
          title: "Diverse Clients",
          description: "Work with exciting brands across various industries",
        },
        {
          icon: "TrendingUp",
          title: "Portfolio Building",
          description: "Build an impressive portfolio with award-winning work",
        },
        {
          icon: "Zap",
          title: "Latest Design Tools",
          description: "Access to premium design software and equipment",
        },
        {
          icon: "Shield",
          title: "Creative Community",
          description: "Collaborative environment with talented designers",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Maya L.",
          role: "UX Designer",
          rating: 5,
          title: "Perfect place for creative growth",
          content:
            "CreativeStudio has been amazing for my design career. The projects are diverse and challenging, and I've learned so much from the senior designers. The studio culture is supportive and inspiring.",
          pros: [
            "Creative and inspiring projects",
            "Supportive team environment",
            "Great learning opportunities",
            "Beautiful office space",
          ],
          cons: ["Project deadlines can be tight", "Competitive environment"],
          date: "2024-01-07",
          helpful: 16,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "CreativeStudio Wins Three Design Awards at Annual Conference",
          excerpt:
            "Our branding work for emerging tech startups recognized with multiple industry awards for innovation and creativity.",
          date: "2024-01-11",
          category: "Awards",
        },
      ],
    },
    financeforward: {
      id: "financeforward",
      name: "FinanceForward",
      logo: "/company-logos/financeforward.jpg",
      coverImage: "/company-covers/financeforward-cover.jpg",
      tagline: "Revolutionizing digital banking and financial services",
      description:
        "FinanceForward is a next-generation financial services platform that's revolutionizing digital banking. Founded in 2017, we provide innovative fintech solutions including mobile banking, investment platforms, and payment processing systems. Our technology serves over 2 million customers and processes billions in transactions annually.",
      industry: "Financial Technology (Fintech)",
      founded: "2017",
      size: "200-500 employees",
      headquarters: "Chicago, IL",
      website: "https://financeforward.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/financeforward",
        twitter: "https://twitter.com/financeforward",
      },
      rating: 4.4,
      reviewCount: 78,
      salaryRating: 4.6,
      cultureRating: 4.3,
      careerRating: 4.5,
      following: false,
      stats: {
        totalEmployees: 400,
        openPositions: 18,
        monthlyHires: 8,
        responseRate: 85,
      },
      values: [
        "Financial Innovation",
        "Customer Trust",
        "Regulatory Excellence",
        "Data Security",
        "Financial Inclusion",
        "Technological Leadership",
      ],
      benefits: [
        "Competitive financial services compensation",
        "401(k) with 6% matching plus profit sharing",
        "Flexible PTO and financial wellness programs",
        "Hybrid work model with modern Chicago office",
        "$3,500 professional development budget",
        "Stock options in growing fintech company",
        "Premium health coverage and HSA contributions",
        "Student loan repayment assistance",
        "Financial planning and investment services",
        "Performance bonuses and retention incentives",
      ],
      locations: [
        {
          city: "Chicago, IL",
          address: "300 Financial District Plaza, Chicago, IL 60601",
          employeeCount: 250,
          isHeadquarters: true,
        },
        {
          city: "New York, NY",
          address: "150 Wall Street, New York, NY 10005",
          employeeCount: 100,
          isHeadquarters: false,
        },
        {
          city: "San Francisco, CA",
          address: "500 Fintech Row, San Francisco, CA 94105",
          employeeCount: 50,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "Shield",
          title: "Financial Security",
          description: "Strong compensation and comprehensive benefits",
        },
        {
          icon: "TrendingUp",
          title: "Fintech Growth",
          description: "Career growth in the expanding fintech industry",
        },
        {
          icon: "Zap",
          title: "Modern Technology",
          description: "Work with cutting-edge financial technology stack",
        },
        {
          icon: "Award",
          title: "Industry Recognition",
          description: "Join an award-winning fintech innovator",
        },
        {
          icon: "Globe",
          title: "Market Impact",
          description: "Shape the future of digital banking",
        },
        {
          icon: "Coffee",
          title: "Professional Environment",
          description: "Modern offices in major financial centers",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Robert P.",
          role: "Software Engineer",
          rating: 4,
          title: "Great fintech experience",
          content:
            "Working at FinanceForward has been a great experience. The technology stack is modern, the problems are interesting, and there's real opportunity for growth. The regulatory environment adds complexity but also job security.",
          pros: [
            "Modern technology stack",
            "Interesting technical challenges",
            "Good compensation package",
            "Growth opportunities",
          ],
          cons: ["Regulatory constraints", "Fast-paced environment"],
          date: "2024-01-02",
          helpful: 14,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "FinanceForward Reaches 2 Million Customer Milestone",
          excerpt:
            "Our digital banking platform now serves over 2 million customers, processing $50B+ in annual transactions.",
          date: "2024-01-13",
          category: "Company Milestone",
        },
      ],
    },
    techcorp: {
      id: "techcorp",
      name: "TechCorp Solutions",
      logo: "/company-logos/techcorp.jpg",
      coverImage: "/company-covers/techcorp-cover.jpg",
      tagline: "Building the future of technology with AI innovation",
      description:
        "TechCorp Solutions is a leading software development company specializing in AI and machine learning solutions. Since our founding in 2015, we've been at the forefront of technological innovation, creating products that serve millions of users worldwide. Our mission is to democratize AI technology and make it accessible to businesses of all sizes. We believe in the power of technology to solve complex problems and create meaningful impact in people's lives.",
      industry: "Technology & Software",
      founded: "2015",
      size: "500-1000 employees",
      headquarters: "San Francisco, CA",
      website: "https://techcorp.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/techcorp",
        twitter: "https://twitter.com/techcorp",
        instagram: "https://instagram.com/techcorp",
      },
      rating: 4.8,
      reviewCount: 124,
      salaryRating: 4.6,
      cultureRating: 4.9,
      careerRating: 4.7,
      following: false,
      stats: {
        totalEmployees: 750,
        openPositions: 23,
        monthlyHires: 8,
        responseRate: 92,
      },
      values: [
        "Innovation First",
        "Customer Success",
        "Collaborative Culture",
        "Continuous Learning",
        "Work-Life Balance",
        "Diversity & Inclusion",
      ],
      benefits: [
        "Comprehensive health, dental, and vision insurance",
        "401(k) retirement plan with 6% company matching",
        "Unlimited paid time off policy",
        "Remote work flexibility with home office stipend",
        "$3,000 annual learning and development budget",
        "Equity compensation program",
        "Mental health and wellness programs",
        "Parental leave (16 weeks)",
        "Free catered lunches and snacks",
        "Top-tier equipment and technology",
      ],
      locations: [
        {
          city: "San Francisco, CA",
          address: "123 Tech Street, San Francisco, CA 94105",
          employeeCount: 450,
          isHeadquarters: true,
        },
        {
          city: "Austin, TX",
          address: "456 Innovation Blvd, Austin, TX 78701",
          employeeCount: 200,
          isHeadquarters: false,
        },
        {
          city: "Remote",
          address: "Work from anywhere in the US",
          employeeCount: 100,
          isHeadquarters: false,
        },
      ],
      perks: [
        {
          icon: "Coffee",
          title: "Free Meals & Snacks",
          description: "Catered lunches and fully stocked kitchen",
        },
        {
          icon: "Zap",
          title: "Latest Technology",
          description: "MacBook Pro, external monitors, and top-tier tools",
        },
        {
          icon: "Shield",
          title: "Comprehensive Benefits",
          description: "Health, dental, vision, and mental health support",
        },
        {
          icon: "TrendingUp",
          title: "Career Growth",
          description: "Clear advancement paths and mentorship programs",
        },
        {
          icon: "Globe",
          title: "Remote Flexibility",
          description: "Work from home or any of our office locations",
        },
        {
          icon: "Award",
          title: "Learning Budget",
          description: "$3,000 annually for courses, conferences, and books",
        },
      ],
      reviews: [
        {
          id: "1",
          author: "Sarah M.",
          role: "Senior Software Engineer",
          rating: 5,
          title: "Amazing culture and growth opportunities",
          content:
            "I've been at TechCorp for 3 years and it's been incredible. The company truly cares about employee development and provides excellent opportunities for growth. The remote work flexibility is fantastic, and the benefits are top-notch.",
          pros: [
            "Excellent work-life balance",
            "Great learning opportunities",
            "Supportive management",
            "Competitive compensation",
          ],
          cons: ["Fast-paced environment", "High expectations"],
          date: "2024-01-10",
          helpful: 28,
          verified: true,
        },
        {
          id: "2",
          author: "Michael R.",
          role: "Product Manager",
          rating: 4,
          title: "Great place for career advancement",
          content:
            "TechCorp offers excellent opportunities for career growth. The leadership team is transparent about company goals and provides clear paths for advancement. The collaborative culture makes it easy to work across teams.",
          pros: [
            "Clear career progression",
            "Transparent leadership",
            "Great colleagues",
            "Innovation-focused",
          ],
          cons: ["Can be demanding at times", "Rapid changes"],
          date: "2024-01-05",
          helpful: 19,
          verified: true,
        },
        {
          id: "3",
          author: "Jennifer L.",
          role: "UX Designer",
          rating: 5,
          title: "Incredible team and meaningful work",
          content:
            "Working at TechCorp has been one of the best decisions of my career. The design team is world-class, and we're working on products that actually make a difference. The company values creativity and gives us the freedom to innovate.",
          pros: [
            "Meaningful work",
            "Creative freedom",
            "Excellent team",
            "Strong leadership",
          ],
          cons: ["Sometimes long hours during launches"],
          date: "2023-12-28",
          helpful: 22,
          verified: true,
        },
      ],
      news: [
        {
          id: "1",
          title: "TechCorp Launches Revolutionary AI Platform",
          excerpt:
            "Our new AI platform is set to transform how businesses approach automation and decision-making.",
          date: "2024-01-15",
          image: "/news/ai-platform-launch.jpg",
          category: "Product Launch",
        },
        {
          id: "2",
          title: "Expanding Our Austin Office",
          excerpt:
            "We're excited to announce the expansion of our Austin office to accommodate our growing team.",
          date: "2024-01-08",
          category: "Company News",
        },
        {
          id: "3",
          title: "TechCorp Named 'Best Place to Work' for Third Year",
          excerpt:
            "We're honored to receive this recognition for our commitment to employee satisfaction and company culture.",
          date: "2024-01-02",
          category: "Awards",
        },
      ],
    },
  };

  // Mock open jobs at the company
  const openJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: {
        name: "TechCorp Solutions",
        logo: "/company-logos/techcorp.jpg",
        location: "San Francisco, CA",
      },
      location: "San Francisco, CA (Remote)",
      type: "full-time" as const,
      salary: { min: 120000, max: 160000, currency: "USD" },
      description:
        "Join our innovative team building next-generation web applications using React, TypeScript, and modern development practices.",
      tags: ["React", "TypeScript", "Node.js", "AWS"],
      postedAt: "2024-01-15T10:00:00Z",
      featured: true,
    },
    {
      id: "4",
      title: "Product Manager",
      company: {
        name: "TechCorp Solutions",
        logo: "/company-logos/techcorp.jpg",
        location: "San Francisco, CA",
      },
      location: "San Francisco, CA",
      type: "full-time" as const,
      salary: { min: 140000, max: 180000, currency: "USD" },
      description:
        "Lead product strategy and development for our core AI platform serving millions of users.",
      tags: ["Product Strategy", "AI/ML", "Leadership", "Analytics"],
      postedAt: "2024-01-12T14:30:00Z",
    },
    {
      id: "5",
      title: "UX Designer",
      company: {
        name: "TechCorp Solutions",
        logo: "/company-logos/techcorp.jpg",
        location: "San Francisco, CA",
      },
      location: "Austin, TX (Hybrid)",
      type: "full-time" as const,
      salary: { min: 95000, max: 125000, currency: "USD" },
      description:
        "Design intuitive user experiences for our AI-powered products and tools.",
      tags: ["UI/UX", "Figma", "User Research", "Design Systems"],
      postedAt: "2024-01-10T09:15:00Z",
    },
  ];

  useEffect(() => {
    if (id && mockCompanies[id]) {
      setLoading(true);
      setTimeout(() => {
        setCompany(mockCompanies[id]);
        setFollowing(mockCompanies[id].following);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleFollow = () => {
    if (!user) {
      navigate(
        "/login?redirect=" + encodeURIComponent(window.location.pathname),
      );
      return;
    }
    setFollowing(!following);
  };

  const renderStarRating = (rating: number, size = "h-4 w-4") => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              size,
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-slate-300",
            )}
          />
        ))}
      </div>
    );
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Coffee,
      Zap,
      Shield,
      TrendingUp,
      Globe,
      Award,
    };
    return icons[iconName] || Award;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-48 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <p className="text-slate-600 mb-6">
              The company you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/companies">Browse All Companies</Link>
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
        {/* Back Navigation */}
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Company Header */}
        <Card className="mb-8 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-joburio-600 to-joburio-700 relative">
            {company.coverImage ? (
              <img
                src={company.coverImage}
                alt={`${company.name} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-joburio-600 to-joburio-700 opacity-90" />
            )}
          </div>

          <CardContent className="p-8 -mt-16 relative">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6">
              <div className="flex items-end space-x-6 mb-4 lg:mb-0">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="text-2xl font-bold">
                    {company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {company.name}
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-3">
                    {company.tagline}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{company.headquarters}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Founded {company.founded}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleFollow}
                  className={cn(
                    "flex items-center",
                    following &&
                      "bg-joburio-50 text-joburio-600 border-joburio-200",
                  )}
                >
                  <Heart
                    className={cn("h-4 w-4 mr-2", following && "fill-current")}
                  />
                  {following ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-joburio-600">
                  {company.stats.totalEmployees.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Employees
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-joburio-600">
                  {company.stats.openPositions}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Open Jobs
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-joburio-600">
                  {company.stats.monthlyHires}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Monthly Hires
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-joburio-600">
                  {company.stats.responseRate}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Response Rate
                </div>
              </div>
            </div>

            {/* Rating Overview */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStarRating(company.rating)}
                    <span className="font-semibold">{company.rating}</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Overall ({company.reviewCount} reviews)
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStarRating(company.salaryRating)}
                    <span className="font-semibold">
                      {company.salaryRating}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Salary & Benefits
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStarRating(company.cultureRating)}
                    <span className="font-semibold">
                      {company.cultureRating}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Culture & Values
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStarRating(company.careerRating)}
                    <span className="font-semibold">
                      {company.careerRating}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Career Growth
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">
              Jobs ({company.stats.openPositions})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({company.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* About Company */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About {company.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {company.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Company Values */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Our Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {company.values.map((value, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                          >
                            <Target className="h-5 w-5 text-joburio-600" />
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Perks & Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Perks & Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {company.perks.map((perk, index) => {
                          const IconComponent = getIconComponent(perk.icon);
                          return (
                            <div
                              key={index}
                              className="flex items-start space-x-4"
                            >
                              <div className="p-2 bg-joburio-100 rounded-lg">
                                <IconComponent className="h-5 w-5 text-joburio-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">
                                  {perk.title}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {perk.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-3">
                        <h4 className="font-semibold">Additional Benefits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {company.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Company Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Website
                          </span>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-joburio-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit Site
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Industry
                          </span>
                          <span className="font-medium">
                            {company.industry}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Company Size
                          </span>
                          <span className="font-medium">{company.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Founded
                          </span>
                          <span className="font-medium">{company.founded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Headquarters
                          </span>
                          <span className="font-medium">
                            {company.headquarters}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      {/* Social Links */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Follow Us</h4>
                        <div className="flex space-x-3">
                          {company.socialLinks.linkedin && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={company.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {company.socialLinks.twitter && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={company.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Twitter className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {company.socialLinks.instagram && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={company.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Instagram className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Office Locations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Office Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {company.locations.map((location, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{location.city}</h4>
                            {location.isHeadquarters && (
                              <Badge variant="secondary">HQ</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {location.address}
                          </p>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{location.employeeCount} employees</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Open Positions ({openJobs.length})
                  </h2>
                  <Button className="button-gradient">
                    <Briefcase className="h-4 w-4 mr-2" />
                    View All Jobs
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {openJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {openJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      No open positions
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Check back later for new opportunities at {company.name}.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-joburio-600 mb-2">
                        {company.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStarRating(company.rating)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Overall Rating
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {company.salaryRating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStarRating(company.salaryRating)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Salary & Benefits
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {company.cultureRating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStarRating(company.cultureRating)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Culture & Values
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {company.careerRating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStarRating(company.careerRating)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Career Growth
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {company.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {review.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold">
                                  {review.author}
                                </h4>
                                {review.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {review.role}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {renderStarRating(review.rating, "h-3 w-3")}
                                <span className="text-sm">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold mb-3">{review.title}</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          {review.content}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
                              Pros
                            </h4>
                            <ul className="space-y-1">
                              {review.pros.map((pro, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-slate-600 dark:text-slate-400 flex items-start"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">
                              Cons
                            </h4>
                            <ul className="space-y-1">
                              {review.cons.map((con, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-slate-600 dark:text-slate-400"
                                >
                                  • {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>
                            {review.helpful} people found this helpful
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Culture & Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      At {company.name}, we believe that great culture drives
                      great results. Our values aren't just words on a wall –
                      they guide every decision we make and every interaction we
                      have.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {company.values.map((value, index) => (
                        <div
                          key={index}
                          className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg text-center"
                        >
                          <Target className="h-8 w-8 text-joburio-600 mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">{value}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            This value guides our daily work and decision-making
                            process.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sample culture content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Diversity & Inclusion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300">
                        We're committed to building a diverse and inclusive
                        workplace where everyone can thrive. Our employee
                        resource groups and inclusive hiring practices ensure
                        we're attracting talent from all backgrounds.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Learning & Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300">
                        We invest in our people's growth with mentorship
                        programs, conference attendance, online learning
                        platforms, and a generous learning budget for each
                        employee.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Company News & Updates</h2>

                <div className="space-y-6">
                  {company.news.map((article) => (
                    <Card key={article.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          {article.image && (
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">
                                {article.category}
                              </Badge>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(article.date).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                              {article.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyProfile;
