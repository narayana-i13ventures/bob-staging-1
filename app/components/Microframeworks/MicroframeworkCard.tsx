import React from "react";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { appSlice, useDispatch } from "@/lib/redux";
import { useParams, useRouter } from "next/navigation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const MicroframeworkCard = (props: any) => {
  const { route, name, locked } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { projectId, futureId } = useParams();
  const openCanvasShare = (e: any) => {
    e?.stopPropagation();
    dispatch(
      appSlice.actions.toggleShareModal({
        open: true,
        data: {},
        type: "microframeworks",
      })
    );
  };
  const goToCanvas = () => {
    switch (name) {
      case "Business Model Canvas":
        // router?.push(`/${projectId}/${futureId}/Microframeworks?canvas=BMC`);
        router?.push(`/${projectId}/${futureId}/Microframeworks/BMC`);
        break;
      case "Value Proposition Canvas":
        router?.push(`/${projectId}/${futureId}/Microframeworks/CVP`);
        // router?.push(`/${projectId}/${futureId}/Microframeworks?canvas=CVP`);
        break;

      default:
        break;
    }
  };

  const HtmlTooltip: any = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      p: 2,
      maxWidth: 400,
      color: "black",
      borderRadius: "10px",
      backgroundColor: "#fff",
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }));
  return (
    <Stack
      component={"div"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        cursor: "pointer",
        border: "1px solid #000",
        maxWidth: "270px",
        height: '250px',
        overflow: 'hidden'
      }}
    >
      <Paper
        onClick={goToCanvas}
        elevation={0}
        sx={{
          flexGrow: 1,
          opacity: locked ? 0.38 : 1,
          width: '100%',
          backgroundSize: "40%",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('/images/bmc.png')`,
        }}
      ></Paper>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ py: 2, px: 3, width: "100%" }}
      >
        {/* <Tooltip title={name} placement="top" arrow> */}
        <Stack sx={{ opacity: locked ? 0.38 : 1 }} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          {locked && <LockOutlinedIcon />}
          <Typography
            sx={{
              px: 2,
              fontSize: "15px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="body1"
          >
            {name}
          </Typography>
        </Stack>
        {/* </Tooltip> */}
        {/* <HtmlTooltip
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
        </HtmlTooltip> */}
      </Stack>
    </Stack>
  );
};

export default MicroframeworkCard;
