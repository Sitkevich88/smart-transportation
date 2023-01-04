import {Navigate, Outlet} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";

const CustomerRoute = () => {
    return authenticationService.seemToBeCustomer() ? <Outlet /> : <Navigate to="/" />;
}

export default CustomerRoute;