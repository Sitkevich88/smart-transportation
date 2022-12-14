import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import StartPage from "./StartPage";
import RegistrationPage from "./RegistrationPage";
import SignInPage from "./SignInPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import CreateOrderPage from "./CreateOrderPage";

function App() {
    return (<>

        <BrowserRouter>
            <Routes>
                <Route path="/addorder" element={<CreateOrderPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/" element={<StartPage />} />
            </Routes>
        </BrowserRouter>
    </>);
}

export default App;
