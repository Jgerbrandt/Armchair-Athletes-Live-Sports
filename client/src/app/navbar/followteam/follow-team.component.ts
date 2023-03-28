import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiData } from 'src/app/apiData';
import { User } from 'src/app/user';
import { FavTeam } from 'src/app/favTeam';
import { ApiDataService } from 'src/app/apiData.service';
import { LoginService } from 'src/app/login-service';
import { FavTeamService } from 'src/app/favTeam.service';
import { AllTeamData, OneTeamData } from './allTeamData';

@Component({
  selector: 'app-follow-teams-list',
  templateUrl: './follow-team.component.html'
})
export class FollowTeam implements OnInit {
  @Input() user: User;
  teams$: ApiData;
  teamsParsed$: OneTeamData[];

  constructor(
    private router: Router,
    private loginService: LoginService, 
    private apiDataService: ApiDataService,
    private favTeamService: FavTeamService) {
    this.user = this.loginService.getUser();
  }

  async ngOnInit(): Promise<void> {
    console.log("At init for follow team");
    this.teams$ = await this.fetchTeams();
    this.teamsParsed$ = JSON.parse(this.teams$.json).response;
  }

  followTeam(teamID: string): void {
    let newFavTeam: FavTeam = {teamID: teamID, userID: this.user._id};
    console.log(`rq the user id is ${this.user._id}`);

    this.favTeamService.createFavTeam(newFavTeam)
    .subscribe({
      next: () => {
        //this.router.navigate(['../home']);
      },
      error: (error) => {
        alert("Failed to create AMONGUS");
        console.error(error);
      }
    });
  }

  private async fetchTeams(): Promise<ApiData> {
    return await this.apiDataService.getTeams();
  }
}