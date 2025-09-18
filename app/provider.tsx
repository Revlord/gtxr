"use client"


import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { WebSpatialProvider } from "@webspatial/react-sdk";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <WebSpatialProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </WebSpatialProvider>
  );
}
