import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MainPage} from "./modules/main/MainPage";
import {Navigator} from "./modules/main/navigator/Navigator";
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MyApp} from "./MyApp";

const appRoutes: Routes = [
    { path: '', component: MyApp },
    // { path: '', component: MainPage },
    // { path: 'navigator', component: Navigator },

];

@NgModule({
  imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),

  ],
  declarations: [
      MyApp,
      MainPage,
      // Navigator,

  ],
  bootstrap: [
      MyApp,
      MainPage,
      // Navigator,

  ],
    providers: [
        {provide: APP_BASE_HREF, useValue : '/' }

    ]
})
export class AppModule {

}
