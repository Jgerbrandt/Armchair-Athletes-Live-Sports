import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md" style="padding:1rem;
  background: rgb(163,163,172);
  background: radial-gradient(circle, rgba(163,163,172,1) 0%, rgba(86,87,95,1) 93%);
  height:100hw;width:100vw;min-height:100vh;min-width:100vw">
  
  <button [routerLink]="['home/']"
  style="
  display:flex;
  justify-content: center;
  margin-left: 25%;
  background: transparent;
  border:none;
  ">
  <h1>
  
  Armchair Athletes Live Sports Results</h1></button>
  
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }
