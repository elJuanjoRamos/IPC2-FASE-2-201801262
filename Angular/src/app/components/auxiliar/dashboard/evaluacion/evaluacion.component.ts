import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EvaluacionService } from '../../../../services/evaluaion.service';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html'
})
export class EvaluacionComponent implements OnInit {
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  misEvaluaciones: any[] = [];
  arrayCursos: any[] = [];
  
  constructor(private service: EvaluacionService,
              private asigService: AsignacionAuxiliarService,
              private router: Router, private activaderRoutes: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.inicializar();
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      idAsignacionAuxiliar: ['', Validators.required]
  });
  }
  inicializar() {
    this.service.getAll(localStorage.getItem('id')).subscribe(data => {
      this.misEvaluaciones = data;
    });
    this.asigService.getAsig(localStorage.getItem('id')).subscribe(data => {
      this.arrayCursos = data;
    });
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    };
    this.service.post(this.loginForm.value)
    .subscribe(data => {
        this.inicializar();
    });
  }

  eliminar(id:any){
    this.service.delete(id).subscribe(data=> {
      this.inicializar();
    });
  }

}
