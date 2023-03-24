import { EventEmitter, Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class LoginService{
    private user: User;
    loginEvent = new EventEmitter<User>();


    constructor(){
        this.user = {username: "Guest", 
                    password: "-1",
                    email: "-1",
                    _id:"-1"};
    }

    login(newUser: User){
        //alert(newUser.username + " Logged In");
        this.user = newUser;
    }

    getUser(){
        return this.user;
    }

}