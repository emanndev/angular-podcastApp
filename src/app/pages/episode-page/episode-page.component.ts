import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-episode-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss']
})
export class EpisodeListPageComponent implements OnInit {
  allEpisodes: Episode[] = [];
  filteredEpisodes: Episode[] = [];
  loading = true;
  error = '';

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe({
      next: (episodes) => {
        this.allEpisodes = episodes;
        this.filteredEpisodes = episodes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load episodes';
        this.loading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.filteredEpisodes = this.allEpisodes.filter((ep) =>
      ep.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  getEpisodeImage(imgUrl: string): string {
    return imgUrl?.startsWith('http')
      ? imgUrl
      : `${environment.apiUrl}/storage/${imgUrl}`;
  }
}
