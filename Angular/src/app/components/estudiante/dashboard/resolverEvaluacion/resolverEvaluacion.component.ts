import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EvaluacionService } from '../../../../services/evaluaion.service';
import { TipoEvaluacionService } from '../../../../services/tipoEvaluacion.service';


@Component({
  selector: 'app-resolverevaluacion',
  templateUrl: './resolverEvaluacion.component.html'
})
export class ResolverEvaluacionComponent implements OnInit {
  uri: any;
  evaluacion: any;
  detalleEvaluacion: any;
  validar1: boolean = false;
  validar2: boolean = false;
  validarDetalle: boolean = true;
  validarPreguntas: boolean = false;
  validarSM: boolean = false;
  validarVF: boolean = false;
  falsoVerdadero: FormGroup;
  detalle: FormGroup;
  loginForm: FormGroup;
  arrayPreguntas: any[] = [];
  arrayPreguntasSM: any[] = [];
  arrayDet: any[] = [];
  arrayPreguntasRestpuestas: any[] = [];
  loading = false;
  submitted = false;
  submitted1 = false;

  constructor(private tipoService: TipoEvaluacionService,
              private evaluacionService: EvaluacionService,
              private router: Router,
              private activaderRoutes: ActivatedRoute ) { }

  ngOnInit() {
    this.activaderRoutes.params.subscribe(params => {
      this.uri = params["id"];
      this.activaderRoutes.params.subscribe(params => {
        this.evaluacionService.getEvaluacion(this.uri).subscribe(data => {
          this.evaluacion = JSON.parse(JSON.stringify(data));
          
        });
      });

      this.evaluacionService.getDetEvaluacion(this.uri).subscribe(data => {
        this.detalleEvaluacion = data;
        this.arrayDet = [];
        this.arrayDet.push(data);
        if (this.arrayDet.length !== 0 || this.arrayDet.length !== undefined) {
          this.validarDetalle = false;
        }
        if( this.detalleEvaluacion.aleatorio == 1 ){
          this.tipoService.getAll2(this.detalleEvaluacion.idDetalleEvaluacion).subscribe(f => {
            this.arrayPreguntasRestpuestas = f[0];
            if(this.arrayPreguntasRestpuestas.some(item => item.tipo === 'SM') == true ) {
              this.validarSM = true;
            } else {
              this.validarVF = true;
            }
            if (this.arrayPreguntasRestpuestas.length !== 0) {
              this.validarPreguntas = true;
            } else {
            }
          });
        } else {
          this.tipoService.getAll(this.detalleEvaluacion.idDetalleEvaluacion).subscribe(f => {
            this.arrayPreguntasRestpuestas = f[0];
            if(this.arrayPreguntasRestpuestas.some(item => item.tipo === 'SM') == true ) {
              this.validarSM = true;
            } else {
              this.validarVF = true;
            }
            if (this.arrayPreguntasRestpuestas.length !== 0) {
              this.validarPreguntas = true;
            } else {
            }
          });
        }
      });
    });
  }

  terminar(){
    var data = {
      idUsuario: localStorage.getItem('id'),
      idEvaluacion: this.evaluacion.idEvaluacion,
      punteo: Math.floor(Math.random() * this.detalleEvaluacion.ponderacion) + 1
    }
    var nuevoDet = {
      habilitado: 0,
      aleatorio: this.detalleEvaluacion.aleatorio,
      idDetalleEvaluacion: this.detalleEvaluacion.idDetalleEvaluacion,
      idEvaluacion: this.detalleEvaluacion.idEvaluacion,
      ponderacion: this.detalleEvaluacion.ponderacion
    }
    this.evaluacionService.putDet(nuevoDet, this.detalleEvaluacion.idDetalleEvaluacion).subscribe(d => {
      this.tipoService.postMiEvaluacion(data).subscribe(d => {
        this.router.navigate(['home/dashboard/est/estudiante/cursos/']);
      });
    });
  }

}
