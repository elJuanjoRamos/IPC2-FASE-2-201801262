import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DetalleCursoService } from '../../../../services/detalleCurso.service';
import { CursoService } from '../../../../services/curso.service';

@Component({
    selector: 'app-detcursoform',
    templateUrl: './detalleCursoForm.component.html'
})
export class DetalleCursoFormComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    validar: boolean = false;
    texto: string;
    uri: string = "";
    detalle: any;
    arrayCursos: any[] = [];
    arraySecciones: any[] = [];
    informacion:any;
    estado:any;
    mensaje:any;
    constructor(private service: DetalleCursoService,
        private cursoService: CursoService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activaderRoutes: ActivatedRoute) { }

    ngOnInit() {
        this.cursoService.getActive().subscribe(data => { 
            this.arrayCursos = data;
        });
        this.cursoService.getSeccion().subscribe(data => {
            this.arraySecciones = data;
        });
        this.activaderRoutes.params.subscribe(params => {
            this.uri = params["id"];
            if (this.uri === "nuevo") {
                this.loginForm = this.formBuilder.group({
                    idCurso: ['', Validators.required],
                    idSeccion: ['', Validators.required],
                    semestre: ['', Validators.required],
                    anio: ['', Validators.required],
                    horaInicio: ['', Validators.required],
                    horaFin: ['', Validators.required]
                });
            } else {
                this.service.getDetalle(params["id"])
                .subscribe(det => {
                  this.detalle = det;
                  this.validar = true;
                  this.loginForm = new FormGroup({
                    'idCurso': new FormControl(this.detalle.idCurso, Validators.required),
                    'idSeccion': new FormControl(this.detalle.idSeccion, Validators.required),
                    'semestre': new FormControl(this.detalle.semestre, Validators.required),
                    'anio': new FormControl(this.detalle.anio, Validators.required),
                    'horaInicio': new FormControl(this.detalle.horaInicio,  Validators.required),
                    'horaFin': new FormControl(this.detalle.horaFin,  Validators.required)
                  });
                });
            }
        });
    }
    get f() { return this.loginForm.controls; }
    public onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        if (this.uri === 'nuevo') {
            this.loading = true;
            this.service.post(this.loginForm.value)
                .subscribe(res => {
                    this.informacion = JSON.parse(JSON.stringify(res));
                    if ( this.informacion.ok === true ){
                            this.router.navigate(['/home/dashboard/adm/admin/detallecurso']);
                        } else {
                            this.estado = this.informacion.ok;
                            this.mensaje = this.informacion.mensaje;
                        }
                });
        } else {
            this.service.put(this.loginForm.value, this.uri)
                .subscribe(res => {
                    this.informacion = JSON.parse(JSON.stringify(res));
                    if ( this.informacion.ok === true ){
                            this.router.navigate(['/home/dashboard/adm/admin/detallecurso']);
                        } else {
                            this.estado = this.informacion.ok;
                            this.mensaje = this.informacion.mensaje;
                        }
                });
        }
    }


}
