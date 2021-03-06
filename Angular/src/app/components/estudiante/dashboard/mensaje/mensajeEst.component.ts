import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../../../services/mensaje.service';

@Component({
  selector: 'app-mensajeest',
  templateUrl: './mensajeEst.component.html'
})
export class MensajeEstudianteComponent implements OnInit {

  arrayMensajes: any[] = [];
  arrayMensajesEnviados: any[] = [];
  constructor(private service: MensajeService) { }

  inicilizar() {
    this.service.getMisMensajes(localStorage.getItem('id')).subscribe(data => {
      this.arrayMensajes = data;
      console.log(data);
        });
    this.service.getMensajesEnviados(localStorage.getItem('id')).subscribe(data => {
      this.arrayMensajesEnviados = data;

    });
  }
  ngOnInit() {
    this.inicilizar();
  }
  eliminar(id:any) {
    this.service.delete(id).subscribe(data => {
      this.inicilizar();
    });
  }

}
