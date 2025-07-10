import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EpisodeService } from '../../core/services/episode.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { TeamMembersService } from '../../core/services/team-members.service';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import { Episode, Playlist, TeamMember } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PublicNavbarComponent],
})
export class HomePageComponent implements OnInit {
  episodes: Episode[] = [];
  featuredEpisodes: Episode[] = [];
  latestEpisodes: Episode[] = [];
  featuredPlaylists: Playlist[] = [];
  teamMembers: TeamMember[] = [];

  playlistsLoaded = false;
  episodesLoaded = false;
  teamLoaded = false;
  error = '';

  constructor(
    private episodeService: EpisodeService,
    private playlistService: PlaylistService,
    private teamService: TeamMembersService
  ) {}

  ngOnInit(): void {
    // this.loading = true;
    this.fetchEpisodes();
    this.fetchPlaylists();
    this.fetchTeamMembers();
  }

  get allContentLoaded(): boolean {
    return this.episodesLoaded && this.playlistsLoaded && this.teamLoaded;
  }

  private fetchEpisodes(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (res: Episode[]) => {
        this.episodes = res;
        this.latestEpisodes = res.slice(0, 3);
        this.episodesLoaded = true;
        this.checkAllLoaded();
      },
      error: (error) => {
        console.error('Error fetching episodes:', error);
        this.error = 'Failed to load episodes.';
        this.episodesLoaded = true;
        this.checkAllLoaded();
      },
    });
  }

  private fetchPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (res: Playlist[]) => {
        this.featuredPlaylists = res.slice(0, 2);
        this.playlistsLoaded = true;
        console.log('Featured playlists loaded:', this.featuredPlaylists);
      },
      error: (error) => {
        console.error('Error loading playlists:', error);
        this.playlistsLoaded = true;
      },
    });
  }

  private fetchTeamMembers(): void {
    this.teamService.getAll().subscribe({
      next: (res: TeamMember[]) => {
        if (res && res.length > 0) {
          this.teamMembers = res;
        } else {
          this.teamMembers = this.getFallbackTeamMembers();
        }
        this.teamLoaded = true;
        console.log('Team members loaded:', this.teamMembers);
      },
      error: (error) => {
        console.error('Error fetching team members:', error);

        this.teamMembers = this.getFallbackTeamMembers();
        this.teamLoaded = true;
      },
    });
  }

  private checkAllLoaded(): void {
    if (this.allContentLoaded) {
      // this.loading = false;
    }
  }

  private getFallbackTeamMembers(): TeamMember[] {
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Host & Producer',
        bio: 'Award-winning journalist with 10+ years in broadcasting',
        image: '',
        social_media: [
          {
            id: 1,
            url: 'https://twitter.com/sarahjohnson',
            platform: 'twitter',
          },
        ],
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Co-Host',
        bio: 'Tech entrepreneur and startup advisor passionate about innovation',
        image: '',
        social_media: [
          {
            id: 2,
            url: 'https://twitter.com/mikechen',
            platform: 'twitter',
          },
        ],
      },
      {
        id: 3,
        name: 'Emma Davis',
        role: 'Audio Engineer',
        bio: 'Professional audio engineer with expertise in podcast production',
        image: '',
        social_media: [
          {
            id: 3,
            url: 'https://twitter.com/emmadavis',
            platform: 'twitter',
          },
        ],
      },
    ];
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

  // Helper method to get social media icon
  getSocialMediaIcon(platform: string): string {
    switch (platform?.toLowerCase()) {
      case 'twitter':
        return 'twitter';
      case 'linkedin':
        return 'linkedin';
      case 'github':
        return 'github';
      default:
        return 'twitter';
    }
  }
}
