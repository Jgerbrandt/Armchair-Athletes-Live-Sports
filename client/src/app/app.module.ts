import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component'; // <-- add this line

//aaron stuff VVV
import { Home } from './home/home.component';
import { Navbar } from './navbar/navbar.component';
import { Login }  from './navbar/login/login.component';
import { LoginFormComponent } from './navbar/login/login-form.components';
import { LogoutComponent } from './logout/logout.component';
//import { Register } from './navbar/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    Home,
    Navbar,
    Login,
    LoginFormComponent,
    LogoutComponent,
    //Register
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