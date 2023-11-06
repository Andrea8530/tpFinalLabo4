import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Medico } from 'src/app/core/models';

@Component({
  selector: 'app-view-medicos-especialidad',
  templateUrl: './view-medicos-especialidad.component.html',
  styleUrls: ['./view-medicos-especialidad.component.css']
})
export class ViewMedicosEspecialidadComponent {

  constructor(private fb: FormBuilder){}

  @Input()
  public medicosEspec: Medico[]=[];

  @Output()
  public eventoParaEspecialidad:EventEmitter<number> = new EventEmitter();

  public medicoPorEspecialidad(num:number){
    this.eventoParaEspecialidad.emit(num);
  }


  formulario: FormGroup = this.fb.group({
    especialidad: [''],
  })

  
}
