import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
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
            (m) => m.AdminConfessionsComponent
          ),
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('./admin/admin-playlists/admin-playlists.component').then(
            (m) => m.AdminPlaylistsComponent
          ),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./admin/admin-team/admin-team.component').then(
            (m) => m.AdminTeamComponent
          ),
      },
    ],
  },
];
