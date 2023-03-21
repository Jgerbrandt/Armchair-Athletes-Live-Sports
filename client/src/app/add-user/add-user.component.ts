import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService} from '../login-service'

@Component({
  selector: 'app-add-user',
  template: `
    <h2 class="text-center m-5">Register</h2>
    <app-user-form (formSubmitted)="addUser($event)"></app-user-form>
  `
})

export class AddUserComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  addUser(user: User) {
    this.userService.createUser(user)
      .subscribe({
        next: () => {
          this.loginService.login(user);
          this.router.navigate(['../home']);
        },
        error: (error) => {
          alert("Failed to create user");
          console.error(error);
        }
      });
  }
}
