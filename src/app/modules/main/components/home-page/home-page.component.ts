import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/apiService/api.service';
import { Medico } from 'src/app/core/models';

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
    this.num = +this.route.snapshot.paramMap.get('numero')!;
    this.isActivo = this.route.snapshot.paramMap.get('esActivo') === 'true';
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



  public listaMedicosEspec: Medico[]= [] ;

  medicosPorEspecialidad(idEspeci:number){
    this.listaMedicosEspec = this.listaMedicos.filter(medico => medico.idEspecialidad === idEspeci);
    
  }


  borrarMedicoXobraSocial(idMed:number){

  }

}
