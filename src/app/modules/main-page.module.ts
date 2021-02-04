import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../shared/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MainPageRoutingModule,
  ],
  exports: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent
  ]
})
export class MainPageModule { }
