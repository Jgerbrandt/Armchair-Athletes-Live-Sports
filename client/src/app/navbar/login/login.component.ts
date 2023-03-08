import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.css']
})
export class Login{
    //Functions go here
    employeeForm: FormGroup = new FormGroup({});

    submitForm(){
        alert("Hello");
    }
}