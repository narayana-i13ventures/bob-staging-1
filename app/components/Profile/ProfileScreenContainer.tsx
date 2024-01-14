'use client';
import { selectApp, useSelector } from '@/lib/redux';
import React from 'react'
import Profile from './Profile';
import Settings from './Settings';
import Teams from './Teams';
import Payments from './Payments';
import Subscriptions from './Subscriptions';

const ProfileScreenContainer = () => {
    const { activeProfileTab } = useSelector(selectApp);
    const profileScreen = () => {
        switch (activeProfileTab) {
            case 'profile':
                return (<Profile />)
            case 'settings':
                return (<Settings />)
            case 'teams':
                return (<Teams />)
            case 'payments':
                return (<Payments />)
            case 'subscriptions':
                return (<Subscriptions />)
            default:
                break;
        }
    };
    return (
        <div className='px-10 w-full grow'>
            {profileScreen()}
        </div>
    )
}

export default ProfileScreenContainer