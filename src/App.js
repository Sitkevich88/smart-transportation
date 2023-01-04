import React, {useEffect, useState} from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import StartPage from "./StartPage";
import RegistrationPage from "./RegistrationPage";
import SignInPage from "./SignInPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import CreateOrderPage from "./CreateOrderPage";
import CustomerRoute from "./protected/CustomerRoute";
import mapStorage from "./service/MapUpdater";
import BigLogo from "./BigLogo";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        mapStorage
            .update()
            .then(() => {
                setIsLoading(false);
            });
    },[])

    return isLoading
        ? <>
            <BigLogo/>
            <div style={{textAlign: "center", fontSize: "50px", marginTop: "50px", fontFamily: "Inter"}}>
                Загрузка карты...
            </div>
        </>
        : <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<SignInPage />} />

                <Route path="/" element={<CustomerRoute/>}>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/addorder" element={<CreateOrderPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>;
};

export default App;
