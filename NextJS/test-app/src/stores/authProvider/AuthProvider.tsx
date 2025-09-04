"use client"

import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { AuthContextType, UserTypes } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserTypes | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.user) {
      try {
        const parsedUser: UserTypes = JSON.parse(cookies.user);
        setUser(parsedUser)
      } catch (err) {
        console.error("Failed to parse cookie", err)
      }
    }

  }, [])

  const login = (newUser: UserTypes) => {
    setUser(newUser);
    setCookie(null, 'user', JSON.stringify(newUser), { path: "/" });
    router.push("/")
  }
  const logout = () => {
    setUser(null);
    destroyCookie(null, 'user', { path: '/' });
    router.push('/login');
  }
  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}