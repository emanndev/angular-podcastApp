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
  };

  recentConfessions: Confession[] = [];

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
          this.recentConfessions = confessions.slice(0, 3);
        },
        error: () => {
          this.recentConfessions = [];
        },
      });
  }
}
