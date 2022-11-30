import {makeAutoObservable} from "mobx";

class Profile {
    companyName:string = "ООО Агроном";
    phoneNumber:string = "89112223344";

    constructor() {
        makeAutoObservable(this);
    }

    updateProfile(companyName, phoneNumber){
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        console.log('updated profile:', companyName, phoneNumber)
    }
}

export default new Profile();