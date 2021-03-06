import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

import { MainPageComponent } from './main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicEditComponent } from './maintenance/medics/medic-edit.component';
import { MedicCreateComponent } from './maintenance/medics/medic-create.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },

      // Maintenance
      { path: 'users', component: UsersComponent, data: { title: 'Users' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
      { path: 'medics', component: MedicsComponent, data: { title: 'Medics' } },
      { path: 'medics/create', component: MedicCreateComponent, data: { title: 'Create Medic' } },
      { path: 'medics/:id', component: MedicCreateComponent, data: { title: 'Edit Medic' } },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  declarations: [],
})
export class MainPageRoutingModule {
}
