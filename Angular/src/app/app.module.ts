import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import { NavBarAuxComponent } from './components/auxiliar/navbar/navbar.component';
import { ForoComponent } from './components/auxiliar/dashboard/foro/foro.component';
import { ForoFormComponent } from './components/auxiliar/dashboard/foro/foroForm.component';
import { MensajeComponent } from './components/auxiliar/dashboard/mensaje/mensaje.component';
import { MensajeFormComponent } from './components/auxiliar/dashboard/mensaje/mensajeForm.component';
import { AuxiliarComponent } from './components/auxiliar/dashboard/auxiliard/auxiliar.component';
import { MensajeRespuestaComponent } from './components/auxiliar/dashboard/mensaje/mensajeRespuesta.component';
import { ActividadComponent } from './components/auxiliar/dashboard/actividad/actividad.component';
import { DetalleCursoAuxiliarComponent } from './components/auxiliar/dashboard/actividad/detalleCurso.component';
import { EvaluacionComponent } from './components/auxiliar/dashboard/evaluacion/evaluacion.component';
import { EvaluacionFormComponent } from './components/auxiliar/dashboard/evaluacion/evaluacionForm.component';
import { NavBarEstComponent } from './components/estudiante/navbar/navbarEst.component';
import { MisCursosComponent } from './components/estudiante/dashboard/miscursos/miscursos.component';
import { AsignacionEstComponent } from './components/estudiante/dashboard/asignacion/asignacionest.component';
import { CursoDetalleComponent } from './components/estudiante/dashboard/miscursos/cursoDetalle.component';


//servicios
import { UsuarioService } from './services/usuario.service';
import { CursoService } from './services/curso.service';
import { DetalleCursoService } from './services/detalleCurso.service';
import { AsignacionAuxiliarService } from './services/asignacionAuxiliar.service';
import { AuthenticationService } from './services/authentication.service';
import { MensajeService } from './services/mensaje.service';
import { ActividadService } from './services/actividad.service';
import { EvaluacionService } from './services/evaluaion.service';
import { TipoEvaluacionService } from './services/tipoEvaluacion.service';
import { AsignacionEstudianteService } from './services/asignacionEstudiante.service';
import { MensajeEstudianteComponent } from './components/estudiante/dashboard/mensaje/mensajeEst.component';
import { RegistroAuxiliarComponent } from './registro/registroAuxiliar.component';
import { DesasignacionComponent } from './components/admin/dashboard/desasignacion/desasignacion.component';
import { MensajeEstudianteFormComponent } from './components/estudiante/dashboard/mensaje/mensajeEstForm.component';
import { MensajeEstudianteRespComponent } from './components/estudiante/dashboard/mensaje/mensajeEstResp.component';
import { TicketComponent } from './components/estudiante/dashboard/ticket/ticket.component';
import { TicketService } from './services/ticket.service';
import { TicketAdmComponent } from './components/admin/dashboard/ticket/ticketadm.component';



@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent,
    RegistroComponent,
    RegistroAuxiliarComponent,
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
    DesasignacionComponent,
    TicketAdmComponent,
    //Esto es estudiante
    EstudianteComponent,
    DashEstudianteComponent,
    FooterComponent,
    NavBarEstComponent,
    MisCursosComponent,
    AsignacionEstComponent,
    CursoDetalleComponent,
    MensajeEstudianteComponent,
    MensajeFormComponent,
    MensajeRespuestaComponent,
    MensajeEstudianteFormComponent,
    MensajeEstudianteRespComponent,
    TicketComponent,
   
    //Esto es auxiliar
    AuxiliarComponent,
    DashAuxiliarComponent,
    NavBarAuxComponent,
    ForoComponent,
    ForoFormComponent,
    MensajeComponent,
    MensajeFormComponent,
    MensajeRespuestaComponent,
    ActividadComponent,
    DetalleCursoAuxiliarComponent,
    EvaluacionComponent,
    EvaluacionFormComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
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
    AuthenticationService,
    MensajeService,
    ActividadService,
    EvaluacionService,
    TipoEvaluacionService,
    AsignacionEstudianteService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
