import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';



@Component({
  selector: 'app-navbarest',
  templateUrl: './navbarEst.component.html'
})
export class NavBarEstComponent implements OnInit {
  usuario:any;
  usuarios: any[] = []
  constructor(private router: Router, private service: UsuarioService) {
    this.usuario = null;
    this.service.getUsuario(localStorage.getItem('id')).subscribe(data => {
      this.usuarios.push(data[0]);
    });
  }

  ngOnInit() {
  }
  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/login/access']);
  }
}
