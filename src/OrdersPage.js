import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";
import styles from "./OrdersPage.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import stylesStartPage from "./StartPage.module.css";
import orders from "./store/Orders";
import Map from "./Map";
import PaymentPopUp from "./PaymentPopUp";
import ordersService from "./service/OrdersService";

const OrdersPage = (props) => {
    const [displayActiveOrders, setDisplayActiveOrders] = useState(true);
    const navigate = useNavigate();
    const [isPopUpOpened, setIsPopUpOpened] = useState(false);
    ordersService.getOrders();

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
        {displayActiveOrders && <button className={styles.addOrder} onClick={() => navigate('/main')}>
            <span className={styles.addOrderLogo}>+</span>
            <span className={styles.addOrderText}>Создать заявку</span>
        </button>}
        <div className={styles.orders}>
            {orders[displayActiveOrders ? 'activeOrders' : 'oldOrders'].map(order => {
                return (<div className={styles.order} key={order.id}>
                    <div className={styles.orderLeftWrapper}>
                        <p>{order.creationDate}</p>
                        <p>{order.from} -> {order.to}</p>
                        <Map station1={order.from} station2={order.to} width={250} height={200}/>
                    </div>
                    <div className={styles.orderRightWrapper}>
                        <p>Заказ: {order.id}</p>
                        <div className={styles.orderRightWrapperLine}>
                            <p>{order.cargoType}</p>
                            <p>{order.weight} кг</p>
                        </div>
                        <p>Отправлено: {order.dispatchDate ?? '--'}</p>
                        <p>Доставлено: {order.receiptDate ?? '--'}</p>
                        <p>Комментарий: {order.comment ?? '--'}</p>
                        <p>Статус: {order.status}</p>
                        {order.status === 'Ожидает оплаты'
                            ? <p className={styles.popUpOpener} onClick={() => setIsPopUpOpened(true)}>Открыть реквизиты</p>
                            : null
                        }
                    </div>
                </div>);
            })}
        </div>
        <PaymentPopUp display={isPopUpOpened} open={setIsPopUpOpened}/>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>);
}

export default OrdersPage;
