import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md" style="padding:1rem;
  
  background: rgb(233, 248, 249);
  /*background: radial-gradient(circle, rgba(163,163,172,1) 0%, rgba(86,87,95,1) 93%);*/
  height:100hw;width:100vw;min-height:100vh;min-width:100vw"
  >

  <div style="display: flex; 
  flex-direction: row;">
  <img src="/assets/media/logo.png"
  style="
    height:5rem;
    width:5rem;
    padding-bottom: 5px;
  ">
  

  <button [routerLink]="['home/']"
  style="
  display: block;
  width: 624px;
  margin: 0 auto;
  justify-content: center;
  background: transparent;
  border: none;
  font-family : Impact;
  ">

  <h1> Armchair Athletes Live Sports Results</h1></button>
  </div>
    <router-outlet></router-outlet>
    
  </div>
  `
})
export class AppComponent { }
