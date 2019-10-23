import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActividadService } from '../../../../services/actividad.service';

@Component({
  selector: 'app-detallecursoauxiliar',
  templateUrl: './detalleCurso.component.html'
})
export class DetalleCursoAuxiliarComponent implements OnInit {

  arrayCursos: any[] = [];
  miCurso:any;
  misEstudiantes: any;
  misActividades: any;
  uri: any;
  idActividad:any;
  verificar:boolean = true;
  verificar2:boolean = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  actividadOrigial: any;
  
  constructor(private service: AsignacionAuxiliarService,
    private router:Router, private activaderRoutes: ActivatedRoute,
    private formBuilder: FormBuilder, private actividadService: ActividadService) { }

  ngOnInit() {
    this.inicializar();
    this.cargarForm();
  }
  cargarForm() {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      horaLimite: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      ponderacion: ['', Validators.required],
      conArchivo: ['', Validators.required],
      idAsignacionAuxiliar: [this.uri, Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    console.log(this.loginForm.value)  
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    };
    this.actividadService.post(this.loginForm.value)
    .subscribe(data => {
        this.inicializar();
    });
  }

  eliminar(id:any) {
    this.actividadService.delete(id).subscribe(data =>{
        this.inicializar();
    });
  }

  cargar(id:any) {
      this.verificar = false;
      this.verificar2 = true;
      this.idActividad = id;
      this.actividadService.getActividad(id).subscribe(data => {
         let actividad = data;
         this.loginForm = new FormGroup({
            'nombre': new FormControl(actividad.nombre, Validators.required),
            'horaLimite': new FormControl(actividad.horaLimite, Validators.required),
            'fechaLimite': new FormControl(actividad.fechaLimite, Validators.required),
            'ponderacion': new FormControl(actividad.ponderacion, Validators.required),
            'conArchivo': new FormControl(actividad.conArchivo, Validators.required),
            'idAsignacionAuxiliar': new FormControl(actividad.idAsignacionAuxiliar, Validators.required)
          });
      });
  }

  actualizar(){
    this.verificar = true;
    this.verificar2 = false;
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    };
    var d = JSON.parse(JSON.stringify(this.loginForm.value));
    var body = {
        nombre: d.nombre,
        horaLimite: d.horaLimite,
        fechaLimite: d.fechaLimite,
        ponderacion: d.ponderacion,
        conArchivo: d.conArchivo,
        idAsignacionAuxiliar: this.uri,
        idActividad: this.idActividad
    }
    this.actividadService.put(body, this.uri).subscribe(data => {
        this.inicializar();
        this.cargarForm();
    });
  }
  inicializar(){
    this.activaderRoutes.params.subscribe(data => {
        this.uri = data["id"];
        this.service.getMyCourse(this.uri).subscribe(data =>{
            this.miCurso = data;
        });
        this.service.getMyStudents(this.uri).subscribe(data =>{
            this.misEstudiantes = data;
        });
        this.actividadService.getMisActividades(this.uri).subscribe(data => {
            this.misActividades = data;
        });
    });
    this.service.getAsig(localStorage.getItem('id')).subscribe(data => {
      this.arrayCursos = data;
    });
    
  }
  cancelar() {
    this.verificar = true;
    this.verificar2 = false;
    this.inicializar();
    this.cargarForm();
  }
}
