import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from '../../../../services/mensaje.service';

@Component({
  selector: 'app-mensajerespuesta',
  templateUrl: './mensajeRespuesta.component.html'
})
export class MensajeRespuestaComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  usuarios: any[] = [];
  mensaje: any;
  info:any;
  uri: any;
  fileToUpload: File = null;

  constructor(private service: UsuarioService,
    private formBuilder: FormBuilder, private router: Router, private mensajeService: MensajeService,
    private activaderRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activaderRoutes.params.subscribe(params => {
      this.uri = params["id"];
      this.mensajeService.get(this.uri).subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data));
      }); 
      this.loginForm = this.formBuilder.group({
        mensaje: ['', Validators.required]
      });

    });
  }
  get f() { return this.loginForm.controls; }

}
