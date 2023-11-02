import { iUsuario } from "./interfaces";

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
