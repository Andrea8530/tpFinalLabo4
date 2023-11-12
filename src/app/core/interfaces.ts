import{Usuario} from "./models";

export interface iUsuario{
  id: number | null,
  email: string,
  contrasena: string
}

export interface iMedico{
  id: number | null,
  nombre: string,
  matricula: string,
  idEspecialidad: number | null
}

export interface ioSporMedico{
  id: number | null,
  id_medico: number | null,
  id_obra_social: number | null,
}


export interface iEspecialidad{
  idEspecialidad: number | null,
  nombre: string
}


///GUARD
export interface LoginResponse{
  user: Usuario,
  token: string;
}