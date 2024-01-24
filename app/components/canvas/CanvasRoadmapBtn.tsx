"use client";
import React, { useEffect, useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
const CanvasRoadmapBtn = (props: any) => {
  const { canvasName, canvas, loading } = props;
  const pathName = usePathname();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const CanvasSettingsRef = useRef(null);
  const { projectId, futureId } = useParams();
  const { canvasRoadmap }: any = useSelector(selectApp);
  const [expanded, setExpanded] = React.useState<any>({
    future1: false,
    future2: false,
    future3: false,
  });

  const openCanvasSettings = () => {
    dispatch(
      appSlice.actions.toggleCanvasRoadmap(Boolean(CanvasSettingsRef?.current))
    );
  };
  useEffect(() => {
    if (futureId === "Future1") {
      setExpanded({ future1: true, future2: false, future3: false });
    }
    if (futureId === "Future2") {
      setExpanded({ future1: false, future2: true, future3: false });
    }
    if (futureId === "Future3") {
      setExpanded({ future1: false, future2: false, future3: true });
    }
  }, [futureId]);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (panel === "future1") {
        setExpanded({ future1: isExpanded, future2: false, future3: false });
      }
      if (panel === "future2") {
        setExpanded({ future1: false, future2: isExpanded, future3: false });
      }
      if (panel === "future3") {
        setExpanded({ future1: false, future2: false, future3: isExpanded });
      }
    };
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        ref={CanvasSettingsRef}
        disableFocusRipple
        onClick={openCanvasSettings}
        sx={{
          mr: 2,
        }}
      >
        <AccountTreeOutlinedIcon fontSize="small" />
      </IconButton>
      <Popover
        disablePortal
        TransitionComponent={GrowTransition}
        anchorEl={CanvasSettingsRef?.current}
        open={canvasRoadmap}
        onClose={() => dispatch(appSlice.actions.toggleCanvasRoadmap(false))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            mt: 1,
            p: 1,
            zIndex: 100,
            width: "auto",
            borderRadius: 2,
            overflowY: "hidden",
            backgroundColor: "#fff",
          },
        }}
      >
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
          }}
          expanded={true}
        >
          <AccordionSummary
            sx={{
              width: "auto",
              minHeight: "auto",
              flexDirection: "row-reverse",
              "& .MuiAccordionSummary-content": {
                my: "5px",
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                transform: "rotate(-90deg)",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(0deg)",
              },
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant="body1"
              sx={{ fontSize: "14px", ml: 1, py: 0.5 }}
            >
              Thinkbeyond
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                ml: 3,
                border: "0px",
                backgroundColor: "#ffffff",
              }}
              expanded={expanded?.future1 === true}
              onChange={handleChange("future1")}
            >
              <AccordionSummary
                sx={{
                  width: "auto",
                  minHeight: "auto",
                  flexDirection: "row-reverse",
                  "& .MuiAccordionSummary-content": {
                    my: "5px",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "rotate(-90deg)",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(0deg)",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "14px", ml: 1, py: 0.5 }}
                >
                  Future 1
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ ml: 3, p: 0, minWidth: "auto", width: "auto" }}
              >
                <MenuList sx={{ p: 0, minWidth: "auto", width: "auto" }}>
                  {canvas?.future_1
                    ?.filter(
                      (canvas: any) =>
                        canvas.canvas_type === 2 || canvas.canvas_type === 3
                    )
                    .map((CanvasCard: any, index: any) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            router?.push(
                              `/${projectId}/Future1/Microframeworks/${CanvasCard?.route}`
                            );
                            dispatch(
                              appSlice.actions.toggleCanvasRoadmap(false)
                            );
                          }}
                          sx={{
                            mb: 1,
                            borderRadius: 2,
                          }}
                          selected={
                            pathName.includes(CanvasCard?.route) &&
                            futureId === "Future1"
                          }
                          key={index}
                          disabled={CanvasCard?.locked}
                        >
                          <ListItemText
                            sx={{
                              "& .MuiTypography-root": {
                                ml: 1,
                                py: 0.5,
                                fontSize: "14px",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              },
                            }}
                          >
                            {CanvasCard?.locked && (
                              <LockOutlinedIcon
                                fontSize="small"
                                sx={{ mr: 2 }}
                              />
                            )}
                            {CanvasCard?.name}
                          </ListItemText>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                ml: 3,
                border: "0px",
                backgroundColor: "#ffffff",
              }}
              expanded={expanded?.future2 === true}
              onChange={handleChange("future2")}
            >
              <AccordionSummary
                sx={{
                  width: "auto",
                  minHeight: "auto",
                  flexDirection: "row-reverse",
                  "& .MuiAccordionSummary-content": {
                    my: "5px",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "rotate(-90deg)",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(0deg)",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "14px", ml: 1, py: 0.5 }}
                >
                  Future 2
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ ml: 3, p: 0, minWidth: "auto", width: "auto" }}
              >
                <MenuList sx={{ p: 0, minWidth: "auto", width: "auto" }}>
                  {canvas?.future_2
                    ?.filter(
                      (canvas: any) =>
                        canvas.canvas_type === 2 || canvas.canvas_type === 3
                    )
                    .map((CanvasCard: any, index: any) => {
                      return (
                        <MenuItem
                          key={index}
                          disabled={CanvasCard?.locked}
                          onClick={() => {
                            router?.push(
                              `/${projectId}/Future2/Microframeworks/${CanvasCard?.route}`
                            );
                            dispatch(
                              appSlice.actions.toggleCanvasRoadmap(false)
                            );
                          }}
                          selected={
                            pathName.includes(CanvasCard?.route) &&
                            futureId === "Future2"
                          }
                        >
                          <ListItemText
                            sx={{
                              "& .MuiTypography-root": {
                                ml: 1,
                                py: 0.5,
                                fontSize: "14px",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              },
                            }}
                          >
                            {CanvasCard?.locked && (
                              <LockOutlinedIcon
                                fontSize="small"
                                sx={{ mr: 2 }}
                              />
                            )}
                            {CanvasCard?.name}
                          </ListItemText>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                ml: 3,
                border: "0px",
                backgroundColor: "#ffffff",
              }}
              expanded={expanded?.future3 === true}
              onChange={handleChange("future3")}
            >
              <AccordionSummary
                sx={{
                  width: "auto",
                  minHeight: "auto",
                  flexDirection: "row-reverse",
                  "& .MuiAccordionSummary-content": {
                    my: "5px",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "rotate(-90deg)",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(0deg)",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "14px", ml: 1, py: 0.5 }}
                >
                  Future 3
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ ml: 3, p: 0, minWidth: "auto", width: "auto" }}
              >
                <MenuList sx={{ p: 0, minWidth: "auto", width: "auto" }}>
                  {canvas?.future_3
                    ?.filter(
                      (canvas: any) =>
                        canvas.canvas_type === 2 || canvas.canvas_type === 3
                    )
                    .map((CanvasCard: any, index: any) => {
                      return (
                        <MenuItem
                          key={index}
                          disabled={CanvasCard?.locked}
                          onClick={() => {
                            router?.push(
                              `/${projectId}/Future3/Microframeworks/${CanvasCard?.route}`
                            );
                            dispatch(
                              appSlice.actions.toggleCanvasRoadmap(false)
                            );
                          }}
                          selected={
                            pathName.includes(CanvasCard?.route) &&
                            futureId === "Future3"
                          }
                        >
                          <ListItemText
                            sx={{
                              "& .MuiTypography-root": {
                                ml: 1,
                                py: 0.5,
                                fontSize: "14px",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              },
                            }}
                          >
                            {CanvasCard?.locked && (
                              <LockOutlinedIcon
                                fontSize="small"
                                sx={{ mr: 2 }}
                              />
                            )}
                            {CanvasCard?.name}
                          </ListItemText>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Popover>
    </>
  );
};

export default CanvasRoadmapBtn;
