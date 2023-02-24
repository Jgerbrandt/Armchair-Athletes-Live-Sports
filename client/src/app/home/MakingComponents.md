1. New folder for each new component 
        Nestest Files OK (Ex. /navbar/login)
        Each folder: typescript, html, css

2. Structure for new component typescript:
----------------------------------------
import { Component } from '@angular/core';
//Replace NAME with component name
@Component({
  selector: 'app-NAME',
  templateUrl: './NAME.component.html', 
  styleUrls: ['./NAME.component.css']
})
export class NAME{
    //Functions go here
}
--------------------------------

3. Add Component to app.module.ts 

4. If routing is needed, add Componet to app-routing.module.ts