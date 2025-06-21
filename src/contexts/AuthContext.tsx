import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
  type: "jobseeker" | "employer" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    userType?: "jobseeker" | "employer" | "admin",
  ) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  userType: "jobseeker" | "employer" | "admin";
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users database - moved outside component to persist between renders
const initialMockUsers = [
  {
    id: "1",
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
    type: "jobseeker" as const,
    avatar: "/avatars/john.jpg",
  },
  {
    id: "2",
    email: "hr@techcorp.com",
    password: "password123",
    name: "Sarah Wilson",
    type: "employer" as const,
    company: "TechCorp Solutions",
  },
  {
    id: "3",
    email: "admin@joburio.com",
    password: "admin123",
    name: "Admin User",
    type: "admin" as const,
  },
];

// Get all users (initial + any created users from localStorage)
const getAllUsers = () => {
  const savedUsers = localStorage.getItem("joburio_all_users");
  const createdUsers = savedUsers ? JSON.parse(savedUsers) : [];
  return [...initialMockUsers, ...createdUsers];
};

// Save a new user to localStorage
const saveNewUser = (user: any) => {
  const savedUsers = localStorage.getItem("joburio_all_users");
  const createdUsers = savedUsers ? JSON.parse(savedUsers) : [];
  createdUsers.push(user);
  localStorage.setItem("joburio_all_users", JSON.stringify(createdUsers));
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("joburio_token");
    const userData = localStorage.getItem("joburio_user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
      } catch (error) {
        localStorage.removeItem("joburio_token");
        localStorage.removeItem("joburio_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    userType?: "jobseeker" | "employer",
  ) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - get all users including newly created ones
    const allUsers = getAllUsers();
    const mockUser = allUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!mockUser) {
      setLoading(false);
      throw new Error("Invalid email or password");
    }

    if (userType && mockUser.type !== userType) {
      setLoading(false);
      throw new Error(
        `This email is registered as a ${mockUser.type}, not ${userType}`,
      );
    }

    // Mock JWT token
    const token = `mock_jwt_token_${mockUser.id}_${Date.now()}`;

    const userData = {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      type: mockUser.type,
      avatar: mockUser.avatar,
    };

    localStorage.setItem("joburio_token", token);
    localStorage.setItem("joburio_user", JSON.stringify(userData));

    setUser(userData);
    setLoading(false);

    // Redirect based on user type
    if (mockUser.type === "employer" || mockUser.type === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/jobs");
    }
  };

  const signup = async (data: SignupData) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists in all users (initial + created)
    const allUsers = getAllUsers();
    const existingUser = allUsers.find((u) => u.email === data.email);
    if (existingUser) {
      setLoading(false);
      throw new Error("An account with this email already exists");
    }

    // Mock user creation
    const newUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      type: data.userType,
      avatar: undefined,
    };

    const newUserWithPassword = {
      ...newUser,
      password: data.password,
    };

    // Save to persistent storage
    saveNewUser(newUserWithPassword);

    // Mock JWT token
    const token = `mock_jwt_token_${newUser.id}_${Date.now()}`;

    localStorage.setItem("joburio_token", token);
    localStorage.setItem("joburio_user", JSON.stringify(newUser));

    setUser(newUser);
    setLoading(false);

    // Redirect based on user type
    if (data.userType === "employer" || data.userType === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/jobs");
    }
  };

  const logout = () => {
    localStorage.removeItem("joburio_token");
    localStorage.removeItem("joburio_user");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
