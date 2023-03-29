import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';

import { Home } from './home/home.component';
import { Login } from './navbar/login/login.component'
import { NHLStandings } from './navbar/standings/nhlstandings.component';
import { AHLStandings } from './navbar/standings/ahlstandings.component';
import { NHLGames } from './navbar/nhlgames/nhlgames.component';
import { AHLGames } from './navbar/ahlgames/ahlgames.component';
import { FollowTeam } from './navbar/followteam/follow-team.component'

//these routes determine what url link extension
//will go to which component and in result which functionality

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'home/login', component: Login},
  { path: 'home/nhlstandings', component: NHLStandings},
  { path: 'home/ahlstandings', component: AHLStandings},
  { path: 'home/nhlgames', component: NHLGames },
  { path: 'home/ahlgames', component: AHLGames },
  { path: 'home/register', component: AddUserComponent},
  { path: 'home/followteam', component: FollowTeam},
  { path: 'users/new', component: AddUserComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
