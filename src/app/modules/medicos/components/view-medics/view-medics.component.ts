
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medico } from 'src/app/core/models';

@Component({
  selector: 'medico-view-medics',
  templateUrl: './view-medics.component.html',
  styleUrls: ['./view-medics.component.css']
})
export class ViewMedicsComponent{
  

  constructor( ) {}

  @Input()
  visible:Boolean = new Boolean();

  @Input()
  medicos: Medico[]=[];


  @Output()
  eventoParaBorrar:EventEmitter<number> = new EventEmitter();
  
    borrar(id:number){
      this.eventoParaBorrar.emit(id);
    }
  
  
  

  


}