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
