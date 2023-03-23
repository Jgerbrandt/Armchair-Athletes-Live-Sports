import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/apiData';
import { User } from 'src/app/user';
import { ApiDataService } from 'src/app/apiData.service';
import { LoginService } from 'src/app/login-service';
import { AllTeamData,OneTeamData } from './allTeamData';

@Component({
  selector: 'app-follow-teams-list',
  templateUrl: './follow-team.component.html'
})
export class FollowTeam implements OnInit {
  @Input() user: User;
  teams$: ApiData;
  teamsParsed$: OneTeamData[];

  constructor(private loginService: LoginService, 
    private apiDataService: ApiDataService) {
    this.user = this.loginService.getUser();
  }

  async ngOnInit(): Promise<void> {
    console.log("At init for follow team");
    this.teams$ = await this.fetchTeams();
    this.teamsParsed$ = JSON.parse(this.teams$.json).response;
  }

  followTeam(id: string): void {
    console.log(`team idea selected is ${id}`);
  }

  private async fetchTeams(): Promise<ApiData> {
    return await this.apiDataService.getTeams();
  }
}