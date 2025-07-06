import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin.routes';
import { AdminEpisodesComponent } from './admin/admin-episodes/admin-episodes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

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
