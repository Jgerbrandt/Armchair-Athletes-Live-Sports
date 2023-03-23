import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/apiData';
import { User } from 'src/app/user';
import { ApiDataService } from 'src/app/apiData.service';
import { LoginService } from 'src/app/login-service';

@Component({
  selector: 'app-follow-teams-list',
  templateUrl: './follow-team.component.html'
})
export class FollowTeam implements OnInit {
  @Input() user: User;
  teams$: ApiData;

  constructor(private loginService: LoginService, 
    private apiDataService: ApiDataService) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    console.log("at init");
    this.fetchTeams();
  }

  followTeam(id: string): void {
    


    // this.apiDataService.followTeam(id).subscribe({
    //   next: () => this.fetchTeams()
    // });
  }

  private fetchTeams(): void {
    this.teams$ = this.apiDataService.getTeams();
  }
}