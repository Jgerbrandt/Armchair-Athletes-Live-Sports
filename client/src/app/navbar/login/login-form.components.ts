import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user';

@Component({
  selector: 'login-form',
  template: `
    <div style="">
    <form class="user-form" autocomplete="off" [formGroup]="userForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="email" formControlName="email" placeholder="email@example.com" required>
        <label for="email">Email</label>
      </div>

      <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
        <div *ngIf="email.errors?.['required']">
          An Email is required.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="password" formControlName="password" placeholder="Password" required>
        <label for="password">Password</label>
      </div>

      <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
        <div *ngIf="password.errors?.['required']">
          A Password is required.
        </div>
      </div>

      <button style="position:center;"class="btn btn-primary" type="submit" [disabled]="userForm.invalid">Login</button>
    </form>
    </div>
  `,
  styles: [
    `.user-form {
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class LoginFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get email() { return this.userForm.get('email')!; }
  get password() { return this.userForm.get('password')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.userForm = this.fb.group({
        email: [ user.email, [Validators.required]],
        password: [ user.password, [ Validators.required] ]
      });
    });

    this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.userForm.value);
  }
}
