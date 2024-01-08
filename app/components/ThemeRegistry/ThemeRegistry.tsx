"use client";
import * as React from "react";
import { generateThemeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { selectApp, useSelector } from "@/lib/redux";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useSelector(selectApp);
  const theme = createTheme(
    generateThemeOptions({
      mode: mode,
    })
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
