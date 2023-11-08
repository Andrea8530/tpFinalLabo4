import { iMedico, iUsuario, ioSporMedico } from "./interfaces";

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

export class OsporMedico implements ioSporMedico{
  id: number | null = null;
  id_medico: number | null = null;
  id_obra_social: number | null = null;

  constructor(osPorMedico?:any){
    this.id = osPorMedico == undefined ? null : osPorMedico.id;
    this.id_medico = osPorMedico == undefined ? null : osPorMedico.id_medico;
    this.id_obra_social = osPorMedico == undefined ? null : osPorMedico.id_obra_social;
  }
  
}

