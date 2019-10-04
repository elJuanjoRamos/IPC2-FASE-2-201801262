import { Routes } from '@angular/router';


import { DashAdminComponent } from './admin/dashboard/dashAdmin.component';
import { admin_routes } from './admin/admin.routes';

import { estudiante_routes } from './estudiante/estudiante.routes';
import { DashEstudianteComponent } from './estudiante/dashboard/dashEstudiante.component';



export const home_routes: Routes = [
  //ESTO ES ADMIN
  { path: 'dashboard/adm', component: DashAdminComponent, children: admin_routes/*, canActivate: [ AuthGuardService ]*/ },
  { path: 'dashboard/est', component: DashEstudianteComponent, children: estudiante_routes/*, canActivate: [ AuthGuardService ]*/ },
  //{ path: 'dashboard/aux', component: DashboardClienteComponent, children: cliente_routes/*, canActivate: [ AuthGuardService ]*/ },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

