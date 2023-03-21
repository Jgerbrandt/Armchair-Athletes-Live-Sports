import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/team';
import { TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-follow-teams-list',
  templateUrl: './follow-team.component.html'
})
export class FollowTeam implements OnInit {
  teams$: Observable<Team[]> = new Observable();

  constructor(private teamsService: TeamService) { }

  ngOnInit(): void {
    this.fetchTeams();
  }

  followTeam(id: string): void {
    this.teamsService.followTeam(id).subscribe({
      next: () => this.fetchTeams()
    });
  }

  private fetchTeams(): void {
    this.teams$ = this.teamsService.getTeams();
  }

  addTeam(team: Team) {
    this.teamsService.createTeam(team)
    .subscribe({
      next: () => {
        alert("goodTeam");
      },
      error: (error) => {
        alert("badTeam");
      }
    }); 
  }
}