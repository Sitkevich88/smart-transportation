import styles from "./CustomerHeader.module.css";
import {useNavigate} from "react-router-dom";
import SmallLogo from "./SmallLogo";

const CustomerHeader = (props) => {
    const navigate = useNavigate();
    const goToProfile = () => navigate('/profile');
    const goToMain = () => navigate('/main');
    const goToOrders = () => navigate('/orders');
    const active = props.buttonId;

    return <div className={styles.header}>
        <div className={styles.menu}>
            <button className={active===0 ? styles.activeButton : null} onClick={goToProfile}>Профиль</button>
            <button className={active===1 ? styles.activeButton : null} onClick={goToMain}>Главная</button>
            <button className={active===2 ? styles.activeButton : null} onClick={goToOrders}>Заявки</button>
        </div>
        <div className={styles.logo}>
            <SmallLogo/>
        </div>
    </div>;
}

export default CustomerHeader;