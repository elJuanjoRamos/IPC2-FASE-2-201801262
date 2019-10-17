import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';


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
import { AuxiliarComponent } from './components/auxiliar/dashboard/auxi/aux.component';
import { DashAuxiliarComponent } from './components/auxiliar/dashboard/dashAuxiliar.component';
import { UsuarioComponent } from './components/admin/dashboard/usuarios/usuario.component';
import { FooterComponent } from './components/admin/footer/footer.component';
import { NavBarComponent } from './components/admin/navbar/navbar.component';
import { UsuarioFormComponent } from './components/admin/dashboard/usuarios/usuarioForm.component';
import { CursoComponent } from './components/admin/dashboard/cursos/cursos.component';
import { DetalleCursoComponent } from './components/admin/dashboard/detalleCurso/detalleCurso.component';
import { DetalleCursoFormComponent } from './components/admin/dashboard/detalleCurso/detalleCursoForm.component';
import { AsignacionAuxiliar } from './components/admin/dashboard/asigAuxiliar/asignacionAuxiliar.component';
import { AsignacionForm } from './components/admin/dashboard/asigAuxiliar/asignacionForm.component';



//servicios
import { UsuarioService } from './services/usuario.service';
import { CursoService } from './services/curso.service';
import { DetalleCursoService } from './services/detalleCurso.service';
import { AsignacionAuxiliarService } from './services/asignacionAuxiliar.service';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    //ESTO ES DE ADMIN
    AdminComponent,
    DashAdminComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    NavBarComponent,
    CursoComponent,
    DetalleCursoComponent,
    DetalleCursoFormComponent,
    AsignacionAuxiliar,
    AsignacionForm,
    //Esto es estudiante
    EstudianteComponent,
    DashEstudianteComponent,
    FooterComponent,
    //Esto es auxiliar
    AuxiliarComponent,
    DashAuxiliarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioService,
    CursoService,
    DetalleCursoService,
    AsignacionAuxiliarService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
