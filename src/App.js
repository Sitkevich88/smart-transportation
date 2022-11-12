import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link, BrowserRouter, Routes
} from "react-router-dom";
import StartPage from "./StartPage";
import RegistrationPage from "./RegistrationPage";
import SignInPage from "./SignInPage";

function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
    </BrowserRouter>);
}

export default App;
