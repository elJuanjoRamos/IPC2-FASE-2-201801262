import { Component, OnInit } from '@angular/core';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-asignacionauxiliar',
  templateUrl: './asignacionAuxiliar.component.html'
})
export class AsignacionAuxiliar implements OnInit {
  arrayAsignacion: any[] = [];
  varAuxiliar: any;
  loginForm: FormGroup;
  submitted = false;
  constructor(private service: AsignacionAuxiliarService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.inicializar();
    this.loginForm = this.formBuilder.group({
      motivo: ['', Validators.required]});
  }
  get f() { return this.loginForm.controls; }
  inicializar() {
    this.service.get().subscribe(data => {
      this.arrayAsignacion = data;
    });
  }

  borrar(id: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
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
