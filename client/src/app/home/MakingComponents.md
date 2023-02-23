1. New folder for each new component 
        Nestest Files OK (Ex. /navbar/login)

2. Structure for new component:
----------------------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-COMPONENT_NAME',
  template: `
    <div>
        HTML
    </div>
    `
})
export class Home{
    //Functions go here
}
--------------------------------

3. Add Component to app.module.ts 

4. If routing is needed, add Componet to app-routing.module.ts