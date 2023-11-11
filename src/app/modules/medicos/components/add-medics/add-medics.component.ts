import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/apiService/api.service';
import { Medico, OsporMedico } from 'src/app/core/models';

@Component({
  selector: 'medico-add-medics',
  templateUrl: './add-medics.component.html',
  styleUrls: ['./add-medics.component.css']
})
export class AddMedicsComponent {

  constructor(private router:Router, private serviceApi:ApiService, private fb: FormBuilder){}

  public medico: Medico = new Medico();

  formulario: FormGroup = this.fb.group({
    nombre: new FormControl('',[Validators.required]),
    matricula: new FormControl('',[Validators.required]),
    idEspecialidad: new FormControl('',[Validators.required, this.validarEspecialidad()])
  })

  @Input()
  public numberIdOs: number = 0;

  @Input()
  visible:Boolean = new Boolean();

  boton: Boolean = false;

  @Output()
  public eventoParaRefrescar: EventEmitter<boolean> = new EventEmitter();

  getError(field: string): string | null {

    if (!this.formulario.controls[field]) return null;

    const errors = this.formulario.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido.";
        case 'especialidadInvalida':
          return "Por favor, elija una opción válida de especialidad.";
      }
    }
    return null;
  }
  isValid(field: string): boolean | null {    
    return this.formulario.controls[field].errors && this.formulario.controls[field].touched;
  }

public async verificarMedico(matricula:string):Promise<Medico[]>{
    let medico : Medico[]= [];
    try{
      let respuesta = this.serviceApi.getVerificarMedico(matricula);
      medico = await lastValueFrom(respuesta);
    }catch(error){
      console.log(error);
    }
    return medico;
  }

public medico2 : Medico = new Medico();
public medicoXObraSocial: OsporMedico = new OsporMedico();

  public async agregarMedico(){
    this.medico!.nombre = this.formulario.value.nombre
    this.medico!.matricula = this.formulario.value.matricula
    this.medico!.idEspecialidad = this.formulario.value.idEspecialidad

    try{
      const check = this.verificarMedico(this.formulario.value.matricula);

      if((await check).length>0){
        alert("Este Medico ya existe en la clinica, se agregara a la obra social");

        check.then(resultado =>{
          this.medicoXObraSocial.id_medico =resultado[0].id;
          this.medicoXObraSocial.id_obra_social = this.numberIdOs;
          this.serviceApi.postMedicoAObraSocial(this.medicoXObraSocial).subscribe({
            next: ()=>{
              alert("Se cargo al medico correctamente a la base de datos de la obra social");
              this.formulario.reset();
              this.eventoParaRefrescar.emit();
             },
             error:()=> alert("Hubo un error al querer cargar la medico")
          }) 
        }
        )
     }else{
         this.serviceApi.postMedico(this.medico).subscribe({
          next: (medicoResponse)=>{
          this.medico2 = medicoResponse
          this.medicoXObraSocial.id_medico= this.medico2.id ;
          this.medicoXObraSocial.id_obra_social=this.numberIdOs;
          this.serviceApi.postMedicoAObraSocial(this.medicoXObraSocial).subscribe({
          next: ()=>{
            alert("Se ha cargado al medico correctamente");
            this.formulario.reset();
            this.eventoParaRefrescar.emit();
           },
           error:()=> alert("Hubo un error al querer cargar la medico")
        }) 
           },
           error:()=> alert("Hubo un error al querer cargar la medico")
        }) 
      }

    }catch(error){
      console.log(error);     
    }
  }

  public tocarBoton(){
    this.boton = !this.boton;
  }
  


  validarEspecialidad(): ValidatorFn {
    return (control) => {
      const value = control.value;
      const opcionesValidas = [1, 2, 3, 4]; // Opciones válidas en el datalist

      if (!opcionesValidas.includes(value)) {
        return { especialidadInvalida: true };
      }

      return null;
    };
  }

}
