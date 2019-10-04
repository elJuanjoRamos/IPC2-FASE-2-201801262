import { Routes } from '@angular/router';
import { AdminComponent } from './dashboard/adm/adm.component';



export const admin_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'admin'}
];

