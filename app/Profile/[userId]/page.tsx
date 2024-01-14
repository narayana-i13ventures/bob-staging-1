'use client';
import ProfileMenu from '@/app/components/Profile/ProfileMenu';
import ProfileScreenContainer from '@/app/components/Profile/ProfileScreenContainer';
import Header from '@/app/components/Shared/Header';
import { Container } from '@mui/material'
import React from 'react'

const Profile = () => {
    return (
        <>
            <div className="flex flex-col justify-start items-center w-full relative min-h-screen max-h-screen">
                <Header />
                <Container
                    className="!flex justify-between items-center !px-6"
                    maxWidth={"lg"}
                    disableGutters
                >
                    <div className='relative flex grow w-full justify-start items-start p-4'>
                        <ProfileMenu />
                        <ProfileScreenContainer />
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Profile