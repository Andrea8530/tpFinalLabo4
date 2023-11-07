import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MedicosModule } from '../medicos/medicos.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MedicosModule,
    SharedModule
  ]
})
export class MainModule { }
