import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { FavTeam } from './favTeam';

@Injectable({
  providedIn: 'root'
})
export class FavTeamService {
  private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  // private url = 'http://localhost:5200';
  private FavTeam$: Subject<FavTeam> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getFavTeam(UserID?: string): Observable<FavTeam> {
    return this.httpClient.get<FavTeam>(`${this.url}/favTeams/${UserID}`);
  }

  //will follow a team or replace old fav team with new one
  createFavTeam(favTeam: FavTeam): Observable<string> {
    console.log("We are now creating the FavTeam\n");
    return this.httpClient.post(`${this.url}/favTeams`, favTeam, { responseType: 'text' });
  }
}