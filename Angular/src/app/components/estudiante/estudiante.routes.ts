import { Routes } from '@angular/router';
import { EstudianteComponent } from './dashboard/est/est.component';
import { MisCursosComponent } from './dashboard/miscursos/miscursos.component';
import { AsignacionEstComponent } from './dashboard/asignacion/asignacionest.component';
import { CursoDetalleComponent } from './dashboard/miscursos/cursoDetalle.component';
import { MensajeEstudianteComponent } from './dashboard/mensaje/mensajeEst.component';
import { MensajeEstudianteFormComponent } from './dashboard/mensaje/mensajeEstForm.component';
import { MensajeEstudianteRespComponent } from './dashboard/mensaje/mensajeEstResp.component';
import { TicketComponent } from './dashboard/ticket/ticket.component';



export const estudiante_routes: Routes = [
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'estudiante/cursos', component: MisCursosComponent },
  { path: 'estudiante/cursos/:id', component: CursoDetalleComponent },
  { path: 'estudiante/asignacion', component: AsignacionEstComponent },
  { path: 'estudiante/mensaje', component: MensajeEstudianteComponent },
  { path: 'estudiante/mensaje/nuevo', component: MensajeEstudianteFormComponent },
  { path: 'estudiante/mensaje/responder/:id', component: MensajeEstudianteRespComponent },
  { path: 'estudiante/ticket', component: TicketComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'estudiante'}
];

