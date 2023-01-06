import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";
import React from "react";

const AdminRoute = () => {
    return authenticationService.seemToBeAdmin()
        ? <Outlet/>
        : <Navigate to="/" />;
}

export default AdminRoute;