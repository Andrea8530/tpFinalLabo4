import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/apiService/api.service';
import { Medico, Usuario } from 'src/app/core/models';

@Component({
  selector: 'main-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceApi:ApiService) { }

  public num: number=0;
  public isActivo:Boolean = new Boolean();
  
  ngOnInit() {
    this.num = +this.route.snapshot.paramMap.get('numero')!; //lo trae por url
    this.isActivo = this.route.snapshot.paramMap.get('esActivo') === 'true';  //lo trae por url
    this.getMedicosXobraSocial(this.num);
  }


  public listaMedicos: Medico[]=[];

  getMedicosXobraSocial(num:number){
    this.serviceApi.getMedicosObraSocial(num).subscribe({
      next: (data)=>{ 
        this.listaMedicos = data
      },
      error:()=> console.log("error al traer datos de medicos")
    })
  }


  ///para mostrar por especialidad, recibe del hijo el id especialidad
  public listaMedicosEspec: Medico[]= [] ;

  medicosPorEspecialidad(idEspeci:number){
    this.listaMedicosEspec = this.listaMedicos.filter(medico => medico.idEspecialidad === idEspeci);
  }

  todosLosMedicos(){
    this.listaMedicosEspec= this.listaMedicos;
  }


  borrarMedicoXobraSocial(idMed:number){

  }

  refrescar(bool : Boolean){
    this.getMedicosXobraSocial(this.num)
  }

///para editar

  public visible:Boolean = false;
  medicoParaEditar:Medico = new Medico()

  public editarMedico(medico:Medico){
    this.medicoParaEditar = medico;
    this.visible = true;
    console.log(medico);
  }



  public async verificarMatricula(medico:Medico): Promise<Boolean>{
    let doctor:Medico[]=[];
    try{
      let respuesta = this.serviceApi.getChequeoMedico(medico.matricula);
      doctor = await lastValueFrom(respuesta);
    }catch(error){
      console.log(error);
    }
    return doctor.length == 1;
  }


  public async editMedico(medico:Medico){
    
    try{
      const check = this.verificarMatricula(medico);
      console.log(check);
      if(await check && medico.matricula !== this.medicoParaEditar.matricula){
        alert("Esta matricula pertenece a otro medico");
      }else{
        this.serviceApi.editMedico(medico).subscribe({
          next: ()=>{ 
            alert("Se edito la informacion correctamente");
            this.getMedicosXobraSocial(this.num);
            this.medicosPorEspecialidad(medico.idEspecialidad!) // no va aca,no actualiza la lista de especial
          },
          error:()=> console.log("error al querer editar informacion")
        })

        
      }
      
    }catch(error){
      console.log(error);
      
    }
    
  }

  public mostrar(vista:Boolean){
    this.visible = false;
  }

}
/*
  
  public async registrar(){
    this.usuario!.contrasena =  this.formulario.value.contrasena
     this.usuario!.email =  this.formulario.value.email

    try{
      const check = this.serviceAuth.verificarUsuario(this.formulario.value.email);
      console.log(check);
      if(await check){
        alert("Este usuario ya existe, Elija otro");
        this.formulario.reset();

      }else{

        this.serviceApi.postUsuarios(this.usuario).subscribe({
          next: ()=>{
           alert("Se registro con exito el usuario");
           this.router.navigate(['auth'])
          },
          error:()=> alert("Hubo un error al registrar")
       })

      }
    }catch(error){
      console.log(error);
    }
  }
  
  */