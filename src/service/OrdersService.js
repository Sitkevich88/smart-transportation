import serverAPI from "./Server";
import authenticationService from "./AuthenticationService";

class OrdersService {
    async getOrders(){
        return fetch(serverAPI.myOrders, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru',
                'Authorization': authenticationService.getJWT()
            }
        })
            .then(response => {
                return response.json().then(ordersResponse => {
                    switch (response.status){
                        case 200:
                            return ordersResponse.orders;
                        default:
                            console.log('Could not get orders from server');
                            return [];
                    }
                });
            })
    }

    async getCargoTypes(){
        return fetch(serverAPI.cargoTypes, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru',
                'Authorization': authenticationService.getJWT()
            }
        })
            .then(response => {
                return response.json().then(cargoTypesResponse => {
                    switch (response.status){
                        case 200:
                            return cargoTypesResponse.cargoTypes;
                        default:
                            console.log('Could not get orders from server');
                            return [];
                    }
                });
            });
    }

    async addOrder(order){
        return fetch(serverAPI.addOrder, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru',
                'Authorization': authenticationService.getJWT()
            },
            body: JSON.stringify(order)
        })
            .then(response => {
                return response.json().then(addOrderResponse => {
                    switch (response.status){
                        case 200:
                            return addOrderResponse;
                        default:
                            console.log('Could not add order');
                            return {};
                    }
                });
            });
    }
}

export default new OrdersService();