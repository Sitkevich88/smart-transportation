import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";
import React, {useEffect, useState} from "react";
import adminOrders from "../admin/store/AdminOrders";
import BigLogo from "../BigLogo";

const AdminRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            if (isLoading)
                setLoadingText('Сервер не отвечает :(');
        }, 3000);

        adminOrders
            .update()
            .then(() => {
                setLoadingText(null);
                setIsLoading(false);
            });

    },[])

    const loadingPage = <>
        <BigLogo/>
        <div style={{textAlign: "center", fontSize: "50px", marginTop: "50px", fontFamily: "Inter"}}>
            {loadingText ?? 'Загрузка...'}
        </div>
    </>;

    let currentPage = isLoading ? loadingPage : <Outlet/>;


    return authenticationService.seemToBeAdmin()
        ? currentPage
        : <Navigate to="/" />;
}

export default AdminRoute;