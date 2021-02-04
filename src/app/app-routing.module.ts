import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { MainPageRoutingModule } from './modules/main-page-routing.module';
import { AuthRoutingModule } from './modules/@public/auth/auth-routing.module';

import { NotfoundComponent } from './modules/@public/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainPageRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
