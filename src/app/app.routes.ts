import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin.routes';
import { AdminEpisodesComponent } from './admin/admin-episodes/admin-episodes.component';
import { EpisodeFormComponent } from './admin/episodes/episode-form/episode-form.component';

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
  {
    path: 'admin/episodes/create',
    loadComponent: () =>
      import('./admin/episodes/episode-create/episode-create.component').then(
        (m) => m.EpisodeCreateComponent
      ),
    // canActivate: [authGuard],
  },
  {
    path: 'admin/episodes/edit/:id',
    loadComponent: () =>
      import('./admin/episodes/episode-form/episode-form.component').then(
        (m) => m.EpisodeFormComponent
      ),
  },

  // Admin Routes
  {
    path: 'admin',
    //canActivate: [authGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.adminRoutes),
  },

  // wildcard routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
