import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddMedicsComponent } from '../medicos/components/add-medics/add-medics.component';

const routes: Routes = [
   {
    path:'',
    component: HomePageComponent
  },
  {
    path:'agregarMedico',
    component: AddMedicsComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
