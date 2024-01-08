'use client';
import Bob from '@/app/components/Bob/Bob'
import Header from '@/app/components/Shared/Header'
import ShareModal from '@/app/components/Shared/ShareModal';
import ThinkbeyondCanvas from '@/app/components/ThinkBeyond/ThinkbeyondCanvas'
import ThinkbeyondMindmap from '@/app/components/ThinkBeyond/ThinkbeyondMindmap'
import ThinkbeyondModal from '@/app/components/ThinkBeyond/ThinkbeyondModal'
import ThinkBeyondSettings from '@/app/components/ThinkBeyond/ThinkbeyondSettings';
import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'

const Thinkbeyond = () => {
    const theme = useTheme();
    return (
        <>
            <Stack
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                direction={'column'}
                sx={{
                    minHeight: "100vh",
                    maxHeight: "100vh",
                    backgroundColor: `${theme?.palette?.primary?.main}20`,
                    position: 'relative'
                }}
            >
                <Header />
                <ThinkbeyondCanvas />
                {/* <ThinkbeyondMindmap /> */}
                <ThinkbeyondModal />
                <Bob />
                <ThinkBeyondSettings />
                <ShareModal />
            </Stack>
        </>
    )
}

export default Thinkbeyond