import { Routes } from '@angular/router';
import { AdminComponent } from './dashboard/adm/adm.component';
import { UsuarioComponent } from './dashboard/usuarios/usuario.component';
import { UsuarioFormComponent } from './dashboard/usuarios/usuarioForm.component';
import { CursoComponent } from './dashboard/cursos/cursos.component';



export const admin_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/usuarios', component: UsuarioComponent },
  { path: 'admin/usuarios/:id', component: UsuarioFormComponent },
  { path: 'admin/cursos/:id', component: CursoComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'admin'}
];

