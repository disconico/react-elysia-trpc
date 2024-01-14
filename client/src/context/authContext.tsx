import React, { createContext, useState, useEffect } from "react";

const SERVER_URI =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://server-elysia-api.fly.dev";

type User = {
  userId: string;
  isAdmin: boolean;
  username: string;
};

type Credentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  signout: () => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  signup: (credentials: Credentials) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
  signout: async () => {},
  login: async () => {},
  signup: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      console.log(process.env.NODE_ENV === "development", process.env.NODE_ENV === "production");
      try {
        setIsLoading(true);
        const response = await fetch(`${SERVER_URI}/auth/validate`, {
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          console.log("result from validateSession", result);

          // Check if the user is non-null and only then set it
          if (result.user) {
            setUser(result.user);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Session validation failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const signout = async () => {
    try {
      const response = await fetch(`${SERVER_URI}/auth/signout`, {
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = "Signout failed";
        try {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing the server response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      setUser(null);
    } catch (error) {
      console.error("Error during signout:", error);
      throw error;
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const response = await fetch(`${SERVER_URI}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = "Authentication failed";
        try {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing the server response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (!result.user) {
        throw new Error("Authentication failed: No user data returned");
      }
      setUser(result.user);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const signup = async (credentials: Credentials) => {
    try {
      const response = await fetch(`${SERVER_URI}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = "Signup failed";
        try {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing the server response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      if (!result.user) {
        throw new Error("Authentication failed: No user data returned");
      }
      setUser(result.user);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, signout, login, signup }}>{children}</AuthContext.Provider>
  );
};
