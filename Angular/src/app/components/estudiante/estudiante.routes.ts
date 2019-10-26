import { Routes } from '@angular/router';
import { EstudianteComponent } from './dashboard/est/est.component';
import { MisCursosComponent } from './dashboard/miscursos/miscursos.component';
import { AsignacionEstComponent } from './dashboard/asignacion/asignacionest.component';
import { CursoDetalleComponent } from './dashboard/miscursos/cursoDetalle.component';



export const estudiante_routes: Routes = [
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'estudiante/cursos', component: MisCursosComponent },
  { path: 'estudiante/cursos/:id', component: CursoDetalleComponent },
  { path: 'estudiante/asignacion', component: AsignacionEstComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'estudiante'}
];

