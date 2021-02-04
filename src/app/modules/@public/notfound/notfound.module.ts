import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { AppRoutingModule } from '../../../app-routing.module';



@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class NotfoundModule { }
