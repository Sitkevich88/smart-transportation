import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";
import styles from "./OrdersPage.module.css";
import {useState} from "react";

const OrdersPage = (props) => {
    const [displayActiveOrders, setDisplayActiveOrders] = useState(true);

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
                        <p>6 ноября 2022 г.</p>
                        <p>Деревянная -> Каменная</p>
                    </div>
                    <div className={styles.orderRightWrapper}>

                    </div>
                </div>
            </div>
        }
    </>);
}

export default OrdersPage;
