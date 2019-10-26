import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registroaux',
  templateUrl: './registroAuxiliar.component.html'
})
export class RegistroAuxiliarComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsuarioService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      carnet: ['0'],
      dpi: ['0']
    });
  }

  onSubmit() {
    this.entrada(this.loginForm.value);
  }

  entrada(usuario: any) {
    var data = JSON.parse(JSON.stringify(usuario));

    var body = {
      nombre: data.nombre,
      apellido: data.apellido,
      username: data.username,
      password: data.password,
      carnet: data.carnet,
      dpi: data.dpi,
      idTipoUsuario: 2,
      idUsuario:0
    }
    if ("id" in localStorage) {
    } else {
      localStorage.setItem('id', JSON.parse(JSON.stringify(body)).idUsuario);
    }

    this.service.post(body).subscribe(data => {
      this.authenticationService.login(body);
    });

  }
}
