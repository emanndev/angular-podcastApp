import { Routes } from '@angular/router';
import { LoginComponent } from './admin/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  //   {
  //     path: 'admin',
  //     canActivate: [authGuard],
  //     children: [
  //       {
  //         path: '',
  //         pathMatch: 'full',
  //         redirectTo: 'dashboard',
  //       },
  //       {
  //         path: 'dashboard',
  //         loadComponent: () =>
  //           import('./admin/dashboard/dashboard.component').then(
  //             (m) => m.DashboardComponent
  //           ),
  //       },
  //       {
  //         path: 'confessions',
  //         loadComponent: () =>
  //           import('./admin/confessions/admin-confessions.component').then(
  //             (m) => m.AdminConfessionsComponent
  //           ),
  //       },
  //       {
  //         path: 'episodes',
  //         loadComponent: () =>
  //           import('./admin/episodes/admin-episodes.component').then(
  //             (m) => m.AdminEpisodesComponent
  //           ),
  //       },
  //       {
  //         path: 'playlists',
  //         loadComponent: () =>
  //           import('./admin/playlists/admin-playlists.component').then(
  //             (m) => m.AdminPlaylistsComponent
  //           ),
  //       },
  //       {
  //         path: 'team',
  //         loadComponent: () =>
  //           import('./admin/team/admin-team.component').then(
  //             (m) => m.AdminTeamComponent
  //           ),
  //       },
  //     ],
  //   },
  //   {
  //     path: '**',
  //     loadComponent: () =>
  //       import('./pages/not-found/not-found.component').then(
  //         (m) => m.NotFoundComponent
  //       ),
  //   },
  //   },
];
