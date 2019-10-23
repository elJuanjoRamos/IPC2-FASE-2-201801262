import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DetalleCursoService } from '../../../../services/detalleCurso.service';
import { AsignacionAuxiliarService } from '../../../../services/asignacionAuxiliar.service';

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
  informacion:any;
  mensaje:any;
  constructor(private service: UsuarioService,
    private detService: DetalleCursoService,
    private asigService: AsignacionAuxiliarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activaderRoutes: ActivatedRoute) { }

    ngOnInit() {
      this.inicializar();
      this.activaderRoutes.params.subscribe(params => {
        this.uri = params["id"];
        if (this.uri === "nuevo") {
          this.loginForm = this.formBuilder.group({
            idUsuario: ['', Validators.required],
            idDetalleCurso: ['', Validators.required]
          });
        } else {
          /*this.service.getUsuario(params["id"])
            .subscribe(usuario => {
              this.usuario = usuario;
              this.nombreUsuario = this.usuario.nombre;
              this.validar = true;
              this.loginForm = new FormGroup({
                'nombre': new FormControl(this.usuario.nombre, Validators.required),
                'apellido': new FormControl(this.usuario.apellido, Validators.required),
                'username': new FormControl(this.usuario.username, Validators.required),
                'password': new FormControl(this.usuario.pass, Validators.required),
                'Rol_idRol': new FormControl(this.usuario.Rol_idRol, Validators.required),
              });
            });*/
        }
      });
    }
    inicializar(){
      this.service.getAuxiliares().subscribe(data => {
        this.arrayUsuarios = data;
      });
      this.detService.getAll().subscribe(data => {
        this.arrayDetalles = data;
        console.log(data);
      });
    }

    get f() { return this.loginForm.controls; }
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
      if (this.uri === 'nuevo') {
        this.loading = true;
        this.asigService.post(this.loginForm.value)
          .subscribe(res => {
            let estado = JSON.parse(JSON.stringify(res));
            if (estado.ok) {
              this.router.navigate(['/home/dashboard/adm/admin/asignacionauxiliar']);
            }
          });
      } else {
        /*this.service.put(this.loginForm.value, this.uri)
          .subscribe(res => {
            if (res) {
              //setTimeout(() => {
              this.router.navigate(['/home/dashboard/adm/admin/usuarios']);
              //}, 2000);
            }
          });*/
      }
    }


    validarAsig() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
      this.asigService.verificar(this.loginForm.value).subscribe(data => {
        this.informacion = JSON.parse(JSON.stringify(data));
        this.validar = this.informacion.estado;
        this.mensaje = this.informacion.mensaje;
        console.log(this.validar);
      });
    }

}
