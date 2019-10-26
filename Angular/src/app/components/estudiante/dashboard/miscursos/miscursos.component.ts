import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.component.html'
})
export class MisCursosComponent implements OnInit {
  arrayCursos: any[] = [];

  constructor(private service: AsignacionAuxiliarService,
    private router:Router) { }
  
  ngOnInit() {
    this.service.getAsigEst(localStorage.getItem('id')).subscribe(data => {
      this.arrayCursos = data;
      console.log(data);
    });
  }

  redireccionar(idCurso: any) {
    var direccion = '/home/dashboard/est/estudiante/cursos/' + idCurso;
    this.router.navigate([direccion]);
  }
}
