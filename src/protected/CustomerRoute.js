import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";
import React, {useEffect, useState} from "react";
import orders from "../store/Orders";
import BigLogo from "../BigLogo";

const CustomerRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState(null);

    useEffect(() => {

        setTimeout(() => {
            if (isLoading)
                setLoadingText('Сервер не отвечает :(');
        }, 3000);

        Promise.all([
            orders.update(),
            orders.updateCargoTypes()
        ]).then(() => {
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

    return authenticationService.seemToBeCustomer()
        ? currentPage
        : <Navigate to="/" />;
}

export default CustomerRoute;