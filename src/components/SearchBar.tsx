import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Filter,
  X,
  Building2,
  DollarSign,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFilters {
  jobTypes: string[];
  locations: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  experienceLevel: string[];
  industries: string[];
  skills: string[];
  remote: boolean;
}

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
  variant?: "hero" | "page";
}

const SearchBar = ({
  onSearch,
  className,
  variant = "page",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    jobTypes: [],
    locations: [],
    salaryRange: { min: 0, max: 200000 },
    experienceLevel: [],
    industries: [],
    skills: [],
    remote: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Lead",
    "Executive",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Engineering",
    "Operations",
    "Customer Service",
  ];

  const popularSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Machine Learning",
    "Data Analysis",
    "Project Management",
    "Digital Marketing",
  ];

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (
    category: keyof SearchFilters,
    value: any,
    action: "add" | "remove" | "set" = "set",
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (action === "add" && Array.isArray(newFilters[category])) {
        (newFilters[category] as string[]).push(value);
      } else if (action === "remove" && Array.isArray(newFilters[category])) {
        newFilters[category] = (newFilters[category] as string[]).filter(
          (item) => item !== value,
        );
      } else {
        (newFilters as any)[category] = value;
      }

      return newFilters;
    });
  };

  const activeFiltersCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === "boolean" && value) return count + 1;
    return count;
  }, 0);

  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      locations: [],
      salaryRange: { min: 0, max: 200000 },
      experienceLevel: [],
      industries: [],
      skills: [],
      remote: false,
    });
  };

  const FilterSection = ({
    title,
    items,
    selectedItems,
    onToggle,
  }: {
    title: string;
    items: string[];
    selectedItems: string[];
    onToggle: (item: string) => void;
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">{title}</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onToggle(item)}
            />
            <Label
              htmlFor={`${title}-${item}`}
              className="text-sm cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Main Search Bar */}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg border",
          variant === "hero" && "bg-white/95 backdrop-blur-sm shadow-xl",
        )}
      >
        {/* Job Title/Keywords */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Job title, keywords, or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Location */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="City, state, or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 text-base"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Filters Button */}
        <div className="flex gap-2">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-4 relative"
                size={variant === "hero" ? "lg" : "default"}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 px-1 min-w-[1.25rem] h-5"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-6" align="end">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>

                <FilterSection
                  title="Job Type"
                  items={jobTypes}
                  selectedItems={filters.jobTypes}
                  onToggle={(item) => {
                    if (filters.jobTypes.includes(item)) {
                      handleFilterChange("jobTypes", item, "remove");
                    } else {
                      handleFilterChange("jobTypes", item, "add");
                    }
                  }}
                />

                <Separator />

                <FilterSection
                  title="Experience Level"
                  items={experienceLevels}
                  selectedItems={filters.experienceLevel}
                  onToggle={(item) => {
                    if (filters.experienceLevel.includes(item)) {
                      handleFilterChange("experienceLevel", item, "remove");
                    } else {
                      handleFilterChange("experienceLevel", item, "add");
                    }
                  }}
                />

                <Separator />

                <FilterSection
                  title="Industry"
                  items={industries}
                  selectedItems={filters.industries}
                  onToggle={(item) => {
                    if (filters.industries.includes(item)) {
                      handleFilterChange("industries", item, "remove");
                    } else {
                      handleFilterChange("industries", item, "add");
                    }
                  }}
                />

                <Separator />

                <FilterSection
                  title="Skills"
                  items={popularSkills}
                  selectedItems={filters.skills}
                  onToggle={(item) => {
                    if (filters.skills.includes(item)) {
                      handleFilterChange("skills", item, "remove");
                    } else {
                      handleFilterChange("skills", item, "add");
                    }
                  }}
                />

                <Separator />

                {/* Remote Work */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={filters.remote}
                    onCheckedChange={(checked) =>
                      handleFilterChange("remote", checked)
                    }
                  />
                  <Label htmlFor="remote" className="text-sm cursor-pointer">
                    Remote work only
                  </Label>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-12 button-gradient"
            size={variant === "hero" ? "lg" : "default"}
          >
            <Search className="h-4 w-4 mr-2" />
            Search Jobs
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.jobTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("jobTypes", type, "remove")}
              />
            </Badge>
          ))}
          {filters.experienceLevel.map((level) => (
            <Badge
              key={level}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {level}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  handleFilterChange("experienceLevel", level, "remove")
                }
              />
            </Badge>
          ))}
          {filters.industries.map((industry) => (
            <Badge
              key={industry}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {industry}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  handleFilterChange("industries", industry, "remove")
                }
              />
            </Badge>
          ))}
          {filters.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("skills", skill, "remove")}
              />
            </Badge>
          ))}
          {filters.remote && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Remote Only
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange("remote", false)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
