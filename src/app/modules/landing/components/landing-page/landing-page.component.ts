import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/apiService/authService/auth.service';

@Component({
  selector: 'landing-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private router:Router, private authService: AuthService){}

  public medicosXmutual(num:number){

    if(localStorage.getItem('token') == "1"){          
      this.router.navigate(['/home', 1, true])
    }
  else{
  this.router.navigate(['/home', num, false]);
}
  }

  public medicosXmutual2(num:number){

    if(localStorage.getItem('token') == "2"){          
      this.router.navigate(['/home', 2, true])
    }
  else{
  this.router.navigate(['/home', num, false]);
}
  }

  public medicosXmutual3(num:number){

    if(localStorage.getItem('token') == "3"){          
      this.router.navigate(['/home', 3, true])
    }
  else{
  this.router.navigate(['/home', num, false]);
}
  }

  public medicosXmutual4(num:number){

    if(localStorage.getItem('token') == "4"){          
      this.router.navigate(['/home', 4, true])
    }
  else{
  this.router.navigate(['/home', num, false]);
}
  }

}
