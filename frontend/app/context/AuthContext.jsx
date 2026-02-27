"use client";

import { createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
