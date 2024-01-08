import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { appSlice, useDispatch } from "@/lib/redux";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import SettingsOverscanOutlinedIcon from '@mui/icons-material/SettingsOverscanOutlined';
const CanvasCard = (props: any) => {
    const { card_name, selected = false }: any = props?.card;
    const dispatch = useDispatch();
    const openCanvasModal = () => {
        dispatch(appSlice.actions.toggleCanvasModalOpen(true));
        dispatch(appSlice.actions.toggleCanvasTile(card_name))
    };
    return (
        <>
            <Stack
                component={"div"}
                // onClick={openCanvasModal}
                direction={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                sx={{
                    p: 2,
                    width: "100%",
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: props?.color,
                    overflow: "hidden",
                    boxShadow: selected ? 3 : 0,
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{
                        width: "100%",
                        minHeight: '30px'
                    }}
                >
                    <Typography variant="body1">{card_name}</Typography>
                    {<IconButton size="small" onClick={openCanvasModal}>
                        <SettingsOverscanOutlinedIcon fontSize="small" />
                    </IconButton>}
                </Stack>
                <Divider sx={{ width: "100%", my: 1 }} />
                <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    sx={{
                        flexGrow: 1,
                        overflowY: "auto",
                        // maxHeight: "calc(100% - 40px)",
                    }}
                >
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
                        in dolor assumenda tempore odio odit quos adipisci consequuntur id!
                        Necessitatibus, iste molestias aspernatur ea assumenda dolor iusto
                        cum praesentium molestiae?
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default CanvasCard;
