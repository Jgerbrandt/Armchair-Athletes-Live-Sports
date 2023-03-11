import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line
import { Home } from './home/home.component';
import { Navbar } from './navbar/navbar.component';
import { Login }  from './navbar/login/login.component';
import { Register } from './navbar/register/register.component';
import { NHLStandings } from './navbar/standings/nhlstandings.component';
import { AHLStandings } from './navbar/standings/ahlstandings.component';
import { NHLGames } from './navbar/nhlgames/nhlgames.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    Home,
    Navbar,
    Login,
    Register,
    NHLStandings,
    AHLStandings,
    NHLGames
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // <-- add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
