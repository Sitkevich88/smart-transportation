import serverAPI from "./Server";
import {Role} from "../helpers/Role";
import mapService from "./MapService";

class AuthenticationService{
     async signIn(credentials){
        const authentication = fetch(serverAPI.signIn, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru'
            },
            body: JSON.stringify(credentials)
        });

         return this.#convertServerResponse(authentication);
    }

    async signUp(user){
        const authentication = fetch(serverAPI.signUp, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru'
            },
            body: JSON.stringify(user)
        });

        return this.#convertServerResponse(authentication);
    }

    async #convertServerResponse(authentication){
        return authentication
            .then(response => {
                return response.json().then(authenticationResponse => {
                    switch (response.status){
                        case 200:
                            this.#setJWT(authenticationResponse.jwt);
                            this.#setRole(authenticationResponse.role);
                            return {success: true, errorMessage: null};
                        default:
                            return {success: false, errorMessage: authenticationResponse.errorMessage};
                    }
                });
            })
            .catch(err => {return {success: false, errorMessage: err};});
    }

    #setJWT(jwt: string){
        document.cookie = `Authorization=${jwt}; max-age=${3600*24*7}`;
    }

    getJWT(){
        const match = document.cookie.match(new RegExp('(^| )Authorization=([^;]+)'));
        return match ? match[2] : null;
    }

    hasJWT(){
        return !!this.getJWT();
    }

    #setRole(role: string){
        localStorage.setItem('role', role);
    }

    getRole(){
        return localStorage.getItem('role') ?? "";
    }

    seemToBeCustomer(){
        return this.getRole() === Role.Customer
            && this.hasJWT();
    }

    seemToBeAdmin(){
        return this.getRole() === Role.Admin
            && this.hasJWT();
    }

    logout(){
        document.cookie = `Authorization=; max-age=0`;
        localStorage.removeItem('role');
        mapService.unLoadPath();
    }
}

export default new AuthenticationService();