import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { API_BASE, fetchJSON } from "../utils/apiRequests";

type AuthContextValue = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createAccount: (email: string, password: string) => Promise<void>;
  pageReady: boolean;
  loggedIn: boolean;
  authError: string;
  setAuthErr: (errorString: string) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pageReady, setPageReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authError, setAuthError] = useState("")
  const API_BASE_ACCOUNT = `${API_BASE}/account`;

  const setAuthErr = (errorString: string) => setAuthError(errorString);

  const checkLoggedIn = async () => {
    try {
        const data = await fetchJSON<{ loggedIn: boolean }>(`${API_BASE_ACCOUNT}/checkLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        setLoggedIn(!!data.loggedIn);
    }
    catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      console.error(errorMessage);
      setAuthError(errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await checkLoggedIn();
      } catch {
        setLoggedIn(false);
      } finally {
        setPageReady(true);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
        await fetchJSON(`${API_BASE_ACCOUNT}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        setLoggedIn(true);
        setPageReady(true);
    }
    catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      console.error(errorMessage);
      setAuthError(errorMessage);
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
        await fetchJSON(`${API_BASE_ACCOUNT}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        setLoggedIn(true);
        setPageReady(true);
    }
    catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      console.error(errorMessage);
      setAuthError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await fetchJSON(`${API_BASE_ACCOUNT}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setLoggedIn(false);
      setPageReady(true);
    }
    catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      console.error(errorMessage);
      setAuthError(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, createAccount, pageReady, loggedIn, authError, setAuthErr }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const v = useContext(AuthContext);
  if (!v) throw new Error("No AuthContext.");
  return v;
}