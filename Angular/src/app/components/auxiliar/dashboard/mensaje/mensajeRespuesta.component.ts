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
  respuestas: any[] = [];
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
      this.mensajeService.getRespuestas(this.uri).subscribe(data => {
        this.respuestas = data;
        console.log(data);
      });
      this.loginForm = this.formBuilder.group({
        mensaje: ['', Validators.required]
      });

    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    var form = JSON.parse(JSON.stringify(this.loginForm.value));

    var data = {
      emisor: this.info.recept,
      receptor: this.info.emisorM,
      asunto: this.info.asunto,
      cuerpo: form.mensaje,
      archivo: '-',
      idMensaje: this.uri
    }
    this.mensajeService.postRespuesta(data)
        .subscribe(res => {
          this.router.navigate(['/home/dashboard/aux/auxiliar/mensaje']);
        });
  }

}
