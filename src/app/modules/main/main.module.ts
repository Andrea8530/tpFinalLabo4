import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MedicosModule } from '../medicos/medicos.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnviarRecetasComponent } from './components/recetas/enviarRecetas/enviarRecetas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MailComponent } from './components/mail/mail.component';


@NgModule({
  declarations: [
    HomePageComponent,
    EnviarRecetasComponent,
    MailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MedicosModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
