import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.css']
})
export class Register{
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

    // submitForm(){
    //   console.log("test 1");
    //   this.formSubmitted.emit(this.userForm.value);
    //   this.userService.createUser(this.userForm.value)
    //   .subscribe({
    //     next: () => {
    //       this.router.navigate(['/home']);
    //     },
    //     error: (error) => {
    //       console.log("test in error");
    //       alert("Failed to create new user");
    //       alert(this.userForm.value.username);
    //       console.error(error);
    //     }
    //   });
    //   console.log("test 2");
    // }

    addUser(user: User) {
      console.log("test1");
      this.userService.createUser(user)
        .subscribe({
          next: () => {
            console.log("success");
            this.router.navigate(['/home']);
          },
          error: (error) => {
            alert("Failed to create user");
            console.log("in error");
            console.error(error);
          }
        });
        console.log("test2");
    }
}