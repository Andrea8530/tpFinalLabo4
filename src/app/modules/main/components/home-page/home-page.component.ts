import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/apiService/api.service';
import { Especialidad, Medico, OsporMedico, Usuario } from 'src/app/core/models';

@Component({
  selector: 'main-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceApi:ApiService) { }

  public num: number=0;
  public isActivo:Boolean = new Boolean();
  public mostrarComponenteB = true;
  
  ngOnInit() {
    this.num = +this.route.snapshot.paramMap.get('numero')!; //lo trae por url
    this.isActivo = this.route.snapshot.paramMap.get('esActivo') === 'true';  //lo trae por url
    this.getMedicosXobraSocial(this.num);
    this.getEspecialidades();
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
    this.mostrarComponenteB = false;
  }

  public borrarFiltrosEspecialidad(){
    this.mostrarComponenteB = true;
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


  ///para borrar
  public async borrar(idMed:number): Promise<OsporMedico[]>{
    let respues: OsporMedico[] = [];
    try{
      let respuesta = this.serviceApi.getidMedicoXobraSocial(idMed, this.num);
      respues = await lastValueFrom(respuesta);
    }catch(error){
      console.log("error");
    }
    return respues;
  }

  public idAborrar:OsporMedico = new OsporMedico();

public async borrarMedicoXobraSocial(idMed:number){
let num = (await this.borrar(idMed))  
  
  this.serviceApi.deleteMedicoXobraSocial(num[0].id!).subscribe({
    next: ()=>{
      alert("Se borro con exitooo");
      this.getMedicosXobraSocial(this.num)

     },
     error:()=> alert("Hubo un error al querer borrar")
  })
  
}


///para mandar especialidades al hijo
public listaEspecialidades: Especialidad[]=[];

public getEspecialidades(){
  this.serviceApi.getEspecialidades().subscribe({
    next: (data)=>{ 
      this.listaEspecialidades = data
    },
    error:()=> console.log("error al traer datos de especialidades")
  })
}

}