import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../core/services/playlist.service';
import { Playlist, Episode } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, PublicNavbarComponent, FooterComponent],
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
})
export class PlaylistDetailComponent implements OnInit {
  playlist: Playlist | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private audioService: AudioPlayerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadPlaylist(id);
    } else {
      this.error = 'Invalid playlist ID';
      this.loading = false;
    }
  }

  private loadPlaylist(id: number): void {
    this.loading = true;
    this.error = '';

    this.playlistService.getPlaylistById(id).subscribe({
      next: (res) => {
        this.playlist = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading playlist:', err);
        this.error = 'Failed to load playlist. Please try again.';
        this.loading = false;
      },
    });
  }

  playEpisode(episode: Episode): void {
    if (!episode.audio_url) {
      console.error('No audio URL available for this episode');
      return;
    }

    this.audioService.play({
      src: episode.audio_url,
      title: episode.title,
      description: episode.description,
      coverImage: this.getEpisodeImage(episode.img_url),
      autoplay: true,
      loop: false,
      showDownload: true,
      showSpeed: true,
    });
  }

  playAllEpisodes(): void {
    if (!this.playlist?.episodes || this.playlist.episodes.length === 0) {
      console.error('No episodes available to play');
      return;
    }

    // Play the first episode
    const firstEpisode = this.playlist.episodes[0];
    this.playEpisode(firstEpisode);
  }

  getEpisodeImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/400x300?text=Episode';
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    return `${environment.apiUrl}/storage/${imagePath}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  formatDuration(duration: number | string): string {
    if (!duration) return '';

    const seconds =
      typeof duration === 'string' ? parseInt(duration, 10) : duration;

    if (isNaN(seconds)) return '';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
