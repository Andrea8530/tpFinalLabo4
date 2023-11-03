import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Usuario } from '../models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private serviceApi:ApiService) { }


  public async verificarLogin(email:string, contrasena:string): Promise<Boolean>{
    let usuario:Usuario[]=[];
    try{
      let respuesta = this.serviceApi.getParaLogueo(email, contrasena);
      usuario = await lastValueFrom(respuesta);
    }catch(error){
      console.log(error);
    }
    return usuario.length == 1;
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

}
