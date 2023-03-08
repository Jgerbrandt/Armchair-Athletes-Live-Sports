import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "./user";



@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private url = 'http://localhost:1200';
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}`, user, { responseType: 'text' });
  }


}