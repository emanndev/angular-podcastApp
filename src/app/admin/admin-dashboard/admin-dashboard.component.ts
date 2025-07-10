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
    confessions: 0,
    playlists: 0,
    team: 0,
    growth: {
      confessions: 12,
      playlists: 8,
      team: 0,
    },
  };

  recentConfessions: Confession[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecentConfessions();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private loadRecentConfessions() {
    this.http
      .get<Confession[]>('https://api.rantsnconfess.com/v1/confessions')
      .subscribe({
        next: (confessions) => {
          this.recentConfessions = confessions.slice(0, 5);
          this.stats.confessions = confessions.length;
          this.isLoading = false;
        },
        error: () => {
          this.recentConfessions = [];
          this.isLoading = false;
        },
      });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'inactive':
        return 'gray';
      default:
        return 'gray';
    }
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
}
