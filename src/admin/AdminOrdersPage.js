import AdminHeader from "./AdminHeader";
import customerStyles from "../MainPage.module.css";
import styles from "../OrdersPage.module.css";
import {useState} from "react";
import adminOrders from "./store/AdminOrders";

const AdminOrdersPage = () => {
    const [displayActiveOrders, setDisplayActiveOrders] = useState(true);

    return <>
        <AdminHeader/>
        <div className={customerStyles.ellipsesWrapper}>
            <div className={customerStyles.ellipse}></div>
        </div>
        <div className={styles.buttons}>
            <button type="button"
                    onClick={() => setDisplayActiveOrders(true)}
                    className={displayActiveOrders ? styles.activeButton : styles.notActiveButton}
            >
                Активные заявки
            </button>
            <button type="button"
                    onClick={() => setDisplayActiveOrders(false)}
                    className={!displayActiveOrders ? styles.activeButton : styles.notActiveButton}
            >
                Архив заявок
            </button>
        </div>
    </>;
};

export default AdminOrdersPage;