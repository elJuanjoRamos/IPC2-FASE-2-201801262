import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TicketService } from '../../../../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  arrayTickets: any;
  constructor(private router:Router, private activaderRoutes: ActivatedRoute,
              private formBuilder: FormBuilder, private service: TicketService) { }

  ngOnInit() {
    this.cargarForm();
    this.inicializar();
  }
  inicializar(){
    this.service.getMisTickets(localStorage.getItem('id')).subscribe(data => {
      this.arrayTickets = data;
    });
  }

  cargarForm() {
    this.loginForm = this.formBuilder.group({
      asunto: ['', Validators.required],
      cuerpo: ['', Validators.required],
      idUsuario: [localStorage.getItem('id'), Validators.required],
  });
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    };
    this.service.post(this.loginForm.value)
    .subscribe(data => {
        this.inicializar();
    });
  }
}
