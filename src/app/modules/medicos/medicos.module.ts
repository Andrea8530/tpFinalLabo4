import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMedicsComponent } from './components/view-medics/view-medics.component';
import { ViewMedicosEspecialidadComponent } from './components/view-medicos-especialidad/view-medicos-especialidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMedicsComponent } from './components/add-medics/add-medics.component';
import { EditMedicsComponent } from './components/edit-medics/edit-medics.component';


@NgModule({
  declarations: [
    ViewMedicsComponent,
    ViewMedicosEspecialidadComponent,
    AddMedicsComponent,
    EditMedicsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ViewMedicsComponent,
    ViewMedicosEspecialidadComponent,
    AddMedicsComponent,
    EditMedicsComponent
  ]
})
export class MedicosModule { }
