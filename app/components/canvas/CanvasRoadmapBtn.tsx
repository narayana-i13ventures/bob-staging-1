"use client";
import React, { useRef } from "react";
import GrowTransition from "../Utils/Grow";
import { useParams, useRouter } from "next/navigation";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconButton,
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
  const { canvasName } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const CanvasSettingsRef = useRef(null);
  const { projectId, futureId } = useParams();
  const { canvasRoadmap } = useSelector(selectApp);

  const openCanvasSettings = () => {
    dispatch(
      appSlice.actions.toggleCanvasRoadmap(Boolean(CanvasSettingsRef?.current))
    );
  };

  const NavigateRoadmap = (event: React.SyntheticEvent, nodeIds: any) => {
    if (nodeIds === "4") {
      router.push("BMC");
      dispatch(appSlice.actions.toggleCanvasRoadmap(false));
    } else if (nodeIds === "1") {
      router.push(`/${projectId}/Thinkbeyond`);
      dispatch(appSlice.actions.toggleCanvasRoadmap(false));
    } else if (nodeIds === "3") {
      router.push(`/${projectId}/${futureId}/Microframeworks`);
      dispatch(appSlice.actions.toggleCanvasRoadmap(false));
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
            width: "320px",
            borderRadius: 2,
            overflowY: "hidden",
            backgroundColor: "#fff",
          },
        }}
      >
        <TreeView
          expanded={["1", "2", "3"]}
          selected={canvasName === "BMC" ? "4" : ""}
          onNodeSelect={NavigateRoadmap}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem
            sx={{
              my: 0.5,
              "& .MuiTreeItem-label": {
                fontSize: "13px !important",
              },
              "& .MuiTreeItem-content": {
                py: 1,
                borderRadius: 2,
              },
              "& .Mui-selected": {
                backgroundColor: `#f6f5f4`,
              },
            }}
            nodeId="1"
            label="Think Beyond"
          >
            <TreeItem
              sx={{
                my: 0.5,
                "& .MuiTreeItem-label": {
                  fontSize: "13px !important",
                },
                "& .MuiTreeItem-content": {
                  py: 1,
                  borderRadius: 2,
                },
                "& .Mui-selected": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
              nodeId="2"
              label="Future 1"
            >
              <TreeItem
                sx={{
                  my: 0.5,
                  "& .MuiTreeItem-label": {
                    fontSize: "13px",
                  },
                  "& .MuiTreeItem-content": {
                    py: 1,
                    borderRadius: 2,
                  },
                  "& .Mui-selected": {
                    backgroundColor: `#f6f5f4`,
                  },
                }}
                nodeId="3"
                label="Micro Frameworks"
              >
                <TreeItem
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "13px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="4"
                  label="Business Model Canvas"
                />
                <TreeItem
                  disabled
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="5"
                  label={
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <LockOutlinedIcon fontSize="small" />
                      <Typography sx={{ fontSize: "13px", ml: 2 }}>
                        Value Proposition Canvas
                      </Typography>
                    </Stack>
                  }
                />
              </TreeItem>
            </TreeItem>
            <TreeItem
              disabled
              sx={{
                my: 0.5,
                "& .MuiTreeItem-label": {
                  fontSize: "13px !important",
                },
                "& .MuiTreeItem-content": {
                  py: 1,
                  borderRadius: 2,
                },
                "& .Mui-selected": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
              nodeId="8"
              label={
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <LockOutlinedIcon fontSize="small" />
                  <Typography sx={{ fontSize: "13px", ml: 2 }}>
                    Future 2
                  </Typography>
                </Stack>
              }
            >
              <TreeItem
                sx={{
                  my: 0.5,
                  "& .MuiTreeItem-label": {
                    fontSize: "13px",
                  },
                  "& .MuiTreeItem-content": {
                    py: 1,
                    borderRadius: 2,
                  },
                  "& .Mui-selected": {
                    backgroundColor: `#f6f5f4`,
                  },
                }}
                nodeId="9"
                label="Micro Frameworks"
              >
                <TreeItem
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "13px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="10"
                  label="Business Model Canvas"
                />
                <TreeItem
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="11"
                  label="Value Proposition Canvas"
                />
                <TreeItem
                  disabled
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="12"
                  label={
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <LockOutlinedIcon fontSize="small" />
                      <Typography sx={{ fontSize: "13px", ml: 2 }}>
                        Empathy Canvas
                      </Typography>
                    </Stack>
                  }
                />
                <TreeItem
                  disabled
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="13"
                  label={
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <LockOutlinedIcon fontSize="small" />
                      <Typography sx={{ fontSize: "13px", ml: 2 }}>
                        Persona Canvas
                      </Typography>
                    </Stack>
                  }
                />
              </TreeItem>
            </TreeItem>
            <TreeItem
              disabled
              sx={{
                my: 0.5,
                "& .MuiTreeItem-label": {
                  fontSize: "13px !important",
                },
                "& .MuiTreeItem-content": {
                  py: 1,
                  borderRadius: 2,
                },
                "& .Mui-selected": {
                  backgroundColor: `#f6f5f4`,
                },
              }}
              nodeId="14"
              label={
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <LockOutlinedIcon fontSize="small" />
                  <Typography sx={{ fontSize: "13px", ml: 2 }}>
                    Future 3
                  </Typography>
                </Stack>
              }
            >
              <TreeItem
                sx={{
                  my: 0.5,
                  "& .MuiTreeItem-label": {
                    fontSize: "13px",
                  },
                  "& .MuiTreeItem-content": {
                    py: 1,
                    borderRadius: 2,
                  },
                  "& .Mui-selected": {
                    backgroundColor: `#f6f5f4`,
                  },
                }}
                nodeId="15"
                label="Micro Frameworks"
              >
                <TreeItem
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "13px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="16"
                  label="Business Model Canvas"
                />
                <TreeItem
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="17"
                  label="Value Proposition Canvas"
                />
                <TreeItem
                  disabled
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="18"
                  label={
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <LockOutlinedIcon fontSize="small" />
                      <Typography sx={{ fontSize: "13px", ml: 2 }}>
                        Empathy Canvas
                      </Typography>
                    </Stack>
                  }
                />
                <TreeItem
                  disabled
                  sx={{
                    my: 0.5,
                    "& .MuiTreeItem-label": {
                      fontSize: "14px",
                    },
                    "& .MuiTreeItem-content": {
                      py: 1,
                      borderRadius: 2,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `#f6f5f4`,
                    },
                  }}
                  nodeId="19"
                  label={
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <LockOutlinedIcon fontSize="small" />
                      <Typography sx={{ fontSize: "13px", ml: 2 }}>
                        Persona Canvas
                      </Typography>
                    </Stack>
                  }
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
      </Popover>
    </>
  );
};

export default CanvasRoadmapBtn;
