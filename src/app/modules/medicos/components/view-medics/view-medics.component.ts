
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad, Medico } from 'src/app/core/models';

@Component({
  selector: 'medico-view-medics',
  templateUrl: './view-medics.component.html',
  styleUrls: ['./view-medics.component.css']
})
export class ViewMedicsComponent{
  

  constructor() {}

  @Input()
  visible:Boolean = new Boolean();

  @Input()
  medicos: Medico[]=[];

///evento para borrar
  @Output()
  eventoParaBorrar:EventEmitter<number> = new EventEmitter();
  
  public  borrar(id:number){
      this.eventoParaBorrar.emit(id);
    }
 
  //// para editar
  @Output()
  eventoParaEditar:EventEmitter<Medico> = new EventEmitter();

  public editar(doctor:Medico){
    this.eventoParaEditar.emit(doctor);
  }

  ///para traer especialidades y mostrarlas

  @Input()
  especialidad:Especialidad[]=[];

  especialidadNombre(id: number): string {
    
    const especialidad = this.especialidad.find(e => e.idEspecialidad === id);
    return especialidad ? especialidad.nombre : 'Sin Especificar';
  }

}