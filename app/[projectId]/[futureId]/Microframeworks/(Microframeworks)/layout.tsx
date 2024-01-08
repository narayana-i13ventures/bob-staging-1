'use client';
import { useParams } from "next/navigation";
import React from "react";

const MicroframeworksLayout = (props: any) => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            MicroframeworksLayout
            {props?.children}
        </div>
    );
};

export default MicroframeworksLayout;
