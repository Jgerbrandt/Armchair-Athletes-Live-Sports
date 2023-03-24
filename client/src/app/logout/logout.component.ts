import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  logout(): void {
    console.log(location.pathname)
      this.loginService.logout();
      if(location.pathname != '/home'){
        this.router.navigate(['../home']);
      }
      else {
        location.reload();
      }
  }
}
