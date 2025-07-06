import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ConfessionsComponent } from './admin/admin-confessions/admin-confessions.component';
import { AdminEpisodesComponent } from './admin/admin-episodes/admin-episodes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public
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

  // Admin Routes (Protected)
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'confessions',
        loadComponent: () =>
          import('./admin/admin-confessions/admin-confessions.component').then(
            (m) => m.ConfessionsComponent
          ),
      },
      {
        path: 'episodes',
        loadComponent: () =>
          import('./admin/admin-episodes/admin-episodes.component').then(
            (m) => m.AdminEpisodesComponent
          ),
      },
    ],
  },

  // Wildcard fallback
  {
    path: '**',
    redirectTo: '',
  },
];
