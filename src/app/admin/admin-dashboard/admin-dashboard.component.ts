import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Confession, Episode } from '../../model/podcast.models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    episodes: 0,
    confessions: 0,
    playlists: 0,
    team: 0,
  };

  recentConfessions: Confession[] = [];
  recentEpisodes: Episode[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentConfessions();
    this.loadRecentEpisodes();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private loadStats() {
    // Replace with real endpoints if they exist
    this.http
      .get<any>('https://api.rantsnconfess.com/v1/dashboard/summary')
      .subscribe({
        next: (res) => {
          this.stats = {
            episodes: res.episodes || 0,
            confessions: res.confessions || 0,
            playlists: res.playlists || 0,
            team: res.team || 0,
          };
        },
        error: () => {
          console.warn(
            '⚠️ Failed to load dashboard summary. Using default 0 values.'
          );
        },
      });
  }

  private loadRecentConfessions() {
    this.http
      .get<Confession[]>('https://api.rantsnconfess.com/v1/confessions')
      .subscribe({
        next: (confessions) => {
          this.recentConfessions = confessions.slice(0, 3);
        },
        error: () => {
          this.recentConfessions = [];
        },
      });
  }

  private loadRecentEpisodes() {
    this.http
      .get<Episode[]>('https://api.rantsnconfess.com/v1/episodes')
      .subscribe({
        next: (episodes) => {
          this.recentEpisodes = episodes.slice(0, 3);
        },
        error: () => {
          this.recentEpisodes = [];
        },
      });
  }
}
