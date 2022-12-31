import {makeAutoObservable} from "mobx";

class Orders {
    activeOrders = [
        {
            id: 5686,
            creationDate: '6 ноября 2022 г.',
            from: 'Каменная',
            to: 'Деревянная',
            cargoType: 'Песок',
            weight: 10000,
            dispatchDate: null,
            receiptDate: null,
            status: 'Ожидает оплаты',
            comment: null
        },
        {
            id: 5685,
            creationDate: '5 ноября 2022 г.',
            from: 'Пальмовая',
            to: 'Деревянная',
            cargoType: 'Щебень',
            weight: 20000,
            dispatchDate: null,
            receiptDate: null,
            status: 'Ожидает оплаты',
            comment: null
        },
        {
            id: 5684,
            creationDate: '4 ноября 2022 г.',
            from: 'Пальмовая',
            to: 'Мраморная',
            cargoType: 'Другое',
            weight: 150,
            dispatchDate: null,
            receiptDate: null,
            status: 'Ожидает оплаты',
            comment: 'Хрусталь привезу'
        }
    ];
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
        }
    ];

    constructor() {
        makeAutoObservable(this);
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