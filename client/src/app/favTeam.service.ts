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
  //'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app'
  private favTeams$: Subject<FavTeam[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshFavTeams() {
    console.log("should not be able to get here\n");
    this.httpClient.get<FavTeam[]>(`${this.url}/favTeams`)
      .subscribe(favTeams => {
        this.favTeams$.next(favTeams);
      });
  }

  getFavTeams(): Subject<FavTeam[]> {
    this.refreshFavTeams();
    return this.favTeams$;
  }

  createFavTeam(favTeam: FavTeam): Observable<string> {
    console.log("We are now creating the FavTeam\n");
    return this.httpClient.post(`${this.url}/favTeams`, favTeam, { responseType: 'text' });
  }

  deleteFavTeam(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/favTeams/${id}`, { responseType: 'text' });
  }
}