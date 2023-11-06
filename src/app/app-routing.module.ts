import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'landing',
    loadChildren:()=>import('./modules/landing/landing.module').then(m=>m.LandingModule)
  },
  {
    path:'home/:numero',
    loadChildren:()=>import('./modules/main/main.module').then(m=>m.MainModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    redirectTo: 'landing',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo: 'landing',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
