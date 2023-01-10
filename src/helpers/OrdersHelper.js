import mapService from "../service/MapService";

class OrdersHelper{

    statuses = [
        'На рассмотрении', //0
        'Отклонено',  //1
        'Ожидает оплаты', //2
        'Ожидает доставки', //3
        'В пути', //4
        'Прибыло', //5
        'В архиве' //6
    ]

    convertServerDate(date){
        const monthsInGenitive = [
            'января', 'февраля', 'марта', 'апреля',
            'мая', 'июня', 'июля', 'августа',
            'сентября', 'октября', 'ноября', 'декабря'
        ]
        const [year, monthNumber, day] = date.split('-');

        return `${day} ${ monthsInGenitive[monthNumber - 1] ?? "??" } ${year} г.`;
    }

    convertServerOrder(order){
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
    }

    copyOrder(source, target){
        console.log(target.weight);
        target.weight +=1;
        console.log(target.weight);
        //Object.assign(target, source);
    }

    getPossibleNextStatuses(currentStatusName){
        const currentStatusId = this.getFrontendStatusIdByName(currentStatusName);

        if (currentStatusId === -1)
            return [];
        
        const [pending, rejected, awaitingPayment, awaitingDelivery,
            beingDelivered, arrived, archived] = [0, 1, 2, 3, 4, 5, 6];

        const possibleStatusCodes = [currentStatusId];

        switch (currentStatusId){
            case pending:
                possibleStatusCodes.push(...[rejected, awaitingPayment]);
                break
            case rejected:
                possibleStatusCodes.push(pending);
                break
            case awaitingPayment:
                possibleStatusCodes.push(awaitingDelivery);
                break
            case awaitingDelivery:
                possibleStatusCodes.push(beingDelivered);
                break
            case beingDelivered:
                possibleStatusCodes.push(arrived);
                break
            case arrived:
                possibleStatusCodes.push(archived);
                break
            default:
                possibleStatusCodes.push(rejected);
        }
        
        return possibleStatusCodes.map(code => this.getStatusFromCode(code));
    }

    getStatusFromCode(code){
        return this.statuses[code];
    }

    getFrontendStatusIdByName(status) {
        if (this.statuses.includes(status)) {
            for (let id = 0; id < this.statuses.length; id++) {
                if (this.getStatusFromCode(id) === status)
                    return id;
            }
        }

        return -1;
    }

    getBackendStatusIdByName(status) {
        let result = this.getFrontendStatusIdByName(status);
        if (result !== -1)
            result += 1;

        return result;
    }
}

export default new OrdersHelper();