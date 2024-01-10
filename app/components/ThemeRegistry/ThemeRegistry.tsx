"use client";
import Loading from "@/app/loading";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { generateThemeOptions } from "./theme";
import { CircularProgress, Stack, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { selectApp, useSelector } from "@/lib/redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
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
  const matches = useMediaQuery("(max-width:920px)");

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
          {!matches ? (
            <>{children}</>
          ) : (
            <Stack
              spacing={4}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ minHeight: "100vh" }}
            >
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={1}
              >
                <AutoAwesomeIcon sx={{ fontSize: "25px", color: "black" }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Bob
                </Typography>
              </Stack>
              <Typography variant="body1">
                For best experience of Bob use Desktop Version
              </Typography>
            </Stack>
          )}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
}
