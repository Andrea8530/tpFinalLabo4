import { iMedico, iUsuario } from "./interfaces";

export class Usuario implements iUsuario{
  id: number | null = null;
  email: string = '';
  contrasena: string = '';

  constructor(usuario?:any){
      this.id = usuario == undefined ? null : usuario.id;
      this.email = usuario == undefined ? '' : usuario.email;
      this.contrasena = usuario ==undefined ? '' : usuario.contrasena;
  }

}

export class Medico implements iMedico{
  id: number | null = null;
  nombre: string = '';
  matricula: string = '';
  idEspecialidad: number | null = null;

  constructor(medico?:any){
    this.id = medico == undefined ? null : medico.id;
    this.nombre = medico == undefined ? '' : medico.nombre;
    this.matricula = medico == undefined ? '' : medico.matricula;
    this.idEspecialidad = medico == undefined ? null : medico.idEspecialidad;
  }
}


