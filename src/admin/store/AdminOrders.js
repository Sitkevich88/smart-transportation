import {makeAutoObservable} from "mobx";

class AdminOrders {
    constructor() {
        makeAutoObservable(this);
    }
}

export default new AdminOrders();