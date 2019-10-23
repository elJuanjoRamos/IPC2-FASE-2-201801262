import { Routes } from '@angular/router';
import { ForoComponent } from './dashboard/foro/foro.component';
import { ForoFormComponent } from './dashboard/foro/foroForm.component';
import { MensajeComponent } from './dashboard/mensaje/mensaje.component';
import { MensajeFormComponent } from './dashboard/mensaje/mensajeForm.component';
import { AuxiliarComponent } from './dashboard/auxiliard/auxiliar.component';
import { MensajeRespuestaComponent } from './dashboard/mensaje/mensajeRespuesta.component';
import { ActividadComponent } from './dashboard/actividad/actividad.component';
import { DetalleCursoAuxiliarComponent } from './dashboard/actividad/detalleCurso.component';
import { EvaluacionComponent } from './dashboard/evaluacion/evaluacion.component';
import { EvaluacionFormComponent } from './dashboard/evaluacion/evaluacionForm.component';



export const auxiliar_routes: Routes = [
  { path: 'auxiliar', component: AuxiliarComponent },
  { path: 'auxiliar/foro', component: ForoComponent },
  { path: 'auxiliar/foro/nuevo', component: ForoFormComponent },
  { path: 'auxiliar/mensaje', component: MensajeComponent },
  { path: 'auxiliar/mensaje/nuevo', component: MensajeFormComponent },
  { path: 'auxiliar/mensaje/responder/:id', component: MensajeRespuestaComponent },
  { path: 'auxiliar/cursos', component: ActividadComponent },
  { path: 'auxiliar/cursos/:id', component: DetalleCursoAuxiliarComponent },
  { path: 'auxiliar/evaluaciones', component: EvaluacionComponent },
  { path: 'auxiliar/evaluaciones/:id', component: EvaluacionFormComponent },

  //{ path: 'auxiliar/cursos/:id', component: ActividadFormComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'auxiliar'}
];

