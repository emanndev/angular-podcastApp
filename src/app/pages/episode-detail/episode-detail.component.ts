import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
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
    this.episodeService.getEpisodeById(id).subscribe({
      next: (data) => {
        console.log('Episode data:', data);
        this.episode = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load episode';
        this.loading = false;
      }
    });
  }

  getEpisodeImage(imagePath: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/300x200?text=Episode';
    }
    return imagePath.startsWith('http') ? imagePath : `${environment.apiUrl}/storage/${imagePath}`;
  }
}
