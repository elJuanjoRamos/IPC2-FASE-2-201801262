import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { EvaluacionService } from '../../../../services/evaluaion.service';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { TipoEvaluacionService } from '../../../../services/tipoEvaluacion.service';

@Component({
  selector: 'app-evaluacionform',
  templateUrl: './evaluacionForm.component.html'
})
export class EvaluacionFormComponent implements OnInit {
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
  constructor(private service: EvaluacionService,
    private asigService: AsignacionAuxiliarService,
    private router: Router, private activaderRoutes: ActivatedRoute,
    private formBuilder: FormBuilder, private tipoService: TipoEvaluacionService) {
    this.activaderRoutes.params.subscribe(params => {
      this.uri = params["id"];
      this.service.getEvaluacion(this.uri).subscribe(data => {
        this.evaluacion = JSON.parse(JSON.stringify(data));
      });
    });
  }
  get d() { return this.detalle.controls; }
  get f() { return this.falsoVerdadero.controls; }
  get g() { return this.loginForm.controls; }

  ngOnInit() {
    this.initVF();
    this.initSM();
    this.initForm();
    this.arrayDet = [];
    this.inicializarDetalle();
  }

  crearDetalle() {
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.detalle.invalid) {
      return;
    }
    this.validarDetalle = false;
    this.service.postDet(this.detalle.value).subscribe(data => {
      this.initForm();
      this.inicializarDetalle();
    });
  }

  actualizarDetalle() {
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.detalle.invalid) {
      return;
    }
    this.service.putDet(this.detalle.value, this.detalleEvaluacion.idDetalleEvaluacion)
      .subscribe(data => {
        this.initForm();
        this.inicializarDetalle();
      });
  }
  inicializarDetalle() {
    this.service.getDetEvaluacion(this.uri).subscribe(data => {
      this.detalleEvaluacion = data;
      this.arrayDet = [];
      this.arrayDet.push(data);
      if (this.arrayDet.length !== 0 || this.arrayDet.length !== undefined) {
        this.validarDetalle = false;
      }
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
    });
  }


  initVF() {
    this.falsoVerdadero = this.formBuilder.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
  }
  initSM() {
    this.loginForm = this.formBuilder.group({
      pregunta: ['', Validators.required],
      respuesta1: ['', Validators.required],
      respuesta2: ['', Validators.required],
      respuesta3: ['', Validators.required],
      correcta: ['', Validators.required]
    });
  }
  initForm() {
    this.detalle = this.formBuilder.group({
      habilitado: ['', Validators.required],
      ponderacion: ['', Validators.required],
      aleatorio: ['', Validators.required],
      idEvaluacion: this.uri
    });
  }
  aceptarForma() {
    let p: string = (<HTMLInputElement>document.getElementById('selectB')).value;
    if (p === '2') {
      this.validar1 = false;
      this.validar2 = true;
      this.initSM();
    } else if (p === '1') {
      this.validar1 = true;
      this.validar2 = false;
      this.initVF();
    }
  }
  ///PARTE DE PREGUNTAS FALSO Y VERDADERO
  idTemp: number = 1;
  enviarPregunta() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.falsoVerdadero.invalid) {
      return;
    }
    var form = JSON.parse(JSON.stringify(this.falsoVerdadero.value));
    var valor = {
      id: this.idTemp,
      pregunta: form.pregunta,
      respuesta: form.respuesta,
      idDetalleEvaluacion: this.detalleEvaluacion.idDetalleEvaluacion
    }
    if (this.arrayPreguntas.length === 0) {
      this.arrayPreguntas.push(valor);
    } else {
      for (let p of this.arrayPreguntas) {
        if (p.id !== valor.id) {
          this.arrayPreguntas.push(valor);
          break;
        } else {
        }
      }
    }
    this.idTemp = this.idTemp + 1;
    this.initVF();
  }


  idTemp1: number = 1;
  enviarPreguntaSM() {
    this.submitted = true;
    // stop here if form is invalid
     if (this.loginForm.invalid) {
       return;
     }
    var form = JSON.parse(JSON.stringify(this.loginForm.value));
    var corr = '';


    if (form.correcta == 1) {
      corr = form.respuesta1;
    } else if (form.correcta == 2) {
      corr = form.respuesta2;
    } else if (form.correcta == 3) {
      corr = form.respuesta3;
    }

    var valor = {
      id: this.idTemp1,
      pregunta: form.pregunta,
      respuesta1: form.respuesta1,
      respuesta2: form.respuesta2,
      respuesta3: form.respuesta3,
      correcta: corr,
      idDetalleEvaluacion: this.detalleEvaluacion.idDetalleEvaluacion
    }

    if (this.arrayPreguntasSM.length === 0) {
      this.arrayPreguntasSM.push(valor);
    } else {
      for (let p of this.arrayPreguntasSM) {
        if (p.id !== valor.id) {
          this.arrayPreguntasSM.push(valor);
          break;
        } else {
        }
      }
    }
    this.idTemp1 = this.idTemp1 + 1;
    this.initSM();
  }


  eliminar(p) {
    let object = p;
    var index = this.arrayPreguntas.indexOf(object);
    if (index > -1) {
      this.arrayPreguntas.splice(index, 1);
    }
    if (this.arrayPreguntas.length === 0) {
      this.loading = true;
    }
  }
  eliminarSM(p) {
    let object = p;
    var index = this.arrayPreguntasSM.indexOf(object);
    if (index > -1) {
      this.arrayPreguntasSM.splice(index, 1);
    }
    if (this.arrayPreguntasSM.length === 0) {
      this.loading = true;
    }
  }
  enviarParametrosVF() {
    for (let u = 0; u < this.arrayPreguntas.length; u++) {
      const element = this.arrayPreguntas[u];
      this.tipoService.postVF(element).subscribe(data => {
        this.inicializarDetalle();
      });
    }
  }

  enviarParametrosSM() {
    for (let u = 0; u < this.arrayPreguntasSM.length; u++) {
      const element = this.arrayPreguntasSM[u];
      this.tipoService.postSM(element).subscribe(data => {
        this.inicializarDetalle();
      });
    }
  }
}
