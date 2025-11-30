import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
   {
    path: 'listas',
    canActivate: [authGuard],
    loadComponent: () => import('./components/lista-reproduccion/lista-list/lista-list')
      .then(m => m.ListaListComponent)
  },
  {
    path: 'listas/nueva',
    canActivate: [authGuard],
    loadComponent: () => import('./components/lista-reproduccion/lista-form/lista-form')
      .then(m => m.ListaFormComponent)
  },
  {
  path: 'listas/:nombre',
  canActivate: [authGuard],
  loadComponent: () => import('./components/lista-reproduccion/lista-detail/lista-detail')
    .then(m => m.ListaDetailComponent)
}
];
