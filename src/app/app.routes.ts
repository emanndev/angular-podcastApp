import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin.routes';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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

  {
    path: 'episode/:id',
    loadComponent: () =>
      import('./pages/episode-detail/episode-detail.component').then(
        (m) => m.EpisodeDetailComponent
      ),
  },

  // Default & Wildcard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
