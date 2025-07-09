import { Routes } from '@angular/router';

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
  {
    path: 'admin',
    // canActivate: [authGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.adminRoutes),
  },

  // ✅ Home Page Route
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
    import('./pages/episode-detail/episode-detail.component').then(m => m.EpisodeDetailComponent),
},


  // Default & Wildcard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
