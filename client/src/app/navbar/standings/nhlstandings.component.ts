import { Component, OnInit } from '@angular/core';

declare function getStandings():any;

@Component({
  selector: 'app-nhlstandings',
  templateUrl: './nhlstandings.component.html', 
  styleUrls: ['./standings.css'],
})
export class NHLStandings implements OnInit {	
  title = "standings";

  ngOnInit() : void {
    getStandings();
  }
}


