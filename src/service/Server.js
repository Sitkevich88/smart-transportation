const serverAPI = {
    _origin: 'http://localhost:21413',

    get signIn(){
        return `${this._origin}/auth/signin`;
    },

    get signUp(){
        return `${this._origin}/auth/signup`;
    },

    get currentProfile(){
        return `${this._origin}/user/profile`;
    },

    get updateProfile(){
        return `${this._origin}/user/profile/update`;
    }
};

export default serverAPI;