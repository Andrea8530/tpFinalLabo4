import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Medico } from 'src/app/core/models';

@Component({
  selector: 'medico-view-medicos-especialidad',
  templateUrl: './view-medicos-especialidad.component.html',
  styleUrls: ['./view-medicos-especialidad.component.css']
})
export class ViewMedicosEspecialidadComponent {

  constructor(private fb: FormBuilder){}

  public especialidad : string = ''; //Variable creada para usar en medicoXEspecialidad. segun el numero, un nombre de especialidad
  public verEspecialidad: boolean = false;

  @Input()
  public medicosEspec: Medico[]=[];

  @Input()
  visible:Boolean = new Boolean();
  
  @Input()
  public medicos : Medico[] = [];

  @Output()
  public eventoParaEspecialidad:EventEmitter<number> = new EventEmitter();



  public medicoPorEspecialidad(num:number){
   
    if(num ==1){
      this.especialidad ="Clinicos";
    }else if(num==2){
      this.especialidad = "Cardiologos"
    }else if(num==3){
      this.especialidad = "Pediatras"
    }else{
      this.especialidad = "Oftalmologos"
    }

    this.activarListado = true;
    this.verEspecialidad=false;
    this.eventoParaEspecialidad.emit(num);
  }


  formulario: FormGroup = this.fb.group({
    especialidad: [''],
  })


  /////

  public activarListado: boolean = false;

  @Output() clicEnComponenteA = new EventEmitter<void>();

    onClic() {
      this.clicEnComponenteA.emit();
    }


    public BorrarFiltros(){
      this.clicEnComponenteA.emit();
      this.verEspecialidad =true;
      this.medicosEspec =[];
      this.activarListado=false;
    }


}
