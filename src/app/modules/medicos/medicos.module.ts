import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMedicsComponent } from './components/view-medics/view-medics.component';
import { ViewMedicosEspecialidadComponent } from './components/view-medicos-especialidad/view-medicos-especialidad.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewMedicsComponent,
    ViewMedicosEspecialidadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ViewMedicsComponent,
    ViewMedicosEspecialidadComponent
  ]
})
export class MedicosModule { }
