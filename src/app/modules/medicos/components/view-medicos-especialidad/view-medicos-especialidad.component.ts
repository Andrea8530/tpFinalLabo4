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

  public especialidad : string = ''; //Variable creada para usar en medicoXEspecialidad. segun el numero, un nombre de especialidad

  @Input()
  public medicosEspec: Medico[]=[];
  

  @Output()
  public eventoParaEspecialidad:EventEmitter<number> = new EventEmitter();

  public medicoPorEspecialidad(num:number){
    this.eventoParaEspecialidad.emit(num);
    if(num ==1){
      this.especialidad ="Clinicos";
    }else if(num==2){
      this.especialidad = "Cardiologos"
    }else if(num==3){
      this.especialidad = "Pediatras"
    }else{
      this.especialidad = "Oftalmologos"
    }
  }


  formulario: FormGroup = this.fb.group({
    especialidad: [''],
  })

  
}
