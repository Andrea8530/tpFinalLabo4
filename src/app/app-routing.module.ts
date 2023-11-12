import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/components/error404/error404.component';
import { EnviarRecetasComponent } from './modules/main/components/recetas/enviarRecetas/enviarRecetas.component';
import { authGuard } from './core/apiService/authService/guard/auth.guard';

const routes: Routes = [
  {
    path:'landing',
    loadChildren:()=>import('./modules/landing/landing.module').then(m=>m.LandingModule)
  },
  {
    path:'home/:numero/:esActivo',
    loadChildren:()=>import('./modules/main/main.module').then(m=>m.MainModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'enviarRecetas',
    component: EnviarRecetasComponent,
    canActivate:[authGuard]
  }, 
  {
    path:'',
    redirectTo: 'landing',
    pathMatch:'full'
  },
  {
    path:'**',
    component: Error404Component,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
