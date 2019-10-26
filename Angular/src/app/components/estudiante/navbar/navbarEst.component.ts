import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbarest',
  templateUrl: './navbarEst.component.html'
})
export class NavBarEstComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/login/access']);
  }
}
