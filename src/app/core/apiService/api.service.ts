import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Especialidad, Medico, OsporMedico, Usuario } from '../models';

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
    return this.http.post<Usuario>(`${this.url}/usuarios`, usuario);
  }

  public getChequeoEmail(email:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/usuarios?email=${email}`);
  }

  /// visualizacion de medicos por obra social

  getMedicosObraSocial(num: number): Observable<Medico[]> {
    return this.http
      .get(`${this.url}/medicos_por_obras_sociales?id_obra_social=${num}`)
      .pipe(
        switchMap((data: any) => {
          const medicoIds = data.map((item: { id_medico: any }) => item.id_medico);
          return this.http.get<Medico[]>(`${this.url}/medicos?id=${medicoIds.join('&id=')}`);
        })
      );
  }

  

  public postMedico(medico : Medico):Observable<Medico>{
    return this.http.post<Medico>(`${this.url}/medicos`,medico);
  }

  public postMedicoAObraSocial(osPorMedico : OsporMedico): Observable<OsporMedico>{
    return this.http.post<OsporMedico>(`${this.url}/medicos_por_obras_sociales`,osPorMedico);
    
  }

  //funcion para verificar que el medico exista o no y en base a eso agregarlo solo a la mutual o en general.
  public getVerificarMedico(matricula: string): Observable<Medico[]>{  
    return this.http.get<Medico[]>(`${this.url}/medicos?matricula=${matricula}`);
  }


  ///para editar medico
  public editMedico(medico:Medico):Observable<Medico>{
    if(!medico.id) throw Error ("El id es requerido");
    return this.http.patch<Medico>(`${this.url}/medicos/${medico.id}`, medico)
  }

  public getChequeoMedico(matricula:string):Observable<Medico[]>{
    return this.http.get<Medico[]>(`${this.url}/medicos?matricula=${matricula}`);
  }

  /// para borrar
  public getidMedicoXobraSocial (idMed:number, idOs:number ):Observable<OsporMedico[]>{
    return this.http.get<OsporMedico[]>(`${this.url}/medicos_por_obras_sociales?id_medico=${idMed}&id_obra_social=${idOs}`)
  }

  public deleteMedicoXobraSocial(id:number):Observable<Boolean>{
    return this.http.delete<Boolean>(`${this.url}/medicos_por_obras_sociales/${id}`)
    .pipe(
      map(res=>true),
      catchError(error => of(false))
      );
  }
  
///para traer las especialidades
  public getEspecialidades():Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>(`${this.url}/Especialidades`)
  }
  

}

