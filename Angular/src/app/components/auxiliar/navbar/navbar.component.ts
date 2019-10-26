import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbaraux',
  templateUrl: './navbar.component.html'
})
export class NavBarAuxComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/login/access']);
  }
}
