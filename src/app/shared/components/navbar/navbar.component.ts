import { Component,  Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/apiService/authService/auth.service';


@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

@Input() isUser: Boolean = false;


constructor(private router:Router, private authService: AuthService){}



ngOnInit(): void {
}

///todo lo que incluye el guard
public goToLogin(){
  this.router.navigate(["/auth"]);
}

public goToEnviarRecetas(){
  if(this.authService.estaLogueado){
  this.router.navigate(["enviarRecetas"])
}else{
  alert("Para autorizar recetas usted debe loguearse primero")
}
}

public goToInicio(){
  this.router.navigate(["/landing"])
}

public logout(){
  this.authService.logout();
  this.router.navigate([''])
}

public get servicioAuth(){
  
  return this.authService.estaLogueado;
}



}
