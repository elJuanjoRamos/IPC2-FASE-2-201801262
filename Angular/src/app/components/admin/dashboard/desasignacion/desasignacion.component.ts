import { Component, OnInit } from '@angular/core';
import { AsignacionEstudianteService } from '../../../../services/asignacionEstudiante.service';


@Component({
  selector: 'app-desasignacion',
  templateUrl: './desasignacion.component.html'
})
export class DesasignacionComponent implements OnInit {
  solicitudes:any;
  constructor(private service: AsignacionEstudianteService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar(){
    this.service.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
      console.log(data);
    });
  }
  eliminar(id:any) {
    this.service.delete(id).subscribe(data => {
      this.inicializar();
    });
    this.service.deleteSolicitud(id).subscribe(data => {
        this.inicializar();
    });
  }

}
