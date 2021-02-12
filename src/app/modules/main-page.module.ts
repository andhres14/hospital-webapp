import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../shared/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MainPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent
  ]
})
export class MainPageModule { }
