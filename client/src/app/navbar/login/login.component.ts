import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})


export class Login{
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  checkUser(user: User) {
    this.userService.checkUser(user)
      .subscribe({
        next: () => {
          //todo: here we need to store user somewhere maybe with cookies or something
          alert("Welcome back");
          this.router.navigate(['../home']);
        },
        error: (error) => {
          alert("Incorrect Email or Password");
          console.error(error);
        }
      });
  }

  //Functions go here
  employeeForm: FormGroup = new FormGroup({});

  submitForm(){
    //not sure what this is for..
  }
}