import styles from "../CustomerHeader.module.css";
import SmallLogo from "../SmallLogo";
import {useNavigate} from "react-router-dom";
import authenticationService from "../service/AuthenticationService";

const AdminHeader = () => {
    const navigate = useNavigate();
    const goToMain = () => navigate('/admin/main');
    const goToOrders = () => navigate('/admin/orders');
    const logOut = () => {
        authenticationService.logout();
        navigate('/');
    };

    return <div className={styles.header}>
        {<div className={styles.menu}>
            <button onClick={goToMain}>Главная</button>
            <button onClick={goToOrders}>Заявки</button>
            <button onClick={logOut}>Выйти</button>
        </div>}
        <div className={styles.logo}>
            <SmallLogo/>
        </div>
    </div>;
};

export default AdminHeader;