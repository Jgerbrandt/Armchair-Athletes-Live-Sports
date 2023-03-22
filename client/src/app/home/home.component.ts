import { Component, OnInit , Input} from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login-service';
import { apiController } from '../apiController/apiController';
import { TeamData } from '../apiController/teamData';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit{
  @Input() user: User;
  favTeam: number;
  season: number = 2022;
  league: number = 57;
  favTeamData: TeamData;
  //api: apiController;

  constructor(
    private loginService: LoginService,
    private api: apiController
    ){
    this.user = this.loginService.getUser();
    this.favTeam = 675;
    //this.api = new apiController();

    this.favTeamData = {
        get: "string",
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
                name: "string",
                logo: "string"
                },
            games: {
                played: {
                home: -1,
                away: -1,
                all: -1
                },
            wins: {
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
                    all: -1
                    },
                    average: {
                    home: "string",
                    away: "string",
                    all: "string"
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

  ngOnInit(){
    this.user = this.loginService.getUser();
    this.loginService.loginEvent.subscribe();
    //Logic here to set users favorite team
    if(this.user._id != '-1'){
      let temp: Promise<TeamData>;
    temp = this.api.makeCall(this.league, this.season, this.favTeam);
    temp.then((data) => {this.favTeamData = data})



    //alert("Home: "+ teamData);
      //this.favTeamData = this.api.makeCall("teams?id="+this.favTeam);
    //alert(this.api.makeCall("teams?id="+this.favTeam));
     // alert(teamData);
    }
  }

  // updateText(){
  //   let widget = document.getElementById("wg-api-hockey-standings");
  //   text?.innerHTML 
  // }
}
