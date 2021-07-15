import React from "react";
import { withRouter } from "react-router-dom";
import BottomNav from "./BottomNav";

const BottomNavHOC = withRouter(({ location }) => {
    return (
        <>
            {location.pathname === "/" || location.pathname === "/sessions" ? <BottomNav /> : ''}
        </>
    );
});

export default BottomNavHOC;
