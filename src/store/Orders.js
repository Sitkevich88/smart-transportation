import {makeAutoObservable} from "mobx";

class Orders {
    activeOrders = [
        {
            id: 5684,
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
            id: 5686,
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

}

export default new Orders();