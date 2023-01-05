import {makeAutoObservable} from "mobx";
import ordersService from "../service/OrdersService";
import mapService from "../service/MapService";

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
                console.log('updated orders')
                const receivedOrders = orders.map(order => {
                    return {
                        id: order.id,
                        creationDate: this.convertServerDate(order.creationDate),
                        from: mapService.getStationNameById(order.station1),
                        to: mapService.getStationNameById(order.station2),
                        cargoType: order.cargoType,
                        weight: order.weight,
                        dispatchDate: null,
                        receiptDate: null,
                        status: order.status,
                        comment: order.comment
                    };
                });
                this.activeOrders = receivedOrders.filter(order => order.status !== 'В архиве');
                this.oldOrders = receivedOrders.filter(order => order.status === 'В архиве');
            });
    }

    async updateCargoTypes(){
        ordersService
            .getCargoTypes()
            .then(cargoTypes => {
                console.log('updated cargo types');
                this.cargoTypes = cargoTypes;
            });
    }

    convertServerDate(date){
        const monthsInGenitive = [
            'января', 'февраля', 'марта', 'апреля',
            'мая', 'июня', 'июля', 'августа',
            'сентября', 'октября', 'ноября', 'декабря'
        ]
        const [year, monthNumber, day] = date.split('-');

        return `${day} ${ monthsInGenitive[monthNumber - 1] ?? "??" } ${year} г.`;
    }

    addActiveOrder(order){
        const today = new Date();
        let month;
        switch (today.getMonth()){
            case 0:
                month = 'января';
                break;
            case 1:
                month = 'февраля';
                break;
            case 2:
                month = 'марта';
                break;
            case 3:
                month = 'апреля';
                break;
            case 4:
                month = 'мая';
                break;
            case 5:
                month = 'июня';
                break;
            case 6:
                month = 'июля';
                break;
            case 7:
                month = 'августа';
                break;
            case 8:
                month = 'сентября';
                break;
            case 9:
                month = 'октября';
                break;
            case 10:
                month = 'ноября';
                break;
            default:
                month = 'декабря';
                break;
        }
        this.activeOrders.unshift({
            id: this.activeOrders[0].id + 1,
            creationDate: `${today.getDate()} ${month} ${today.getFullYear()} г.`,
            from: order.from,
            to: order.to,
            cargoType: order.type,
            weight: order.weight,
            dispatchDate: null,
            receiptDate: null,
            status: 'На рассмотрении',
            comment: order.comment
        });
    }

}

export default new Orders();