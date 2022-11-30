import {makeAutoObservable} from "mobx";
import {Role} from "../helpers/Role";

class User {
    _role = Role.User;

    constructor() {
        makeAutoObservable(this);
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

}

export default new User();