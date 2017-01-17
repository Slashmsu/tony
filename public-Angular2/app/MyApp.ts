import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    
  <main-page>Loading AppComponent content here ...</main-page>
    <router-outlet></router-outlet>
`,
})
export class MyApp  {

  constructor () {
  }

}
