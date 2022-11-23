import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";
import styles from "./OrdersPage.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import stylesStartPage from "./StartPage.module.css";

const OrdersPage = (props) => {
    const [displayActiveOrders, setDisplayActiveOrders] = useState(true);
    const navigate = useNavigate();

    return (<>
        <CustomerHeader buttonId={2}/>
        <div className={mainPageStyles.ellipsesWrapper}>
            <div className={mainPageStyles.ellipse}></div>
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
        {displayActiveOrders
            ? <div className={styles.orders}>
                <div className={styles.order}>
                    <div className={styles.orderLeftWrapper}>
                        <p>6 ноября 2022 г.</p>
                        <p>Каменная -> Деревянная</p>
                    </div>
                    <div className={styles.orderRightWrapper}>

                    </div>
                </div>
            </div>
            : <div className={styles.orders}>
                <div className={styles.order}>
                    <div className={styles.orderLeftWrapper}>
                        <p>1 октября 2022 г.</p>
                        <p>Деревянная -> Каменная</p>
                    </div>
                    <div className={styles.orderRightWrapper}>

                    </div>
                </div>
            </div>
        }
        {displayActiveOrders && <button className={styles.addOrder} onClick={() => navigate('/addorder')}>
            <span className={styles.addOrderLogo}>+</span>
            <span className={styles.addOrderText}>Создать заявку</span>
        </button>}
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>);
}

export default OrdersPage;
