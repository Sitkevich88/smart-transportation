import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";
import React, {useEffect, useState} from "react";
import orders from "../store/Orders";
import BigLogo from "../BigLogo";

const CustomerRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        Promise.all([
            orders.update(),
            orders.updateCargoTypes()
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

    return authenticationService.seemToBeCustomer()
        ? currentPage
        : <Navigate to="/" />;
}

export default CustomerRoute;