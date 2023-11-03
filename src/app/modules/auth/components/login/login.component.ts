import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/apiService/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private serviceApi:AuthService, private router:Router, private fb: FormBuilder){}

  private email: string = '';

  //public usuario: Usuario | null = null;

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* private contrasenaPattern = /^(?=.*[a-zA-Z]).{6,}$/; */

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
      const check = this.serviceApi.verificarLogin(this.formulario.value.email, this.formulario.value.contrasena);

      if(await check){
        this.router.navigate(['/home']);
      }else{
        alert("Usuario no existe");
        this.email = this.formulario.value.email;

        this.formulario.reset({ email: this.email });

      }
    }catch(error){
      console.log(error);
    }
  }



  /* try {
      let isLogin: boolean = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (isLogin) {
        this.router.navigate(["/main"]);
      }
      else {

        this.email = this.loginForm.value.email;

        this.loginForm.reset({ email: this.email });
      }

    } catch (error) {
      console.log(error);
    }*/

}
