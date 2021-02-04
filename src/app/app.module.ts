import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/@public/auth/login/login.component';
import { RegisterComponent } from './modules/@public/auth/register/register.component';
import { NotfoundComponent } from './modules/@public/notfound/notfound.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BreadcrumbComponent } from './shared/layout/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MainPageComponent } from './modules/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DashboardComponent,
    BreadcrumbComponent,
    SidebarComponent,
    HeaderComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
