import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../api/models/curso.model';
import { CursoService } from '../../../../services/curso.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit {
    arrayCursos: Curso[] = [];
    loginForm: FormGroup;
    loginForm2: FormGroup;
    loading = false;
    submitted = false;
    uri: any;
    cursoOriginal: any;
    filter:any;
    p:any;
    varAuxiliar:any;
    estado: any;
    mensaje: any;
    info: any;
  constructor(private service: CursoService,  private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, private router: Router) {
        this.activatedRoute.params.subscribe(params => {
            this.uri = params["id"];
            if (this.uri === 'gestion') {
            } else {
              this.service.getCurso(this.uri).subscribe(c => {
                  this.cursoOriginal = c;
                  this.loginForm = new FormGroup({
                    'nombre': new FormControl(this.cursoOriginal.nombre),
                    'codigo': new FormControl(this.cursoOriginal.codigo),
                    'estado': new FormControl(this.cursoOriginal.estado)
                  });
                });
            }
          });
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        estado: ['', Validators.required]
    });
    this.inicializar();
  }
  get f() { return this.loginForm.controls; }

  inicializar( ) {
      this.service.getAll().subscribe(data => {
          this.arrayCursos = data;
      });
  }

  onSubmit() {
    this.submitted = true;
                // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    if (this.uri === 'gestion') {
        this.service.post(this.loginForm.value)
        .subscribe(res => {
          this.inicializar();
          this.submitted = false;
          this.loading = false;
        });
      } else {
          var curso: any = this.loginForm.value;
          var data = {
              nombre: curso.nombre,
              codigo: this.cursoOriginal.codigo,
              estado: curso.estado
          };
          this.service.put(data, this.uri)
          .subscribe(res => {
          this.inicializar();
        });
      }
      this.loginForm.reset();
  }
  public cancelar() {
    this.loginForm.reset();
    this.router.navigate(['/home/dashboard/adm/admin/cursos/gestion']);
    this.submitted = true;
  }

  borrar(id: any) {
    this.service.delete(id)
    .subscribe(res => {
      var informacion = JSON.parse(JSON.stringify(res));
      if (informacion.ok === true ){
        this.inicializar();
    } else {
        this.estado = informacion.ok;
        this.mensaje = informacion.error;
        setTimeout(() => {
          this.estado = true;
        }, 3000);
      }
      this.inicializar();
    });
  }

  obtenerId(id:any) {
    this.varAuxiliar = id;
  }

  aceptarEliminar(){
    this.borrar(this.varAuxiliar);
  }

  deshabilitar(curso: any){
    var data = {
        nombre:curso.nombre,
        codigo: curso.codigo,
        estado: 0
    };
    this.service.put(data, curso.idCurso).subscribe(data => {
        this.inicializar();
    });
  }
  habilitar(curso: any){
    var data = {
        nombre:curso.nombre,
        codigo: curso.codigo,
        estado: 1
    };
    this.service.put(data, curso.idCurso).subscribe(data => {
        this.inicializar();
    });
  }

}
