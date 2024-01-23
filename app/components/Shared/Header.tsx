"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationBtn from "./NotificationBtn/NotificationBtn";
import UserProfileBtn from "./UserProfileBtn/UserProfileBtn";
import { useParams, usePathname } from "next/navigation";
import { useLazyGetProjectByIdQuery } from "@/lib/redux/projectApi";
import { useSession } from "next-auth/react";
import { appSlice, useDispatch } from "@/lib/redux";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { data }: any = useSession();
  const { projectId } = useParams();
  const [
    getProjectById,
    {
      data: project_data,
      isLoading: project_data_loading,
      isError: project_data_error,
      isFetching: project_data_fetching,
    },
  ] = useLazyGetProjectByIdQuery();

  useEffect(() => {
    if (projectId) {
      getProjectById({
        projectId: projectId,
        userId: data?.user?.user_id,
      });
    }
  }, [projectId, data?.user?.user_id]);

  const shareThinkbeyond = () => {
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: { projectId },
        type: "thinkbeyond",
      })
    );
  };
  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          backgroundColor: "#f6f5f4",
        }}
      >
        <Link href={"/"}>
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
        </Link>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={4}
          component={"div"}
        >
          {pathName?.includes("Thinkbeyond") && (
            <>
              {!project_data_loading && !project_data_error && (
                <>
                  {project_data?.project?.is_owner && (
                    <Button
                      onClick={shareThinkbeyond}
                      variant="contained"
                      size="small"
                    >
                      Share
                    </Button>
                  )}
                </>
              )}
              {project_data_loading && !project_data_error && (
                <CircularProgress size={15}/>
              )}
            </>
          )}
          {/* <NotificationBtn /> */}
          <UserProfileBtn />
        </Stack>
      </Container>
    </>
  );
};

export default Header;
