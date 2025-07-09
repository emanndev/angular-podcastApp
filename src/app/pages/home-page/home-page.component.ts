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
     
        this.latestEpisodes = res.slice(0, 3);
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
      
        this.featuredPlaylists = res.slice(0, 2);
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

  // Image helper methods
  getEpisodeImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/400x200?text=Episode&bg=667eea&color=white';
    }
    return imagePath.startsWith('http')
      ? imagePath
      : `${environment.apiUrl}/storage/${imagePath}`;
  }

  getPlaylistImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/120x120?text=Playlist&bg=4f46e5&color=white';
    }
    return imagePath.startsWith('http')
      ? imagePath
      : `${environment.apiUrl}/storage/${imagePath}`;
  }

  getTeamImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/100x100?text=Team&bg=6b7280&color=white';
    }
    return imagePath.startsWith('http')
      ? imagePath
      : `${environment.apiUrl}/storage/${imagePath}`;
  }

  // Utility method to format duration 
  formatDuration(seconds: number): string {
    if (!seconds) return '45:30'; 
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}