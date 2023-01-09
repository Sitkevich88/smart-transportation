import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";
import React, {useEffect, useState} from "react";
import adminOrders from "../admin/store/AdminOrders";
import BigLogo from "../BigLogo";

const AdminRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            adminOrders.update()
        ])
            .then(() => {
                setIsLoading(false);
            });

    },[])

    const loadingPage = <>
        <BigLogo/>
        <div style={{textAlign: "center", fontSize: "50px", marginTop: "50px", fontFamily: "Inter"}}>
            Загрузка...
        </div>
    </>;

    let currentPage = isLoading ? loadingPage : <Outlet/>;


    return authenticationService.seemToBeAdmin()
        ? currentPage
        : <Navigate to="/" />;
}

export default AdminRoute;