import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/UserObject/user';
import {UserService} from '../../UserObject/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.css']
})
export class Login{
    //Functions go here
    userForm: FormGroup = new FormGroup({});
    @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

    @Output()
    formValuesChanged = new EventEmitter<User>();

    @Output()
    formSubmitted = new EventEmitter<User>();

    
    
    
    ngOnInit() {
      this.initialState.subscribe(user => {
        this.userForm = this.fb.group({
          username: [ user.username],
          password: [ user.password]
        });
      });
      this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    }

    constructor(
     private router: Router,
      private userService: UserService,
      private fb: FormBuilder
    ) { }

    get username() { return this.userForm.get('username')!; }
    get password() { return this.userForm.get('password')!; }

    submitForm(){
      this.userService.getUser(this.userForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert("Failed to create new user");
          alert(this.userForm.value.username);
          console.error(error);
        }
      });
    }
}