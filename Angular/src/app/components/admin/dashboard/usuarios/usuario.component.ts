import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../api/models/usuario.model';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
    arrayUsuarios: Usuario[] = [];
    items = [];
    pageOfItems: Array<any>;
    varAuxiliar: any; 
  constructor(private service: UsuarioService) { }

  ngOnInit() {
    this.inicializarData();
  }

  inicializarData() {
    this.service.getAll().subscribe(data => {
        console.log(data);
        this.arrayUsuarios = data;
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    this.arrayUsuarios = pageOfItems;
  }
//<jw-pagination [items]="items" (changePage)="onChangePage($event)"></jw-pagination>
  borrar(id: any) {
    this.service.delete(id)
    .subscribe(res => {
      this.inicializarData();
    });
  }

  obtenerId(id:any) {
    this.varAuxiliar = id;
  }

  aceptarEliminar(){
    this.borrar(this.varAuxiliar);
  }

}
