import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoutes } from './admin.routes';
import { EpisodeListPageComponent } from './pages/episode-page/episode-page.component';
import { EpisodeDetailComponent } from './pages/episode-detail/episode-detail.component';
import { ConfessionsComponent } from './pages/confessions/confessions.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PlaylistDetailComponent } from './pages/playlist-detail/playlist-detail.component';

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
    component: HomePageComponent,
  },

  { path: 'episodes', component: EpisodeListPageComponent },

  {
    path: 'episode/:id',
    component: EpisodeDetailComponent,
  },

  {
    path: 'playlists',
    component: PlaylistPageComponent,
  },
  {
    path: 'playlists/:id',
    component: PlaylistDetailComponent,
  },
  {
    path: 'confessions',
    component: ConfessionsComponent,
  },

  // Default & Wildcard
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
