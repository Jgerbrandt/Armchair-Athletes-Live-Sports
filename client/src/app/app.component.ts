import { Component } from '@angular/core';

//here we are defining default appearance and functionality of 
//the app's commponents (which is how we are able to show the header
//on every page)

@Component({
  selector: 'app-root',
  templateUrl: './app-global/app-global-component.html',
    styleUrls: ['./app-global/app-global-component.css']
})

export class AppComponent { }
