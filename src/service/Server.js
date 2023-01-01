const serverAPI = {
    _origin: 'http://localhost:21413',

    get signIn(){
        return `${this._origin}/auth/signin`;
    },

    get signUp(){
        return `${this._origin}/auth/signup`;
    }
};

export default serverAPI;