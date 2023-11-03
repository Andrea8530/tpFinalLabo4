import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url:string = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

//para hacer login
  public getParaLogueo(email:string, contrasena:string ):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/usuarios?email=${email}&contrasena=${contrasena}`);
  }

//para crear usuario nueve
  public postUsuarios(usuario:Usuario):Observable<Usuario>{
    console.log(usuario, 'hola');

    return this.http.post<Usuario>(`${this.url}/usuarios`, usuario);
  }

  public getChequeoEmail(email:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/usuarios?email=${email}`);
  }

}
