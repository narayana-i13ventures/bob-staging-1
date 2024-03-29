import React, { JSXElementConstructor } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";


const SlideTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default SlideTransition