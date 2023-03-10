import { Component, OnInit } from '@angular/core';

declare function getStandings():any;

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html', 
  styleUrls: ['./standings.css'],
})
export class Standings implements OnInit {	
  title = "standings";

  ngOnInit() : void {
    getStandings();
  }
}


