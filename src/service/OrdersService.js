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
                            console.log(ordersResponse)
                            return ordersResponse;
                        default:
                            console.log('Could not get map from server');
                    }
                });
            })
    }
}

export default new OrdersService();