import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  // private url = 'http://localhost:5200';

  constructor(private httpClient: HttpClient) { }

  //this function is used to determine if a user exists, its used by
  //both the login and registering a user
  checkUser(user: User): Observable<User> {
    //if the username is undefinded that means it wasn't entered or in other words
    //means this is from the login, as login only asks for email and password
    if(user.username == null || user.username == undefined){
      //here we send a get to the db to determine if the user's information exists and matches
      //the entered login credentials
      return this.httpClient.get<User>(`${this.url}/users/${user.email}/${user.password}`);
    }else{
      //here if the username was entered we are trying to register a user, so we have to
      //determine if the email is already being used by another account, if so we do not
      //create a new user.
      return this.httpClient.get<User>(`${this.url}/users/${user.email}/a1`);
      //in the link being sent to the back end, a1 is the search code 
      //for email with no password, so the query will only search based on 
      //email which is a primary key
    }
  }

  //in this function we get a user from an ID which is recieved from 
  //either check user or create user
  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  //this function will create a new user from the register user functionality
  //gets the created user id as a response
  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/users`, user, { responseType: 'text' });
  }

  //below are removedd functions that may be useful in understanding the functionality of
  //our REST API

  // updateUser(id: string, user: User): Observable<string> {
  //   return this.httpClient.put(`${this.url}/users/${id}`, user, { responseType: 'text' });
  // }

  // deleteUser(id: string): Observable<string> {
  //   return this.httpClient.delete(`${this.url}/users/${id}`, { responseType: 'text' });
  // }
}