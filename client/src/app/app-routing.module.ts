import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component'; // <-- add this line
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line
import { Home } from './home/home.component';
import {Login} from './navbar/login/login.component'
import { Register } from './navbar/register/register.component';
import { NHLStandings } from './navbar/standings/nhlstandings.component';
import { AHLStandings } from './navbar/standings/ahlstandings.component';
import { NHLGames } from './navbar/nhlgames/nhlgames.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'home/login', component: Login},
  { path: 'home/register', component: Register},
  { path: 'home/nhlstandings', component: NHLStandings},
  { path: 'home/ahlstandings', component: AHLStandings},
  { path: 'home/nhlgames', component: NHLGames },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
