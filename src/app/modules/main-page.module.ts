import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page.component';
import { LayoutModule } from '../shared/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MainPageRoutingModule,
  ],
  exports: [
    DashboardComponent,
    MainPageComponent
  ]
})
export class MainPageModule { }
