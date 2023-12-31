import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/apiService/authService/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private authService:AuthService, private router:Router, private fb: FormBuilder){}

  private email: string = '';
  public usuario: Usuario | null = null;

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  formulario: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
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
          return 'Formato de email invalido';
      }
    }
    return null;
  }



  public async ingresar(){

    try{
      let isLogin: boolean = await this.authService.verificarLogin(this.formulario.value.email, this.formulario.value.contrasena);
      
      if(isLogin){        
        if(this.formulario.value.email === 'osde@gmail.com'){          
          this.router.navigate(['/home', 1, true]);
        }else if(this.formulario.value.email === 'ospe@gmail.com'){
          this.router.navigate(['/home', 2, true]);
        }else if(this.formulario.value.email === 'federada@gmail.com'){
          this.router.navigate(['/home', 3, true]);
        }else if(this.formulario.value.email === 'medife@gmail.com'){
          this.router.navigate(['/home', 4, true]);
        }else{
          this.router.navigate(['/landing']);
        }
      }else{
        alert("Usuario no existe");
        this.email = this.formulario.value.email;
        this.formulario.reset({ email: this.email });
      }

    }catch(error){
        console.log(error);
      }
      
  }

  public irARegistrar(){

    this.router.navigate(['auth/register'])

  }

}
