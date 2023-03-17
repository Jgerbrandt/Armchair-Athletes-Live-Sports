import { Component, OnInit } from '@angular/core';

declare function getStandings():any;

@Component({
  selector: 'app-ahlstandings',
  templateUrl: './ahlstandings.component.html', 
  styleUrls: ['./standings.css'],
})
export class AHLStandings implements OnInit {	
  title = "standings";

  ngOnInit() : void {
    getStandings();
  }
}


