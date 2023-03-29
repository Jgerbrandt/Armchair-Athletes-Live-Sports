import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';

import { Home } from './home/home.component';
import { Navbar } from './navbar/navbar.component';
import { Login }  from './navbar/login/login.component';
import { LoginFormComponent } from './navbar/login/login-form.components';
import { FollowTeam } from './navbar/followteam/follow-team.component';

//this file is usedd to add all the working components (classes and functionality)
//to angular's current working modules and is how files are able to work with each other 
//and communicate in the client side


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    AddUserComponent,
    Home,
    Navbar,
    Login,
    LoginFormComponent,
    FollowTeam
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }