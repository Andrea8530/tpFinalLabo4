import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private router:Router){}

  public medicosXmutual(num:number){
  this.router.navigate(['/home', num]);
  }

}
