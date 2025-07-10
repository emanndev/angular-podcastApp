import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Episode } from '../../model/podcast.models';
import { EpisodeService } from '../../core/services/episode.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.episodeService.getEpisodes().subscribe({
      next: (episodes) => {
        const found = episodes.find((ep) => ep.id === id);
        if (found) {
          this.episode = found;
        } else {
          this.error = 'Episode not found.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch episode data.';
        this.loading = false;
      },
    });
  }

  getEpisodeImage(path: string): string {
    if (!path) {
      return 'https://via.placeholder.com/500x300?text=Episode';
    }
    return path.startsWith('http')
      ? path
      : `${environment.apiUrl}/storage/${path}`;
  }
}
