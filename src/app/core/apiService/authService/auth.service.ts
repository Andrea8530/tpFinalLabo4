import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Usuario } from '../../models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*Para lograr implementar el token y los guards*/
private user: Usuario | null | undefined = null;
public estaLogueado: boolean = false;

  constructor(private serviceApi:ApiService) { }

  /*Para lograr implementar el token y los guards*/

  get currentUser():Usuario|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  public async verificarLogin(email:string, contrasena:string): Promise<boolean>{
    let usuario:Usuario[]=[];

    let isLogin=false; ///Para guard
    try{
      let respuesta = this.serviceApi.getParaLogueo(email, contrasena);
      usuario = await lastValueFrom(respuesta);
    this.user = usuario[0]; ///Para guard

    if(this.user){ ///Para guard
    localStorage.setItem('token', this.user.id!.toString()); ///Para guard    
    isLogin = true;
    this.estaLogueado = true;
    }

    }catch(error){
      console.log(error);
    }
    
    return isLogin;
  }

  public async verificarUsuario(email:string): Promise<Boolean>{
    let usuario:Usuario[]=[];
    try{
      let respuesta = this.serviceApi.getChequeoEmail(email);
      usuario = await lastValueFrom(respuesta);
    }catch(error){
      console.log(error);
    }
    return usuario.length == 1;
  }

  /*Para lograr implementar el token y los guards*/

  public logout(){
    this.user = undefined;
    this.estaLogueado=false;
    localStorage.clear();
  }

  public checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }

}
