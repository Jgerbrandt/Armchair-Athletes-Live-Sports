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
  private url = 'https://armchair-athletes-live-sports-s-ofsyvtifhq-uc.a.run.app';
  //private url = 'http://localhost:5200';
  private teamsJson$: ApiData;

  //currently we are only using NHL teams in the current 2022 season
  //later versions are scalable to include other leagues and other seasons
  private league = 57; //nhl
  private season = 2022; //current season


  constructor(private httpClient: HttpClient, private api: apiController) { }


  //this function is created to get the teams API data from the database if possible
  //this is done to reduce the number of api calls as they are limited and slow
  //if the data is not already stored or if it is too old and stale, the client side
  //will make an api call to get the data, and then send an updated json text to the db
  //so it will have the latest information for the next user to make this call
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
                //failed to create API data for Teams
              }
            });
            resolve(apiData);
          });
        }
      });

    });
  }

  //this function is called before we print the teams out to ensure 
  //all the lasted information is being displayed
  private async refreshTeams(): Promise<ApiData> {
    //first create a default API data object that is fully empty
    let teamsApiData: ApiData = {flag: "", json: ""};
    //here we send it to the function that will get the teams data from either
    //local db (if avaliable) or get it from the API which will refresh the 
    //db for future calls
    teamsApiData = await this.wrapingRefreshTeamsSubscription();
    return teamsApiData;
  }

  async getTeams(): Promise<ApiData> {
    //here we are simply returning the teams after getting the 
    //latest version referesed
    return await this.refreshTeams();
  }
}