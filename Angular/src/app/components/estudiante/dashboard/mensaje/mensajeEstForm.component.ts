import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from '../../../../services/mensaje.service';


@Component({
  selector: 'app-mensajeestform',
  templateUrl: './mensajeEstForm.component.html'
})
export class MensajeEstudianteFormComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  usuarios: any[] = [];
  validar: boolean = false;
  fileToUpload: File = null;

  constructor(private service: UsuarioService,
    private formBuilder: FormBuilder, private router: Router, private mensajeService: MensajeService) {
      this.loginForm = this.formBuilder.group({
        Usuario_idUsuario: ['', Validators.required],
        asunto: ['', Validators.required],
        mensaje: ['', Validators.required]
      });
     }


  ngOnInit() {
    this.inicializarUsuarios();
  }
  get f() { return this.loginForm.controls; }


  inicializarUsuarios() {
    this.service.getMisAux(localStorage.getItem('id')).subscribe(data => {
        this.usuarios = data;
        console.log(data);
      }
    );
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    var form = JSON.parse(JSON.stringify(this.loginForm.value));
    let archivo;
    if (this.fileToUpload === null) {
      archivo = '-';
    } else {
      const formData: FormData = new FormData();
      formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
      archivo = formData;
    }

    var data = {
      usuario1: localStorage.getItem('id'),
      usuario2: form.Usuario_idUsuario,
      asunto: form.asunto,
      mensaje: form.mensaje,
      enviadoPor: localStorage.getItem('id'),
      enviadoPara: form.Usuario_idUsuario,
      file: archivo
    }
    this.mensajeService.post(data)
        .subscribe(res => {
          if (res) {
            this.router.navigate(['/home/dashboard/est/estudiante/mensaje']);
          }
        });
  }

}
