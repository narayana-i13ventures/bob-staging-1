import { selectApp, useSelector } from '@/lib/redux'
import React from 'react'

const MicroframeworksLayout = (props: any) => {
    return (
        <>
            {props?.children}
        </>
    )
}

export default MicroframeworksLayout