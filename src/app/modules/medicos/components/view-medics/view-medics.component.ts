
import { Component, Input } from '@angular/core';
import { Medico } from 'src/app/core/models';

@Component({
  selector: 'app-view-medics',
  templateUrl: './view-medics.component.html',
  styleUrls: ['./view-medics.component.css']
})
export class ViewMedicsComponent{
  

  constructor( ) {}

  @Input()
  medicos: Medico[]=[];

  

  


}