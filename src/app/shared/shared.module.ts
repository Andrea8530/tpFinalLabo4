import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Error404Component } from './components/error404/error404.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
