import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData } from 'src/app/apiData';
import { User } from 'src/app/user';
import { ApiDataService } from 'src/app/apiData.service';
import { LoginService } from 'src/app/login-service';
import { UserService } from 'src/app/user.service';
import { TeamService } from 'src/app/team.service';
import { Team } from 'src/app/team';

@Component({
  selector: 'app-follow-teams-list',
  templateUrl: './follow-team.component.html'
})
export class FollowTeam implements OnInit {
  @Input() user: User;
  /*
  @Input() user: User;
  teams$: Observable<ApiData[]> = new Observable();

  constructor(private loginService: LoginService, 
    private apiDataService: ApiDataService) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
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
  */
  teams$: Observable<Team[]> = new Observable();

  constructor(private teamService: TeamService, private loginService: LoginService) { this.user = this.loginService.getUser();}

  ngOnInit(): void {
    this.fetchTeams();
    this.user = this.loginService.getUser();
    this.loginService.loginEvent.subscribe();
  }

  deleteUser(id: string): void {
    this.teamService.deleteUser(id).subscribe({
      next: () => this.fetchTeams()
    });
  }

  addTeam(team: Team) {

    const newFollowTeam = { team_id: team.team_id, user_id: this.user._id}
    
    //alert(newFollowTeam._id);
    alert(newFollowTeam.team_id);
    alert(newFollowTeam.user_id);

    team.team_id = newFollowTeam.team_id;
    // ERROR HERRE
    //team.user_id = newFollowTeam.user_id;

    this.teamService.createTeam(team)
        .subscribe({
          next: () => {
            //this.loginService.login(user);
            //this.router.navigate(['../home']);
          },
          error: (error) => {
            alert("Error");
            alert("Failed to create team");
            console.error(error);
          }
    });

    /*
    this.teamService.checkUser(team)
    .subscribe({
      next: () => {
        //todo: here we need to store user somewhere maybe with cookies or something
        
        alert("This email already has an account associated with it.");
      },
      error: (error) => {
        this.teamService.createUser(team)
        .subscribe({
          next: () => {
            //this.loginService.login(user);
            //this.router.navigate(['../home']);
          },
          error: (error) => {
            alert("Failed to create team");
            console.error(error);
          }
        });
      }
    }); 
    */
  }

  private fetchTeams(): void {
    this.teams$ = this.teamService.getTeams();
  }
}