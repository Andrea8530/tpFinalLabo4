import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Medico } from 'src/app/core/models';

@Component({
  selector: 'medico-edit-medics',
  templateUrl: './edit-medics.component.html',
  styleUrls: ['./edit-medics.component.css']
})
export class EditMedicsComponent implements OnInit{

  @Input()
  medico:Medico = new Medico();


  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  formulario: FormGroup | undefined;

  private inicializarFormulario(): void {
    
    this.formulario = this.fb.group({
      nombre: [this.medico.nombre, [Validators.required]],
      matricula: [this.medico.matricula, [Validators.required]],
      idEspecialidad: [this.medico.idEspecialidad, [Validators.required, this.validarEspecialidad()]]
    });
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

  getError(field: string): string | null {

    if (!this.formulario!.controls[field]) return null;

    const errors = this.formulario!.controls[field].errors || {};

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
    return this.formulario!.controls[field].errors && this.formulario!.controls[field].touched;
  }


  @Output()
eventoParaEditar:EventEmitter<Medico> = new EventEmitter();

medico2:Medico = new Medico();



public editar(){
  this.medico2.nombre = this.formulario!.value.nombre
  this.medico2.matricula = this.formulario!.value.matricula
  this.medico2.idEspecialidad = this.formulario!.value.idEspecialidad
  this.medico2.id = this.medico.id;
    this.eventoParaEditar.emit(this.medico2)
    this.eventoParaMostrar.emit(false)

  }

  @Output()
eventoParaMostrar:EventEmitter<Boolean> = new EventEmitter();
 public cancelar(){
  this.eventoParaMostrar.emit(false)
  }

}
