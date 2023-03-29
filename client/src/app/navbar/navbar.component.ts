import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { LoginService } from '../login-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.css']
})
export class Navbar {
  @Input() user: User;
  gameClicked: boolean;
  standingsClicked: boolean;

    constructor(
      private loginService: LoginService,      
      private router: Router
      ){
      this.user = this.loginService.getUser();
      this.gameClicked = false;
      this.standingsClicked = false;
    }

    clickGames(){
      if(this.gameClicked){
        this.gameClicked = false;
      }
      else{
        this.gameClicked = true;
        this.standingsClicked = false;
      }
    }

    clickStandings(){
      if(this.standingsClicked){
        this.standingsClicked = false;
      }
      else{
        this.gameClicked = false;
        this.standingsClicked = true;
      }
    }

    logout(): void {
      if(this.loginService.getUser()._id != '-1'){
        this.loginService.logout();
        if(location.pathname != '/home'){
          this.router.navigate(['../home']);
        }
        else {
          location.reload();
        }
      }
      else{
        return;
      }
    }
}

