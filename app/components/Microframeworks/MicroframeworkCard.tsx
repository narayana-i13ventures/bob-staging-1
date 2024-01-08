import React from "react";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import {
  Avatar,
  AvatarGroup,
  Box,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { appSlice, useDispatch } from "@/lib/redux";
import { useParams, useRouter } from "next/navigation";

const MicroframeworkCard = (props: any) => {
  const { route, name } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { projectId, futureId } = useParams();
  const openCanvasShare = (e: any) => {
    e?.stopPropagation();
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: { name: name },
        type: "microframeworks",
      })
    );
  };
  const goToCanvas = () => {
    switch (name) {
      case "Business Model Canvas":
        router?.push(`/${projectId}/${futureId}/Microframeworks?canvas=BMC`);
        break;
      case "Value Proposition Canvas":
        router?.push(`/${projectId}/${futureId}/Microframeworks?canvas=CVP`);
        break;

      default:
        break;
    }
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      p: 2,
      maxWidth: 400,
      borderRadius: "10px",
      color: "black",
      backgroundColor: "#f4f4f4",
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }));
  return (
    <Stack
      onClick={goToCanvas}
      component={"div"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        p: 2,
        boxShadow: 1,
        borderRadius: 3,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "250px",
          height: "200px",
          borderRadius: 3,
          backgroundColor: `${theme?.palette?.primary?.main}20`,
        }}
      ></Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ pt: 2, px: 1, width: "100%" }}
      >
        <Typography sx={{ fontSize: "14px" }} variant="body1">
          {name}
        </Typography>
        <HtmlTooltip
          arrow
          title={
            <Stack
              direction={"column"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              sx={{ p: 1, width: "100%" }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Project Name
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : Uber for Helicopter
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Created On
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : 27 December, 2023
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Modified On
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : 27 December, 2023
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Owner
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : Narayana Lvsaln
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Team
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : I13 Ventures
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Future
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : 1
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Canvas{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  : {name}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                sx={{ py: 1, width: "100%" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", width: "100px" }}
                >
                  Shared With
                </Typography>
                <AvatarGroup
                  onClick={(e: any) => openCanvasShare(e)}
                  sx={{
                    cursor: "pointer",
                    "& .MuiAvatar-root": {
                      width: 20,
                      height: 20,
                      fontSize: "8px",
                    },
                  }}
                  total={24}
                >
                  <Avatar sx={{ backgroundColor: "black" }}>N</Avatar>
                  <Avatar sx={{ backgroundColor: "orange" }}>N</Avatar>
                  <Avatar sx={{ backgroundColor: "blue" }}>N</Avatar>
                  <Avatar sx={{ backgroundColor: "green" }}>N</Avatar>
                </AvatarGroup>
              </Stack>
            </Stack>
          }
        >
          <InfoOutlinedIcon fontSize="small" />
        </HtmlTooltip>
      </Stack>
    </Stack>
  );
};

export default MicroframeworkCard;
