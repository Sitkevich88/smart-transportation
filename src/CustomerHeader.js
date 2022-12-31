import styles from "./CustomerHeader.module.css";
import {useNavigate} from "react-router-dom";
import SmallLogo from "./SmallLogo";

const CustomerHeader = (props) => {
    const navigate = useNavigate();
    const goToProfile = () => navigate('/profile');
    const goToMain = () => navigate('/main');
    const goToOrders = () => navigate('/orders');
    const logOut = () => navigate('/');
    const active = props.buttonId;


    return <div className={styles.header}>
        {<div className={styles.menu}>
            <button onClick={goToMain}>Главная</button>
            <button onClick={goToProfile}>Профиль</button>
            <button onClick={goToOrders}>Заявки</button>
            <button onClick={logOut}>Выйти</button>
        </div>}
        <div className={styles.logo}>
            <SmallLogo/>
        </div>
    </div>;
}

export default CustomerHeader;