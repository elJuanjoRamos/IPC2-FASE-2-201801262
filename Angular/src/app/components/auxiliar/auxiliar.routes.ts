import { Routes } from '@angular/router';
import { AuxiliarComponent } from './dashboard/auxi/aux.component';



export const auxiliar_routes: Routes = [
  { path: 'auxiliar', component: AuxiliarComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'auxiliar'}
];

