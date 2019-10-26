import { Routes } from '@angular/router';
import { AdminComponent } from './dashboard/adm/adm.component';
import { UsuarioComponent } from './dashboard/usuarios/usuario.component';
import { UsuarioFormComponent } from './dashboard/usuarios/usuarioForm.component';
import { CursoComponent } from './dashboard/cursos/cursos.component';
import { DetalleCursoComponent } from './dashboard/detalleCurso/detalleCurso.component';
import { DetalleCursoFormComponent } from './dashboard/detalleCurso/detalleCursoForm.component';
import { AsignacionAuxiliar } from './dashboard/asigAuxiliar/asignacionAuxiliar.component';
import { AsignacionForm } from './dashboard/asigAuxiliar/asignacionForm.component';
import { DesasignacionComponent } from './dashboard/desasignacion/desasignacion.component';
import { TicketAdmComponent } from './dashboard/ticket/ticketadm.component';



export const admin_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/usuarios', component: UsuarioComponent },
  { path: 'admin/usuarios/:id', component: UsuarioFormComponent },
  { path: 'admin/cursos/:id', component: CursoComponent },
  { path: 'admin/detallecurso', component: DetalleCursoComponent },
  { path: 'admin/detallecurso/:id', component: DetalleCursoFormComponent },
  { path: 'admin/asignacionauxiliar', component: AsignacionAuxiliar },
  { path: 'admin/asignacionauxiliar/:id', component: AsignacionForm },
  { path: 'admin/desasignacion', component: DesasignacionComponent },
  { path: 'admin/ticket', component: TicketAdmComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'admin'}
];

