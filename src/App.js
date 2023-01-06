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
import AdminRoute from "./protected/AdminRoute";
import AdminMainPage from "./admin/AdminMainPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";

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
                Загрузка...
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

                <Route path="/admin" element={<AdminRoute/>}>
                    <Route path="/admin/main" element={<AdminMainPage/>} />
                    <Route path="/admin/orders" element={<AdminOrdersPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>;
};

export default App;
