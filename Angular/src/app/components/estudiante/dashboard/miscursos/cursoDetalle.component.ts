import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadService } from '../../../../services/actividad.service';
import { EvaluacionService } from '../../../../services/evaluaion.service';
import { CursoService } from '../../../../services/curso.service';


@Component({
  selector: 'app-cursodetalleest',
  templateUrl: './cursoDetalle.component.html'
})
export class CursoDetalleComponent implements OnInit {
  arrayCursos: any[] = [];
  miCurso: any;
  misActividades: any;
  misEvaluaciones: any;
  uri: any;
  estado: any;
  mensaje: any;
  tipo: any;
  constructor(private service: AsignacionAuxiliarService, private actividadService: ActividadService,
    private evService: EvaluacionService, private cursoService: CursoService,
    private router: Router, private activaderRoutes: ActivatedRoute, ) { }
  ngOnInit() {
    this.inicializar();
  }
  inicializar() {
    this.activaderRoutes.params.subscribe(data => {
      this.uri = data["id"];
      this.service.getMyCourse(this.uri).subscribe(data => {
        this.miCurso = data;
      });
      this.evService.getAllEv(this.uri).subscribe(data => {
        this.misEvaluaciones = data;
      });
      this.actividadService.getMisActividades(this.uri).subscribe(data => {
        this.misActividades = data;
      });
    });
    this.service.getAsig(localStorage.getItem('id')).subscribe(data => {
      this.arrayCursos = data;
    });

  }

  desasignar() {
    var data = {
      idUsuario: localStorage.getItem('id'),
      idAsignacionAuxiliar: this.uri
    }
    this.cursoService.postDesasignar(data).subscribe(res => {
      var informacion = JSON.parse(JSON.stringify(res));
      console.log(informacion)
      if (informacion.ok === true) {
        this.inicializar();
        this.tipo = 'success';
        this.estado = false;
        this.mensaje = informacion.error;
        setTimeout(() => {
          this.estado = true;
        }, 5000);
      } else {
        this.estado = informacion.ok;
        this.mensaje = informacion.error;
        this.tipo = 'danger';
        setTimeout(() => {
          this.estado = true;
        }, 5000);
      }
    });
  }

  resolver(id: any) {
    this.actividadService.getActividad(id).subscribe(data => {
      var d = {
        idUsuario: localStorage.getItem('id'),
        idActividad: id,
        entregada: 1,
        ponderacion: Math.floor(Math.random() * data.ponderacion) + 1
      }
      this.actividadService.postRespuesta(d).subscribe();
    });
  }
}
