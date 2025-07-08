import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminConfessionsComponent } from './admin/admin-confessions/admin-confessions.component';
import { AdminPlaylistsComponent } from './admin/admin-playlists/admin-playlists.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'confessions', component: AdminConfessionsComponent },
      { path: 'playlists', component: AdminPlaylistsComponent },

      {
        path: 'playlists/create',
        loadComponent: () =>
          import(
            './admin/playlists/create-playlist/create-playlist.component'
          ).then((m) => m.CreatePlaylistComponent),
      },
      {
        path: 'playlists/edit/:id',
        loadComponent: () =>
          import(
            './admin/playlists/edit-playlist/edit-playlist.component'
          ).then((m) => m.EditPlaylistComponent),
      },

      {
        path: 'team',
        loadComponent: () =>
          import('./admin/admin-team/admin-team.component').then(
            (m) => m.AdminTeamComponent
          ),
      },
      {
        path: 'team/create',
        loadComponent: () =>
          import('./admin/team/create-team/create-team.component').then(
            (m) => m.CreateTeamComponent
          ),
      },
      {
        path: 'team/edit/:id',
        loadComponent: () =>
          import('./admin/team/edit-team/edit-team.component').then(
            (m) => m.EditTeamComponent
          ),
      },
    ],
  },
];
