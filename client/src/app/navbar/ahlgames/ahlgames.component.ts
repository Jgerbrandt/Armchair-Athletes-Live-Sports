import { Component, OnInit } from '@angular/core';

declare function getGames():any;

@Component({
  selector: 'app-ahlstandings',
  templateUrl: './ahlgames.component.html', 
  styleUrls: ['./../standings/standings.css'],
})
export class AHLGames implements OnInit {	
  title = "games";

  ngOnInit() : void {
    if(document.getElementById("wg-api-hockey-games")?.getAttribute("data-date") === ""){
      var today = this.getToday();
      document.getElementById("wg-api-hockey-games")?.setAttribute("data-date", today);
    }
    getGames();
  }

  getToday(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }
}
