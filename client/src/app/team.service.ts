import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  //private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  private url = 'http://localhost:5200';
  //'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app'
  private teams$: Subject<Team[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshTeams() {
    this.httpClient.get<Team[]>(`${this.url}/teams`)
      .subscribe(teams => {
        this.teams$.next(teams);
      });
  }

  getTeams(): Subject<Team[]> {
    this.refreshTeams();
    return this.teams$;
  }

  getTeam(id: string): Observable<Team> {
    return this.httpClient.get<Team>(`${this.url}/teams/${id}`);
  }

  followTeam(id: string): Observable<Team> {
    return this.httpClient.get<Team>(`${this.url}/teams/${id}/fl`);
  }

  //tempoaray debuger
  createTeam(team: Team): Observable<string> {
    console.log(`We are now try to creating the team:\n${team.sport}`);
    let httpReplyThing = this.httpClient.post(`${this.url}/teams`, team, { responseType: 'text' });
    console.log(`The response is:~~~~~${httpReplyThing}`);
    return httpReplyThing;
  }
}