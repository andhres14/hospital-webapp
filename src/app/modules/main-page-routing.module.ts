import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainPageComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'account-settings', component: AccountSettingsComponent }
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
