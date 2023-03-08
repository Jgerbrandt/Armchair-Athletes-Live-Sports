import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  template: `
    <h2 class="text-center m-5">Add a New Employee</h2>
    <app-employee-form (formSubmitted)="addEmployee($event)"></app-employee-form>
  `
})

export class AddEmployeeComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  addEmployee(employee: Employee) {
    console.log("test1");
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          console.log("success");
          this.router.navigate(['../home']);
        },
        error: (error) => {
          alert("Failed to create employee");
          console.error(error);
          console.log("error");
        }
      });
      console.log("test2");
  }
}
