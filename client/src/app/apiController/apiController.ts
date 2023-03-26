import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SchedData } from "./schedData";
import { TeamData } from "./teamData";


@Injectable({providedIn:'root'})
export class apiController{
private myHeaders;
private requestOptions: {};
private returnData: TeamData;
private schedData!: SchedData;
// myHeaders.append("x-rapidapi-key", "XxXxXxXxXxXxXxXxXxXxXxXx");
// myHeaders.append("x-rapidapi-host", "v1.hockey.api-sports.io");


constructor(
  private httpClient: HttpClient,
){
  this.myHeaders = new Headers();
  this.myHeaders.append("x-rapidapi-key", "8bab09f0208287f1fe343c5e65a9994f");
  this.myHeaders.append("x-rapidapi-host", "v1.hockey.api-sports.io");
  this.requestOptions = {
    method: 'GET',
    headers: this.myHeaders,
    redirect: 'follow'
  }
  this.returnData = {get: "string",
        parameter: {
          team: "string",
          league: "string",
          season: "string"
          },
        errors: ["string"],
        results: -1,
        response: {
            country: {
                id: -1,
                name: "string",
                code: "string",
                flag: "String"
                },
            league: {
                id: -1,
                name: "string",
                type: "string",
                logo: "string",
                season: -1
                },
            team: {
                id: -1,
                name: "Loading...",
                logo: "Loading..."
                },
            games: {
                played: {
                home: 0,
                away: 0,
                all: 0
                },
            wins: {
                home: {
                    total: -1,
                    percentage: "Loading..."
                    },
                away: {
                    total: -1,
                    percentage: "Loading..."
                    },
                all: {
                    total: 0,
                    percentage: "Loading..."
                    }
            },
            loses: {
                home: {
                    total: -1,
                    percentage: "string"
                    },
                away: {
                    total: -1,
                    percentage: "string"
                    },
                all: {
                    total: -1,
                    percentage: "string"
                    }
                }
            },
            goals: {
                for: {
                    total: {
                    home: -1,
                    away: -1,
                    all: 0
                    },
                    average: {
                    home: "string",
                    away: "string",
                    all: "Loading..."
                    }
                    },
                against: {
                    total: {
                    home: -1,
                    away: -1,
                    all: -1
                    },
                    average: {
                     home: "string",
                    away: "string",
                    all: "string"
                    }
                    }
                }
            }
          }
          
}

getDefaultTeam(){
    return this.returnData;
}

getDefaultSched(){
    return this.schedData;
}

async makeSchedCall(league: number, season: number, team:number){
    return await fetch("https://v1.hockey.api-sports.io/games?league="+league+"&season="+season+"&team="+team, this.requestOptions)
  .then(response => response.text())
  .then(result => {this.schedData = JSON.parse(result);})
  .then(returnVal => {return this.schedData;})
  .catch(error => {alert(error); return this.schedData});
}

  async makeTeamCall(league: number, season: number, team: number){
    // let returnObj: TeamData;
    // returnObj = {};

    // let favTeamData$: Observable<TeamData> = new Observable();
    // favTeamData$ = this.httpClient.get<TeamData>("https://v1.hockey.api-sports.io/" + endpoint, this.requestOptions);

    // favTeamData$.forEach(value => {value.errors.forEach(err => alert(err))});
    // favTeamData$.forEach(value => {alert(value.results)});
    // return favTeamData$;


  return await fetch("https://v1.hockey.api-sports.io/teams/statistics?season="+season+"&team="+team+"&league="+league, this.requestOptions)
  .then(response => response.text())
  .then(result => {this.returnData = JSON.parse(result)})
  .then(parsed => {return this.returnData;})
  .catch(error => {alert(error); return this.returnData;});
  //return this.returnData;
  }
  
  
  




}


// fetch("https://v1.hockey.api-sports.io/{endpoint}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));