import { Component, OnInit } from '@angular/core';

declare function getGames():any;

@Component({
  selector: 'app-nhlstandings',
  templateUrl: './nhlgames.component.html', 
  styleUrls: ['./../standings/standings.css'],
})
export class NHLGames implements OnInit {	
  title = "games";

  ngOnInit() : void {
    console.log("test");
    getGames();
  }
}