"use client";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import ThinkbeyondCard from "./ThinkbeyondCard";
import ThinkbeyondModal from "./ThinkbeyondModal";
import { useGetThinkBeyondQuery } from "@/lib/redux/Api";
import { useParams } from "next/navigation";

const ThinkbeyondCanvas = () => {
    const params = useParams();

    const {
        data: ThinkbeyondCards,
        isLoading,
        isError,
        isSuccess,
        refetch: refetchThinkbeyond
    } = useGetThinkBeyondQuery({});
    const retry = () => {
        refetchThinkbeyond()
    }

    return (
        <>
            {!isLoading && !isError && isSuccess && (
                <Stack
                    component={"div"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        p: 2,
                        flexGrow: 1,
                        width: "100%",
                        display: "flex",
                        overflow: "hidden",
                        backgroundColor: "white",
                        borderRadius: 3,
                    }}
                >
                    <Box
                        sx={{
                            p: 1,
                            gap: 1,
                            flexGrow: 1,
                            width: "70%",
                            height: "100%",
                            display: "grid",
                            overflow: "hidden",
                            gridTemplateColumns: "repeat(12, 1fr)",
                            gridTemplateRows: "repeat(6, 1fr)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gridColumn: "span 12",
                                gridRow: "span 1",
                            }}
                        >
                            <ThinkbeyondCard
                                width={"50%"}
                                card={ThinkbeyondCards?.find(
                                    (card: any) => card?.cardNumber === 0
                                )}
                            />
                        </Box>
                        <Box sx={{ gridColumn: "span 12", gridRow: "span 4" }}>
                            <Box
                                sx={{
                                    gap: 1,
                                    width: "100%",
                                    height: "100%",
                                    display: "grid",
                                    flexGrow: 1,
                                    gridTemplateColumns: "repeat(12, 1fr)",
                                    gridTemplateRows: "repeat(6, 1fr)",
                                }}
                            >
                                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                                    <Box
                                        sx={{
                                            gap: 1,
                                            width: "100%",
                                            height: "100%",
                                            display: "grid",
                                            flexGrow: 1,
                                            gridTemplateColumns: "repeat(12, 1fr)",
                                            gridTemplateRows: "repeat(6, 1fr)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future 1"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 2
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future 1 OKR"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 3
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Microframeworks"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 4
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                                    <Box
                                        sx={{
                                            gap: 1,
                                            width: "100%",
                                            height: "100%",
                                            display: "grid",
                                            flexGrow: 1,
                                            gridTemplateColumns: "repeat(12, 1fr)",
                                            gridTemplateRows: "repeat(6, 1fr)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future 2"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 5
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future 2 OKR"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 6
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Microframeworks"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 7
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ gridColumn: "span 4", gridRow: "span 6" }}>
                                    <Box
                                        sx={{
                                            gap: 1,
                                            width: "100%",
                                            height: "100%",
                                            display: "grid",
                                            flexGrow: 1,
                                            gridTemplateColumns: "repeat(12, 1fr)",
                                            gridTemplateRows: "repeat(6, 1fr)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future 3"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 8
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Future3 OkR"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 9
                                                )}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gridColumn: "span 12",
                                                gridRow: "span 2",
                                            }}
                                        >
                                            <ThinkbeyondCard
                                                width={"100%"}
                                                cardName={"Microframeworks"}
                                                card={ThinkbeyondCards?.find(
                                                    (card: any) => card?.cardNumber === 10
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gridColumn: "span 12",
                                gridRow: "span 1",
                            }}
                        >
                            <ThinkbeyondCard
                                width={"50%"}
                                cardName={"what is the moonshot?"}
                                card={ThinkbeyondCards?.find(
                                    (card: any) => card?.cardNumber === 1
                                )}
                            />
                        </Box>
                    </Box>
                    <ThinkbeyondModal />
                </Stack>
            )}
            {isLoading && !isError && !isSuccess && (
                <Stack
                    component={"div"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <CircularProgress />
                </Stack>
            )}
            {!isLoading && isError && !isSuccess && (
                <Stack
                    component={"div"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: "14px", mb: 4 }}>
                        Something went wrong..! Try again
                    </Typography>
                    <Button variant="contained" onClick={retry}>Retry</Button>
                </Stack>
            )}
        </>
    );
};

export default ThinkbeyondCanvas;
