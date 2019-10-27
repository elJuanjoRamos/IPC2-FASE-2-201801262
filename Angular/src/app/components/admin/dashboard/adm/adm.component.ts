import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { AsignacionEstudianteService } from '../../../../services/asignacionEstudiante.service';
import { CursoService } from '../../../../services/curso.service';


@Component({
  selector: 'app-admin',
  templateUrl: './adm.component.html'
})
export class AdminComponent implements OnInit {
  tickets:any;
  solicitudes:any;
  cursos:any;
  constructor(private service: TicketService, 
              private service2: AsignacionEstudianteService,
              private cursoService: CursoService) {
    this.inicializar();
   }
   inicializar() {
    this.service.getAll().subscribe(data => {
      this.tickets = data;
    });
    this.service2.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });
    this.cursoService.getAll().subscribe(data =>{
      this.cursos = data;
    });
   }
   eliminar(id:any) {
    this.service2.delete(id).subscribe(data => {
      this.inicializar();
    });
    this.service2.deleteSolicitud(id).subscribe(data => {
        this.inicializar();
    });
  }
  ngOnInit() {
  }

}
