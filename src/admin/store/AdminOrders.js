import {makeAutoObservable} from "mobx";
import ordersService from "../../service/OrdersService";
import ordersHelper from "../../helpers/OrdersHelper";

class AdminOrders{
    activeOrders = []
    oldOrders = []
    cargoTypes = []

    constructor() {
        makeAutoObservable(this);
    }

    async update(){
        return ordersService
            .getOrdersForAdmin()
            .then(orders => {
                const receivedOrders = orders.map(order => {
                    return ordersHelper.convertServerOrder(order);
                });
                this.activeOrders = receivedOrders.filter(order => order.status !== 'В архиве');
                this.oldOrders = receivedOrders.filter(order => order.status === 'В архиве');
            });
    }

    async updateOrderStatus(orderId, newStatusId) {
        return ordersService
            .updateOrderStatus(orderId, newStatusId)
            .then(order => {
                const convertedOrder = ordersHelper.convertServerOrder(order);
                this.substituteOrder(convertedOrder);

                return convertedOrder.status;
            });
    }

    async substituteOrder(newOrder){
        const id = newOrder.id;
        const order = this.activeOrders.find(ord => ord.id === id)
            ?? this.oldOrders.find(ord => ord.id === id) ?? null;

        Object.assign(order, newOrder);
    }
}

export default new AdminOrders();