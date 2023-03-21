import { Component, OnInit , Input} from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit{
  @Input() user: User;

  constructor(private loginService: LoginService){
    this.user = this.loginService.getUser();
  }

  ngOnInit(){
    this.user = this.loginService.getUser();
    this.loginService.loginEvent.subscribe();
  }

  // updateText(){
  //   let widget = document.getElementById("wg-api-hockey-standings");
  //   text?.innerHTML 
  // }
}
