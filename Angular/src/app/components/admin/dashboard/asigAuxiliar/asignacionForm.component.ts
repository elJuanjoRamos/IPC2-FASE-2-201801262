import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DetalleCursoService } from '../../../../services/detalleCurso.service';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';
import { Usuario } from '../../../../api/models/usuario.model';

@Component({
  selector: 'app-asignacionform',
  templateUrl: './asignacionForm.component.html'
})
export class AsignacionForm implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  uri: string = "";
  arrayUsuarios: any[] = [];
  arrayDetalles: any[] = [];
  validar: boolean;
  informacion: any;
  mensaje: any;


  auxiliar: any;
  ver: boolean = false;
  ver2: boolean = false;
  detalle: any;
  estado: boolean;
  constructor(private service: UsuarioService,
    private detService: DetalleCursoService,
    private asigService: AsignacionAuxiliarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activaderRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.inicializar();
  }
  inicializar() {
    this.service.getAuxiliares().subscribe(data => {
      this.arrayUsuarios = data;
    });
  }
  cargar(object: any) {
    this.ver = true;
    this.auxiliar = JSON.parse(JSON.stringify(object));
    this.detService.getDet(this.auxiliar).subscribe(data => {
      this.arrayDetalles = data;
    });
  }
  cargar2(object: any) {
    this.ver2 = true;
    this.detalle = JSON.parse(JSON.stringify(object));
  }

  validarAsignacion() {
    var data = {
      idUsuario: this.auxiliar.idUsuario,
      idDetalleCurso: this.detalle.idDetalleCurso
    }
    this.asigService.post(data)
      .subscribe(res => {
        var informacion = JSON.parse(JSON.stringify(res));
        if (informacion.ok === true) {
          this.ver = false;
          this.ver2 = false;
        } else {

          this.estado = false;
          this.mensaje = 'Ya existe una asignacion con los datos que esta proporcionando';
          setTimeout(() => {
            this.estado = true;
          }, 3000);
        }
      });

  }
}
