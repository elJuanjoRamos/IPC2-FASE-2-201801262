import { Component, OnInit } from '@angular/core';
import { DetalleCursoService } from '../../../../services/detalleCurso.service';

@Component({
  selector: 'app-detallecurso',
  templateUrl: './detalleCurso.component.html'
})
export class DetalleCursoComponent implements OnInit {
    arrayDetalle: any[] = [];
    varAuxiliar:any;
  constructor( private service: DetalleCursoService) { }

  ngOnInit() {
      this.inicializar();
  }
  inicializar() {
      this.service.getAll().subscribe(data => {
          this.arrayDetalle = data;
      });
  }
  borrar(id: any) {
    console.log(id);
    this.service.delete(id)
    .subscribe(res => {
      this.inicializar();
    });
  }

  obtenerId(id:any) {
    this.varAuxiliar = id;
  }

  aceptarEliminar(){
    this.borrar(this.varAuxiliar);
  }


}
