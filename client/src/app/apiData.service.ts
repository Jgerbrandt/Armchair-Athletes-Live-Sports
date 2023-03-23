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

  async wrapingRefreshTeamsSubscription(): Promise<ApiData>{
    return new Promise((resolve, reject) => {

      let apiData: ApiData;
      //Here we do HTTP GET call to see if the teams are already stored
      let httpResponse = this.httpClient.get<ApiData>(`${this.url}/apiData/teams`);
      httpResponse.subscribe({
        //If we were able to find it we just return the data
        next: (apiData) => {
          console.log(`GOOD: Found API call for teams in DB`);
          resolve(apiData);
        },
        //If we did not find the call
        error: (error) => {
          //first make a call to the API to get the teams
          this.api.makeCallAllTeams(this.league, this.season)
          .then(res => {
            //once we have to teams from the api (json format)
            //we add the flag for data type (teams).
            //We dont add time stamp right now the db will do that 
            apiData = {flag: "teams", json: res};
            //also store the object to be used
          })
          .then(placeHolder => {
            console.log("Attempting to store ApiData for teams\n");
            //Then we send the object to be created in the database 
            this.httpClient.post(`${this.url}/apiData`, apiData, { responseType: 'text' })
            .subscribe({
              next: () => {
                console.log("ApiData for teams was successfully store");
              },
              error: (error) => {
                alert("Failed to create ApiData for teams");
                console.error(error);
              }
            });
            resolve(apiData);
          });
        }
      });

    });
  }


  private async refreshTeams(): Promise<ApiData> {
    console.log("In refresh teams (ApiData)");
    let teamsApiData: ApiData = {flag: "", json: ""};
    teamsApiData = await this.wrapingRefreshTeamsSubscription();
    return teamsApiData;
  }

  async getTeams(): Promise<ApiData> {
    console.log(`In get teams (ApiData)`);
    return await this.refreshTeams();
  }

  getTeam(id: string): Observable<ApiData> {
    return this.httpClient.get<ApiData>(`${this.url}/apiData/teams`);
  }

}