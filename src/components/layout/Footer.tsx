import { Link } from "react-router-dom";
import { BriefcaseIcon, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "For Job Seekers": [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Career Advice", href: "/career-advice" },
      { label: "Resume Builder", href: "/resume-builder" },
      { label: "Salary Guide", href: "/salary-guide" },
      { label: "Interview Tips", href: "/interview-tips" },
    ],
    "For Employers": [
      { label: "Post a Job", href: "/post-job" },
      { label: "Browse Resumes", href: "/browse-resumes" },
      { label: "Employer Resources", href: "/employer-resources" },
      { label: "Pricing", href: "/pricing" },
      { label: "Recruitment Solutions", href: "/solutions" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/joburio", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/joburio",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/joburio", label: "GitHub" },
    { icon: Mail, href: "mailto:hello@joburio.com", label: "Email" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Stay Updated with Job Opportunities
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Get the latest job postings and career insights delivered to your
              inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="button-gradient">Subscribe</Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-joburio-600 to-joburio-700 flex items-center justify-center">
                  <BriefcaseIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">Joburio</span>
              </Link>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
                Connecting talent with opportunity. Joburio is the modern job
                portal that helps job seekers find their dream careers and
                employers discover top talent.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-joburio-600 dark:hover:text-joburio-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Joburio. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-joburio-600 dark:hover:text-joburio-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-joburio-600 dark:hover:text-joburio-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-joburio-600 dark:hover:text-joburio-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
