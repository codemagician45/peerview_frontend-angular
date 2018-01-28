import {Injectable} from "@angular/core";
import { SignUp, SignIn, User } from "../models/models";



@Injectable()
export class UserService {
    loggedInUser: User = this.getLoggedInUser();
    isAuthenticated() {
        if (this.loggedInUser === null || this.loggedInUser === undefined) {
           const user = localStorage.getItem("user");
           if (user !== null && user !== undefined) {
               this.loggedInUser = JSON.parse(user);
           }
        }
        return (this.loggedInUser !== null && this.loggedInUser !== undefined);
    }
    getLoggedInUser() {
        if (this.loggedInUser === null || this.loggedInUser === undefined) {
            const user = localStorage.getItem("user");
            if (user !== null && user !== undefined) {
                this.loggedInUser = JSON.parse(user);
            }
         }
         return this.loggedInUser;
    }
    setLoggedInUser(user: any) {
        this.loggedInUser = new User(user.first_name,  user.last_name, user.email, user.is_active, user.token);
        this.loggedInUser.id = user.id;
        localStorage.setItem("user", JSON.stringify(this.loggedInUser));
    }
    logoutuser() {
        localStorage.removeItem("user");
        localStorage.clear();
        this.loggedInUser = null;
    }
}
