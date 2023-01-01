import serverAPI from "./Server";
import authenticationService from "./AuthenticationService";

class ProfileService{

    async getCurrentProfile() {
        const profileRequest = fetch(serverAPI.currentProfile, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru',
                'Authorization': authenticationService.getJWT()
            }
        });

        return this.#getProfileFromRequest(profileRequest);
    }

    async updateProfile(newProfile) {
        const profileRequest = fetch(serverAPI.updateProfile, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': 'ru',
                'Authorization': authenticationService.getJWT()
            },
            body: JSON.stringify(newProfile)
        });

        return this.#getProfileFromRequest(profileRequest);
    }
    
    async #getProfileFromRequest(request){
        return request
            .then(response => {
                return response.json().then(profile => {
                    switch (response.status){
                        case 200:
                            return profile;
                        case 401:
                            authenticationService.logout();
                            break;
                        default:
                            console.log('error');
                            return {companyName: null, phoneNumber: null};
                    }
                });
            })
            .catch(err => console.log(err));
    }
}

export default new ProfileService();