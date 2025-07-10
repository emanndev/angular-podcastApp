import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { TeamMembersService } from '../../core/services/team-members.service';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import {
  Episode,
  Playlist,
  TeamMember,
  DisplayPlaylist,
} from '../../model/podcast.models';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PublicNavbarComponent, FooterComponent],
})
export class HomePageComponent implements OnInit {
  episodes: Episode[] = [];
  featuredEpisodes: Episode[] = [];
  latestEpisodes: Episode[] = [];
  featuredPlaylists: DisplayPlaylist[] = [];
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
        this.featuredPlaylists = res.slice(0, 2).map((playlist) => ({
          ...playlist,
          randomImage: `https://picsum.photos/seed/playlist-${
            playlist.id
          }-${Math.floor(Math.random() * 10000)}/120/120`,
        }));
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
    this.teamService.getAllTeam().subscribe({
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
        profile_image: '',
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
        profile_image: '',
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
        profile_image: '',
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
