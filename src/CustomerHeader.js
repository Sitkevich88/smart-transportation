import styles from "./CustomerHeader.module.css";
import {useNavigate} from "react-router-dom";
import SmallLogo from "./SmallLogo";

const CustomerHeader = () => {
    const navigate = useNavigate();
    const goToProfile = () => navigate('/profile');
    const goToMain = () => navigate('/main');
    const goToOrders = () => navigate('/orders');

    return <div className={styles.header}>
        <div className={styles.menu}>
            <button className={styles.button} onClick={goToProfile}>Профиль</button>
            <button className={styles.button} onClick={goToMain}>Главная</button>
            <button className={styles.button} onClick={goToOrders}>Заявки</button>
        </div>
        <div className={styles.logo}>
            <SmallLogo/>
        </div>
    </div>;
}

export default CustomerHeader;