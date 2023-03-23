import { Component, OnInit , Input} from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login-service';
import { apiController } from '../apiController/apiController';
import { TeamData } from '../apiController/teamData';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SchedData } from '../apiController/schedData';

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
  schedData: SchedData;
  //api: apiController;


  constructor(
    private loginService: LoginService,
    private api: apiController,
    
    ){
    this.user = this.loginService.getUser();
    this.favTeam = 675;
    //this.api = new apiController();

    this.favTeamData = api.getDefaultTeam();
    this.schedData = api.getDefaultSched();
        
}


  ngOnInit(){
    this.user = this.loginService.getUser();
    this.loginService.loginEvent.subscribe();
    //Logic here to set users favorite team
    if(this.user._id != '-1'){
      let temp: Promise<TeamData>;
    temp = this.api.makeTeamCall(this.league, this.season, this.favTeam);
    temp.then((data) => {this.favTeamData = data})
    let tempSched: Promise<SchedData>;
    tempSched = this.api.makeSchedCall(this.league, this.season, this.favTeam);
    tempSched.then((data) => {this.schedData = data; data.response.reverse()})
    .then((sliced) => {this.schedData.response.forEach((game, i) => {this.schedData.response[i].date = new Date(Date.parse(game.date)).toString().substring(0, 21)})})
    }
    
    



    //alert("Home: "+ teamData);
      //this.favTeamData = this.api.makeCall("teams?id="+this.favTeam);
    //alert(this.api.makeCall("teams?id="+this.favTeam));
     // alert(teamData);
    
  }

  // updateText(){
  //   let widget = document.getElementById("wg-api-hockey-standings");
  //   text?.innerHTML 
  // }
}
