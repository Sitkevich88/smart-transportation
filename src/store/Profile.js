import {makeAutoObservable} from "mobx";
import profileService from "../service/ProfileService";

class Profile {
    companyName:string = ""
    phoneNumber:string = ""

    constructor() {
        makeAutoObservable(this);
    }

    async loadCurrent() {
        return profileService
            .getCurrentProfile()
            .then(profile => {
                this.updateFields(profile.companyName, profile.phoneNumber);
                return profile;
            });
    }

    async update(newProfile) {
        return profileService
            .updateProfile(newProfile)
            .then(profile => {
                this.updateFields(profile.companyName, profile.phoneNumber);
                return profile;
            });
    }

    updateFields(companyName, phoneNumber){
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        console.log('updated profile:', companyName, phoneNumber)
    }
}

export default new Profile();