import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { ApiData } from './apiData';
import { apiController } from './apiController/apiController';
import { TeamData } from './apiController/teamData';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  //private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  private url = 'http://localhost:5200';
  private teamsJson$: ApiData;
  private league = 57; //nhl
  private season = 2022; //current season


  constructor(private httpClient: HttpClient, private api: apiController) { }

  private refreshTeams() {
    console.log("in refresh teams");
    let temp: string;
    let apiData: ApiData;
    let httpResponse = this.httpClient.get<ApiData>(`${this.url}/apiData/teams`);
    httpResponse.subscribe({
      next: (apiData) => {
        this.teamsJson$ = apiData;
      },
      error: (error) => {
        temp = "teams*";//add flag to text being sent

        this.api.makeCallAllTeams(this.league, this.season)
        .then(res => {
          apiData = {flag: "teams", json: res};//dont need team stamp for teams
          this.teamsJson$ = apiData;
        })
        .then(placeHolder => {
          console.log("We are now creating the teams apiData\n");
          this.httpClient.post(`${this.url}/apiData`, apiData, { responseType: 'text' })
          .subscribe({
            next: () => {
              console.log("ApiData was successfully created");
            },
            error: (error) => {
              alert("Failed to create ApiData");
              console.error(error);
            }
          });
        });
      }
    });
  }

  getTeams(): ApiData {
    this.refreshTeams();
    return this.teamsJson$;
  }

  getTeam(id: string): Observable<ApiData> {
    return this.httpClient.get<ApiData>(`${this.url}/apiData/teams`);
  }

}