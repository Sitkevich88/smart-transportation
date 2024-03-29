const serverAPI = {
    _origin: 'http://localhost:21413',

    get signIn(){
        return `${this._origin}/auth/signin`;
    },

    get signUp(){
        return `${this._origin}/auth/signup`;
    },

    get map(){
        return `${this._origin}/common/map`;
    },

    get currentProfile(){
        return `${this._origin}/user/profile`;
    },

    get updateProfile(){
        return `${this._origin}/user/profile/update`;
    },

    get myOrders(){
        return `${this._origin}/user/orders`;
    },

    get addOrder(){
        return `${this._origin}/user/orders/add`;
    },

    get cargoTypes(){
        return `${this._origin}/user/cargo/types`;
    },

    get ordersForAdmin(){
        return `${this._origin}/admin/orders`;
    },

    get changeOrderStatus() {
        return `${this._origin}/admin/order/status/change`;
    }
};

export default serverAPI;