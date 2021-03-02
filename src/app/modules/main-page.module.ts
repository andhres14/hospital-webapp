import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../shared/layout/layout.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PipesModule } from '../shared/pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { ModalImageComponent } from './@private/modal-image/modal-image.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicCreateComponent } from './maintenance/medics/medic-create.component';
import { MedicEditComponent } from './maintenance/medics/medic-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    ModalImageComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicCreateComponent,
    MedicEditComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    MainPageComponent,
    AccountSettingsComponent,
    ModalImageComponent
  ]
})
export class MainPageModule {
}
