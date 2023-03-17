import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component'; // <-- add this line
import { EditUserComponent } from './edit-user/edit-user.component'; // <-- add this line

//aaron stuff VvVVVV
import { Home } from './home/home.component';
import {Login} from './navbar/login/login.component'
//import { Register } from './navbar/register/register.component';
import { NHLStandings } from './navbar/standings/nhlstandings.component';
import { AHLStandings } from './navbar/standings/ahlstandings.component';
import { NHLGames } from './navbar/nhlgames/nhlgames.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'home/login', component: Login},
  { path: 'home/nhlstandings', component: NHLStandings},
  { path: 'home/ahlstandings', component: AHLStandings},
  { path: 'home/nhlgames', component: NHLGames },

  { path: 'home/register', component: AddUserComponent},
  //aaron stuff^^^^^
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: AddUserComponent }, // <-- add this line
  { path: 'users/edit/:id', component: EditUserComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
