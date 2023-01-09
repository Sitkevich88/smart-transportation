import AdminHeader from "./AdminHeader";
import customerStyles from "../MainPage.module.css";
import styles from "../OrdersPage.module.css";
import Map from "../Map";
import React, {useEffect, useState} from "react";
import adminOrders from "./store/AdminOrders";
import ordersHelper from "../helpers/OrdersHelper";
import BigLogo from "../BigLogo";

const AdminOrdersPage = () => {
    const [displayActiveOrders, setDisplayActiveOrders] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        adminOrders.update().then(setIsLoading(false));
    }, []);

    const changeStatus = (id, newStatus, target) => {
        setIsLoading(true);
        adminOrders.updateOrderStatus(id, ordersHelper.getBackendStatusIdByName(newStatus))
            .then(st => {
                const options = getOptionsByStatus(st);
                target.replaceChildren(options);
                setIsLoading(false);
            });
    };

    const getOptionsByStatus = (st) => {
        const optionStrings = ordersHelper.getPossibleNextStatuses(st);

        return optionStrings.map(option => {
            return <option key={option} value={option}>
                {option}
            </option>;
        })
    };

    const loadingPage = <>
        <BigLogo/>
        <div style={{textAlign: "center", fontSize: "50px", marginTop: "50px", fontFamily: "Inter"}}>
            Загрузка...
        </div>
    </>;

    return isLoading ? loadingPage :
        <>
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
        <div className={styles.orders}>
            {adminOrders[displayActiveOrders ? 'activeOrders' : 'oldOrders'].map(order => {
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
                        <p>Статус:
                            <select onChange={(a) => changeStatus(a.target.name, a.target.value, a.target)} name={order.id}>
                                {getOptionsByStatus(order.status)}
                            </select>
                        </p>
                    </div>
                </div>);
            })}
        </div>
    </>;
};

export default AdminOrdersPage;