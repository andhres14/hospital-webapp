import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainPageModule } from './modules/main-page.module';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/@public/auth/auth.module';
import { NotfoundModule } from './modules/@public/notfound/notfound.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    AuthModule,
    NotfoundModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
