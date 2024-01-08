import React, { JSXElementConstructor } from "react";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";


const GrowTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow style={{ transformOrigin: "0 0 1" }} ref={ref} {...props} />;
});


export default GrowTransition