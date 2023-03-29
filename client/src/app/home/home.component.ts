import { Component, OnInit , Input} from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login-service';
import { apiController } from '../apiController/apiController';
import { TeamData } from '../apiController/teamData';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SchedData } from '../apiController/schedData';
import { FavTeam } from '../favTeam';
import { FavTeamService } from '../favTeam.service';

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

  constructor(
    private loginService: LoginService,
    private api: apiController,
    private teamService: FavTeamService
    
    ){
    this.user = this.loginService.getUser();
    this.favTeam = -1;

    this.favTeamData = api.getDefaultTeam();
    this.schedData = api.getDefaultSched();
        
}

  ngOnInit(){
    this.user = this.loginService.getUser();
    this.loginService.loginEvent.subscribe();
    //Logic here to set users favorite team
    if(this.user._id != '-1'){
      let temp: Promise<TeamData>;
    this.teamService.getFavTeam(this.user._id)
    .subscribe({
      next: 
      (response)=> {this.favTeam = response.teamID;

    temp = this.api.makeTeamCall(this.league, this.season, this.favTeam);
    temp.then((data) => {this.favTeamData = data})
    let tempSched: Promise<SchedData>;
    tempSched = this.api.makeSchedCall(this.league, this.season, this.favTeam);
    tempSched.then((data) => {this.schedData = data; data.response.reverse()})
    .then((sliced) => {this.schedData.response.forEach((game, i) => {this.schedData.response[i].date = new Date(Date.parse(game.date)).toString().substring(0, 21)})})
      }})
    }
  }
}
