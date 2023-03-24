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

    constructor(
      private loginService: LoginService,      
      private router: Router
      ){
      this.user = this.loginService.getUser();
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

