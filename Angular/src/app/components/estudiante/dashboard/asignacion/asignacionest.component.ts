import { Component, OnInit } from '@angular/core';
import { AsignacionEstudianteService } from '../../../../services/asignacionEstudiante.service';
import mensaje from '../../../../../../../Api/src/router/mensaje.router';

@Component({
  selector: 'app-asignacionest',
  templateUrl: './asignacionest.component.html'
})
export class AsignacionEstComponent implements OnInit {
  array: any[] = [];
  varEstudiante: any;
  estado:any;
  informacion:any;
  mensaje:any;
  tipo:any;
  constructor(private service: AsignacionEstudianteService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar() {
    this.service.get().subscribe(data => {
      this.array = data;
    });
  }

  asignar(id: any) {
    var data = {
      idUsuario: localStorage.getItem('id'),
      idAsignacionAuxiliar: id
    }

    this.service.post(data)
    .subscribe(res => {
      this.informacion = JSON.parse(JSON.stringify(res));
      if ( this.informacion.ok === true ){
        this.inicializar();
        this.tipo = 'success';
        this.estado = false;
        this.mensaje = this.informacion.mensaje;
        setTimeout(() => {
          this.estado = true;
      }, 4000);
    } else {
        this.estado = this.informacion.ok;
        this.mensaje = this.informacion.error;
        this.tipo = 'danger';
        setTimeout(() => {
          this.estado = true;
      }, 3000);
    }
    });
  }
 
  obtenerId(id: any) {
    this.varEstudiante = id;
  }

  aceptarAsignar(){
    this.asignar(this.varEstudiante);
  }
}
