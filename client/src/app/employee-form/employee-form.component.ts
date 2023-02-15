import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  template: `
    <form class="employee-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="name" required>
        <label for="name">Username</label>
      </div>

      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Username is required.
        </div>
        <div *ngIf="name.errors?.['minlength']">
          Username must be at least 3 characters long.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
        <label for="position">Password</label>
      </div>

      <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">

        <div *ngIf="position.errors?.['required']">
          Password is required.
        </div>
        <div *ngIf="position.errors?.['minlength']">
          Password must be at least 5 characters long.
        </div>
      </div>


      <button class="btn btn-primary" type="submit" [disabled]="employeeForm.invalid">Add</button>
    </form>
  `,
  styles: [
    `.employee-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class EmployeeFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Employee>();

  @Output()
  formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() { return this.employeeForm.get('name')!; }
  get position() { return this.employeeForm.get('position')!; }
  //get level() { return this.employeeForm.get('level')!; }
  get level() { return 'monkey'; }

  ngOnInit() {
    this.initialState.subscribe(employee => {
      this.employeeForm = this.fb.group({
        name: [ employee.name, [Validators.required] ],
        position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ 'junior' ]
      });
    });

    this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
