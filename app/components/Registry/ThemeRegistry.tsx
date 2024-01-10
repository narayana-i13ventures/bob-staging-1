"use client";
import React, { useEffect } from "react";
import { generateThemeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { selectApp, useSelector } from "@/lib/redux";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Loading from "@/app/loading";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session: any = useSession();
  const { mode } = useSelector(selectApp);

  const theme = createTheme(
    generateThemeOptions({
      mode: mode,
    })
  );

  // useEffect(() => {
  //   if (session?.status !== 'loading' && session?.status === 'authenticated' && session?.status !== 'unauthenticated') {
  //     if (session?.data?.is_new) {
  //       router.push('/OnBoarding');
  //     }
  //   }
  // }, [session])
  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {session?.status === "loading" && (
            <>
              <Loading />
            </>
          )}
          {<>{children}</>}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
}
