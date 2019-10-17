import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';

@Component({
  selector: 'app-asignacionauxiliar',
  templateUrl: './asignacionAuxiliar.component.html'
})
export class AsignacionAuxiliar implements OnInit {
  arrayAsignacion: any[] = [];
  varAuxiliar: any;
  constructor(private service: AsignacionAuxiliarService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar() {
    this.service.get().subscribe(data => {
      this.arrayAsignacion = data;
    });
  }

  borrar(id: any) {
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
