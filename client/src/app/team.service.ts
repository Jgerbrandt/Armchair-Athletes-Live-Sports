import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  private teams$: Subject<Team[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshUsers() {
    console.log("should not be able to get here\n");
    this.httpClient.get<Team[]>(`${this.url}/users`)
      .subscribe(users => {
        this.teams$.next(users);
      });
  }

  private refreshTeams() {
    /*
    collections.team.find().toArray((err, teams) => {
        if (err) {
          console.error(err);
        } else {
          this.teams$.next(teams);
        }
      });
      */
    
    this.httpClient.get<Team[]>(`${this.url}/teams`)
      .subscribe(users => {
        this.teams$.next(users);
      });
  }

  getUsers(): Subject<Team[]> {
    this.refreshUsers();
    return this.teams$;
  }

  getTeams(): Subject<Team[]> {
    this.refreshTeams();
    return this.teams$;
  }

  checkUser(team: Team): Observable<Team> {
    console.log(team.team_id);
    if(team.team_id == null || team.team_id == undefined){
      return this.httpClient.get<Team>(`${this.url}/teams/${team.team_id}/${team.user_id}`);
    }else{
      return this.httpClient.get<Team>(`${this.url}/teams/${team.team_id}/a1`);//a1 is the search code for email no password
    }
  }

  getUser(id: string): Observable<Team> {
    return this.httpClient.get<Team>(`${this.url}/teams/${id}`);
  }

  createUser(team: Team): Observable<string> {
    console.log("We are now creating the user\n");
    let httpReplyThing = this.httpClient.post(`${this.url}/teams`, team, { responseType: 'text' });
    return httpReplyThing;
  }

  createTeam(team: Team): Observable<string> {
    console.log("We are now creating the user\n");
    let httpReplyThing = this.httpClient.post(`${this.url}/team`, team, { responseType: 'text' });
    return httpReplyThing;
  }


  addTeam(team: Team): Observable<string> {
    console.log("We are now creating the user\n");
    let httpReplyThing = this.httpClient.post(`${this.url}/teams`, team, { responseType: 'text' });
    return httpReplyThing;
  }

  updateUser(id: string, team: Team): Observable<string> {
    return this.httpClient.put(`${this.url}/users/${id}`, team, { responseType: 'text' });
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/users/${id}`, { responseType: 'text' });
  }
}