import { EventEmitter, Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class LoginService{
    private user: User;
    loginEvent = new EventEmitter<User>();

    //to begin we fill default values for a user
    constructor(){
        this.user = {username: "Guest", 
                    password: "-1",
                    email: "-1",
                    _id:"-1"};
    }

    //when login is called we fill the user value with
    //the currently logged in user
    login(newUser: User){
        this.user = newUser;
    }

    //return current user's login
    //information
    getUser(){
        return this.user;
    }

    //resets the current 
    //user to default information
    logout(){
        this.user = {username: "Guest", 
            password: "-1",
            email: "-1",
            _id:"-1"};
    }


}