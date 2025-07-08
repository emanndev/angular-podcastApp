import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./admin/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  // Admin Routes
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.adminRoutes),
  },

  // wildcard routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
