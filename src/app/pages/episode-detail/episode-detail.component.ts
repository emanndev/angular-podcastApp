import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EpisodeService } from '../../core/services/episode.service';
import { PlaylistService } from '../../core/services/playlist.service';
import {
  Episode,
  Playlist,
  AudioPlayerConfig,
} from '../../model/podcast.models';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import { AudioPlayerBarComponent } from '../../shared/components/audio-player-bar/audio-player-bar.component';
import { AudioPlayerService } from '../../core/services/audio-player.service';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, PublicNavbarComponent],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode | null = null;
  loading = true;
  error = '';
  relatedPlaylists: Playlist[] = [];
  episodeTags: string[] = [];
  showAudioPlayer = false;
  playerConfig: AudioPlayerConfig | null = null;
  isPlaying = false;
  audioServiceVisible = false;

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private playlistService: PlaylistService,
    private audioService: AudioPlayerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.episodeService.getEpisodes().subscribe({
      next: (episodes) => {
        const found = episodes.find((e) => e.id === id);
        if (!found) {
          this.error = 'Episode not found';
          this.loading = false;
          return;
        }

        this.episode = found;
        this.generateTags(found);

        // Now fetch all playlists and filter for those including this episode
        this.playlistService.getAllPlaylists().subscribe({
          next: (playlists) => {
            this.relatedPlaylists = playlists.filter((p) =>
              p.episodes.some((ep) => ep.id === found.id)
            );
            this.loading = false;
          },
          error: () => {
            this.relatedPlaylists = [];
            this.loading = false;
          },
        });
      },
      error: () => {
        this.error = 'Failed to load episode';
        this.loading = false;
      },
    });

    this.audioService.visible$.subscribe((visible) => {
      this.audioServiceVisible = visible;
    });
  }

  private generateTags(episode: Episode): void {
    const tags: string[] = [];

    if (
      episode.description.toLowerCase().includes('ai') ||
      episode.title.toLowerCase().includes('ai') ||
      episode.description.toLowerCase().includes('artificial intelligence')
    ) {
      tags.push('AI');
    }

    if (
      episode.description.toLowerCase().includes('health') ||
      episode.title.toLowerCase().includes('health')
    ) {
      tags.push('Healthcare');
    }

    if (
      episode.description.toLowerCase().includes('tech') ||
      episode.title.toLowerCase().includes('tech') ||
      episode.description.toLowerCase().includes('technology')
    ) {
      tags.push('Technology');
    }

    if (
      episode.description.toLowerCase().includes('innovation') ||
      episode.title.toLowerCase().includes('innovation')
    ) {
      tags.push('Innovation');
    }

    if (
      episode.description.toLowerCase().includes('future') ||
      episode.title.toLowerCase().includes('future')
    ) {
      tags.push('Future Tech');
    }

    if (
      episode.description.toLowerCase().includes('business') ||
      episode.title.toLowerCase().includes('business')
    ) {
      tags.push('Business');
    }

    if (
      episode.description.toLowerCase().includes('science') ||
      episode.title.toLowerCase().includes('science')
    ) {
      tags.push('Science');
    }

    if (tags.length === 0) {
      tags.push('Podcast', 'Discussion');
    }

    this.episodeTags = tags.slice(0, 4);
  }

  getEpisodeImage(imagePath: string): string {
    return !imagePath
      ? 'https://via.placeholder.com/400x300?text=Episode'
      : imagePath.startsWith('http')
      ? imagePath
      : `${environment.apiUrl}/storage/${imagePath}`;
  }

  getPlaylistImage(playlistId: number): string {
    return `https://picsum.photos/seed/playlist-${playlistId}/300/200`;
  }

  loadRelatedPlaylists(episodeId: number): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.relatedPlaylists = playlists.filter((pl) =>
          pl.episodes?.some((ep) => ep.id === episodeId)
        );
      },
      error: () => {
        console.warn('Failed to load related playlists');
      },
    });
  }

  formatDuration(duration: string | number | null): string {
    if (!duration) return '45:30';

    if (typeof duration === 'string' && duration.includes(':')) {
      return duration;
    }

    const seconds =
      typeof duration === 'string' ? parseInt(duration) : duration;
    if (isNaN(seconds)) return '45:30';

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onShareEpisode(): void {
    if (navigator.share && this.episode) {
      navigator
        .share({
          title: this.episode.title,
          text: this.episode.description,
          url: window.location.href,
        })
        .catch((error) => {
          console.log('Error sharing:', error);
          this.fallbackShare();
        });
    } else {
      this.fallbackShare();
    }
  }

  private fallbackShare(): void {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        console.log('URL copied to clipboard');
      });
    }
  }

  onPlayEpisode(): void {
    if (this.episode?.audio_url) {
      this.audioService.play({
        src: this.episode.audio_url,
        title: this.episode.title,
        description: this.episode.description,
        coverImage: this.episode.img_url,
        autoplay: true,
        loop: false,
        showDownload: true,
        showSpeed: true,
      });
    }
  }

  onClosePlayer(): void {
    this.showAudioPlayer = false;
    this.isPlaying = false;
    this.playerConfig = null;
  }
}
