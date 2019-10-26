import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioForm.component.html'
})
export class UsuarioFormComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  usuario: any;
  validar: boolean = false;
  nombreUsuario: string;
  texto: string;
  uri: string = "";
  constructor(private service: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activaderRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activaderRoutes.params.subscribe(params => {
      this.uri = params["id"];
      if (this.uri === "nuevo") {
        this.loginForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          password: ['', Validators.required],
          username: ['', Validators.required],
          idTipoUsuario: ['', Validators.required],
          dpi: ['', Validators.required],
          carnet: ['', Validators.required],
        });
        this.nombreUsuario = "Nuevo Usuario";
      } else {
        this.service.getUsuario(params["id"])
          .subscribe(usuario => {
            this.usuario = usuario[0];
            console.log()
            this.nombreUsuario = this.usuario.nombre;
            this.validar = true;
            this.loginForm = new FormGroup({
              'nombre': new FormControl(this.usuario.nombre, Validators.required),
              'apellido': new FormControl(this.usuario.apellido, Validators.required),
              'username': new FormControl(this.usuario.username, Validators.required),
              'password': new FormControl(this.usuario.password, Validators.required),
              'dpi': new FormControl(this.usuario.dpi, Validators.required),
              'carnet': new FormControl(this.usuario.carnet, Validators.required),
              'idTipoUsuario': new FormControl(this.usuario.idTipoUsuario, Validators.required),
            });
          });
      }
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
      this.service.post(this.loginForm.value)
        .subscribe(res => {
          this.router.navigate(['/home/dashboard/adm/admin/usuarios']);
        });
    } else {
      this.service.put(this.loginForm.value, this.uri)
        .subscribe(res => {
          this.router.navigate(['/home/dashboard/adm/admin/usuarios']);
        });
    }
  }

}
