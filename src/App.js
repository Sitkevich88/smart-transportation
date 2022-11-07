import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link, BrowserRouter, Routes
} from "react-router-dom";
import StartPage from "./StartPage";

function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<StartPage />} />
        </Routes>
    </BrowserRouter>);
}

export default App;
