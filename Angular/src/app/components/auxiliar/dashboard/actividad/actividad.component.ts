import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html'
})
export class ActividadComponent implements OnInit {

  arrayCursos: any[] = [];
  constructor(private service: AsignacionAuxiliarService,
    private router:Router) { }
  
  ngOnInit() {

    this.service.getAsig(localStorage.getItem('id')).subscribe(data => {
      this.arrayCursos = data;
    });
  }

  redireccionar(idCurso: any) {
    var direccion = '/home/dashboard/aux/auxiliar/cursos/' + idCurso;
    this.router.navigate([direccion]);
  }
  
}
