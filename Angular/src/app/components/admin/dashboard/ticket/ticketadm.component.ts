import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TicketService } from '../../../../services/ticket.service';

@Component({
  selector: 'app-ticketadm',
  templateUrl: './ticketadm.component.html'
})
export class TicketAdmComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  arrayTickets: any;
  constructor(private router:Router, private activaderRoutes: ActivatedRoute,
              private formBuilder: FormBuilder, private service: TicketService) { }

  ngOnInit() {
    this.inicializar();
  }
  inicializar(){
    this.service.getAll().subscribe(data => {
      this.arrayTickets = data;
      console.log(data);
    });
  }
    actualizar1(ticket: any){
        var data = {
            idTicket: ticket.idTicket,
            asunto: ticket.asunto,
            cuerpo: ticket.cuerpo,
            enviado: 1,
            recibido: 1,
            enproceso: 0,
            terminado: 0
        }
        this.service.put(data, data.idTicket).subscribe(d => {
            this.inicializar();
        });
    }
    actualizar2(ticket: any){
        var data = {
            idTicket: ticket.idTicket,
            asunto: ticket.asunto,
            cuerpo: ticket.cuerpo,
            enviado: 1,
            recibido: 1,
            enproceso: 1,
            terminado: 0
        }
        this.service.put(data, data.idTicket).subscribe(d => {
            this.inicializar();
        });
    }
    actualizar3(ticket: any){
        var data = {
            idTicket: ticket.idTicket,
            asunto: ticket.asunto,
            cuerpo: ticket.cuerpo,
            enviado: 1,
            recibido: 1,
            enproceso: 1,
            terminado: 1
        }
        this.service.put(data, data.idTicket).subscribe(d => {
            this.inicializar();
        });
    }
}
