import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { ApiData } from './apiData';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  //private url = 'http://localhost:5200';
  //'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app'
  private apiData$: Subject<ApiData[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshTeams() {
    this.httpClient.get<ApiData[]>(`${this.url}/apiData`)
      .subscribe(apiData => {
        this.apiData$.next(apiData);
      });
  }

  getTeams(): Subject<ApiData[]> {
    this.refreshTeams();
    return this.apiData$;
  }

  getTeam(id: string): Observable<ApiData> {
    return this.httpClient.get<ApiData>(`${this.url}/teams/${id}`);
  }

}