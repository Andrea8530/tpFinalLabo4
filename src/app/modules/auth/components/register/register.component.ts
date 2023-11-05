import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/apiService/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/apiService/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router:Router, private serviceApi:ApiService, private fb: FormBuilder, private serviceAuth:AuthService){}


  //public usuario: Usuario | null = null;

  public usuario:Usuario = new Usuario();

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private contrasenaPattern = /^(?=.*[a-zA-Z]).{6,}$/;

  formulario: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(this.contrasenaPattern)])
  })


  isValid(field: string): boolean | null {
    return this.formulario.controls[field].errors && this.formulario.controls[field].touched;
  }

  getError(field: string): string | null {

    if (!this.formulario.controls[field]) return null;

    const errors = this.formulario.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido.";
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'pattern':
          return 'Formato invalido';
      }
    }
    return null;
  }



   public async registrar(){
    this.usuario!.contrasena =  this.formulario.value.contrasena
     this.usuario!.email =  this.formulario.value.email

    try{
      const check = this.serviceAuth.verificarUsuario(this.formulario.value.email);
      console.log(check);


      if(await check){
        alert("Este usuario ya existe, Elija otro");
        this.formulario.reset();

      }else{


        this.serviceApi.postUsuarios(this.usuario).subscribe({
          next: ()=>{
           alert("Se registro con exito el usuario");
           this.router.navigate(['auth'])
          },
          error:()=> alert("Hubo un error al registrar")
       })

      }
    }catch(error){
      console.log(error);
    }
  }




}


