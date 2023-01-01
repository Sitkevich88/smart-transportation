import serverAPI from "./Server";

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

        return authentication
            .then(response => {
                return response.json().then(authenticationResponse => {
                    switch (response.status){
                        case 200:
                            this.setJWT(authenticationResponse.jwt);
                            this.setRole(authenticationResponse.role);
                            return {success: true, errorMessage: null};
                        default:
                            return {success: false, errorMessage: authenticationResponse.errorMessage};
                    }
                });
            })
            .catch(err => {return {success: false, errorMessage: err};});
    }

    setJWT(jwt: string){
        document.cookie = `Authorization=${jwt}; max-age=${3600*24*7}`;
    }

    setRole(role: string){
        localStorage.setItem('role', role);
    }
}

export default new AuthenticationService();