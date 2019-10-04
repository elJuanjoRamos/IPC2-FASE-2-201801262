import { Routes } from '@angular/router';
import { EstudianteComponent } from './dashboard/est/est.component';



export const estudiante_routes: Routes = [
  { path: 'estudiante', component: EstudianteComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'estudiante'}
];

