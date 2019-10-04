import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home.component';
//admin
import { DashAdminComponent } from './components/admin/dashboard/dashAdmin.component';
import { AdminComponent } from './components/admin/dashboard/adm/adm.component';
import { DashEstudianteComponent } from './components/estudiante/dashboard/dashEstudiante.component';
import { EstudianteComponent } from './components/estudiante/dashboard/est/est.component';






@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    //ESTO ES DE ADMIN
    AdminComponent,
    DashAdminComponent,
    //Esto es estudiante
    EstudianteComponent,
    DashEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
