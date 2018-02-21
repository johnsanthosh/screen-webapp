import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ScreenService} from './screen.service';
import {HeaderComponent} from './header/header.component';
import {ScreenComponent} from './screen/screen.component';
import {RouterModule, Routes} from '@angular/router';
import { PageComponent } from './page/page.component';
import {MessageService} from './message.service';

const routes: Routes = [
  {
    path: 'screens',
    component: PageComponent
  },
  {
    path: 'screens/:id',
    component: PageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScreenComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {})
  ],
  providers: [ScreenService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
