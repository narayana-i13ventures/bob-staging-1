/* Components */
"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <Box
        component={"div"}
        sx={{
          minHeight: "100vh",
          maxHeight: "100vh",
          minWidth: "100vw",
          maxWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={"Dashboard"}>
          <Button disableElevation variant="contained" color="secondary">
            Dashboard
          </Button>
        </Link>
      </Box>
    </>
  );
}
