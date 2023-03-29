import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { FavTeam } from './favTeam';

@Injectable({
  providedIn: 'root'
})
export class FavTeamService {
  private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  //private url = 'http://localhost:5200';
  private FavTeam$: Subject<FavTeam> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //this function we attempt to get a user's current favourited team
  //as per the current implimentation a user can only have one favourite
  //team at a time
  getFavTeam(UserID?: string): Observable<FavTeam> {
    return this.httpClient.get<FavTeam>(`${this.url}/favTeams/${UserID}`);
  }

  //this function will follow a team or replace 
  //old fav team with new one
  createFavTeam(favTeam: FavTeam): Observable<string> {
    return this.httpClient.post(`${this.url}/favTeams`, favTeam, { responseType: 'text' });
  }
}