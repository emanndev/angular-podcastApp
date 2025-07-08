import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EpisodeService } from '../../core/services/episode.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { TeamMembersService } from '../../core/services/team-members.service';

import { Episode, Playlist, TeamMember } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HomePageComponent implements OnInit {
  episodes: Episode[] = [];
  featuredEpisodes: Episode[] = [];
  latestEpisodes: Episode[] = [];
  featuredPlaylists: Playlist[] = [];
  teamMembers: TeamMember[] = [];

  loading = false;
  error = '';

  constructor(
    private episodeService: EpisodeService,
    private playlistService: PlaylistService,
    private teamService: TeamMembersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchEpisodes();
    this.fetchPlaylists();
    this.fetchTeamMembers();
  }

  private fetchEpisodes(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res: Episode[]) => {
        this.episodes = res;
        this.featuredEpisodes = res.slice(0, 3);
        this.latestEpisodes = res.slice(3);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load episodes.';
        this.loading = false;
      },
    });
  }

  private fetchPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (res: Playlist[]) => {
        this.featuredPlaylists = res.slice(0, 3);
      },
      error: () => {
        console.error('Could not load playlists.');
      },
    });
  }

  private fetchTeamMembers(): void {
    this.teamService.getAll().subscribe({
      next: (res: TeamMember[]) => {
        this.teamMembers = res;
      },
      error: () => {
        console.error('Failed to fetch team members.');
      },
    });
  }

  // ✅ Updated image methods to handle full URLs or relative paths
  getEpisodeImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/300x200?text=Episode';
    }
    return imagePath.startsWith('http') ? imagePath : `${environment.apiUrl}/storage/${imagePath}`;
  }

  getPlaylistImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/300x200?text=Playlist';
    }
    return imagePath.startsWith('http') ? imagePath : `${environment.apiUrl}/storage/${imagePath}`;
  }

  getTeamImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/100x100?text=Avatar';
    }
    return imagePath.startsWith('http') ? imagePath : `${environment.apiUrl}/storage/${imagePath}`;
  }
}
