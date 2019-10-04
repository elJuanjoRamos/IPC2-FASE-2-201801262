import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }
  usuario: any;
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.usuario = this.loginForm.value;
    if( this.usuario.username === 'admin') {
      this.router.navigate(['/home/dashboard/adm/admin']);

    } else if ( this.usuario.username === 'estudiante' ) {
      this.router.navigate(['/home/dashboard/est/estudiante']);
    } else if ( this.usuario.username === 'auxiliar'){
      this.router.navigate(['/home/dashboard/aux/auxiliar']);
    }
    //this.authenticationService.login(this.loginForm.value);
  }

}
