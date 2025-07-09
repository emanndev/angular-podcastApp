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

  // Home Page Route
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },

  // Default & Wildcard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
