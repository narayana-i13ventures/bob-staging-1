'use client';
import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { appSlice, selectApp, useDispatch, useSelector } from '@/lib/redux';

const GlobalSnackbar = () => {
    const dispatch = useDispatch();
    const { globalSnackBar }:any = useSelector(selectApp);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            dispatch(appSlice.actions.setGlobalSnackBar({ open: false, content: '' }));
            return;
        }
        dispatch(appSlice.actions.setGlobalSnackBar({ open: false, content: '' }));
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
            <Snackbar
                open={globalSnackBar?.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={globalSnackBar?.content}
                action={globalSnackBar?.clossable ? action : <></>}
            />
        </>
    )
}

export default GlobalSnackbar