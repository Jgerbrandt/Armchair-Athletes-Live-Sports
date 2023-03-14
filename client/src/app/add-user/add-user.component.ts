import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  template: `
    <h2 class="text-center m-5">Add a New User</h2>
    <app-user-form (formSubmitted)="addUser($event)"></app-user-form>
  `
})

export class AddUserComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  addUser(user: User) {
    this.userService.createUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['../home']);
        },
        error: (error) => {
          alert("Failed to create user");
          console.error(error);
        }
      });
  }
}
