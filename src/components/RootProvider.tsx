// app/layout.tsx or wherever you use the SessionProvider

"use client"; // This directive makes the entire file a Client Component

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function RootLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
