import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private url = 'http://localhost:5200';
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshUsers() {
    this.httpClient.get<User[]>(`${this.url}/users`)
      .subscribe(users => {
        this.users$.next(users);
      });
  }

  createUser(user: User): Observable<string> {
    console.log("test in user sevices");
    let httpReplyThing = this.httpClient.post(`${this.url}`, user, { responseType: 'text' });
    console.log(httpReplyThing);
    return httpReplyThing;
  }

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }
} 