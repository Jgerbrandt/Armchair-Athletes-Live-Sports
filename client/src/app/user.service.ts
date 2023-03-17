import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';

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

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }

  checkUser(user: User): Observable<User> {
    //console.log("we did in fact make it to this point");
    return this.httpClient.get<User>(`${this.url}/users/${user.email}/${user.password}`);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  createUser(user: User): Observable<string> {
    let httpReplyThing = this.httpClient.post(`${this.url}/users`, user, { responseType: 'text' });
    return httpReplyThing;
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/users/${id}`, user, { responseType: 'text' });
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/users/${id}`, { responseType: 'text' });
  }
}