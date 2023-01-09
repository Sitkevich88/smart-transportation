import {makeAutoObservable} from "mobx";
import ordersService from "../service/OrdersService";
import mapService from "../service/MapService";
import ordersHelper from "../helpers/OrdersHelper";

class Orders {
    activeOrders = []
    oldOrders = [
        {
            id: 5680,
            creationDate: '7 октября 2022 г.',
            from: 'Отчаянная',
            to: 'Рябиновая',
            cargoType: 'Щебень',
            weight: 20000,
            dispatchDate: '11 октября 2022 г.',
            receiptDate: '12 октября 2022 г.',
            status: 'Завершено',
            comment: null
        } //todo delete later
    ]
    cargoTypes = []

    constructor() {
        makeAutoObservable(this);
    }

    async update(){
        return ordersService
            .getOrders()
            .then(orders => {
                const receivedOrders = orders.map(order => {
                    return ordersHelper.convertServerOrder(order);
                });
                this.activeOrders = receivedOrders.filter(order => order.status !== 'В архиве');
                this.oldOrders = receivedOrders.filter(order => order.status === 'В архиве');
            });
    }

    async updateCargoTypes(){
        return ordersService
            .getCargoTypes()
            .then(cargoTypes => {
                this.cargoTypes = cargoTypes;
            });
    }

    async addOrder(order){
        const request = {
            station1: mapService.getStationIdByName(order.from),
            station2: mapService.getStationIdByName(order.to),
            cargoType: this.cargoTypes.findIndex(cargoType => cargoType === order.type) + 1,
            weight: parseFloat(order.weight),
            comment: order.comment
        };

        return ordersService
            .addOrder(request)
            .then(newOrder => {
                this.activeOrders.unshift(
                    ordersHelper.convertServerOrder(newOrder)
                );
            });
    }
}

export default new Orders();