import { Component, inject, OnInit } from '@angular/core';
import { Episode } from '../../model/podcast.models';
import { MOCK_EPISODES } from '../../shared/mock-data';
import { CommonModule } from '@angular/common';
import { EpisodeService } from '../../core/services/episode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-episodes.component.html',
  styleUrls: ['./admin-episodes.component.scss'],
})
export class AdminEpisodesComponent implements OnInit {
  episodes: Episode[] = MOCK_EPISODES;

  paginatedEpisodes: Episode[] = [];
  currentPage = 1;
  pageSize = 6;

  totalPages = 0;

  constructor(private episodeService: EpisodeService, private router: Router) {}

  ngOnInit() {
    this.episodeService.getEpisodes().subscribe({
      next: (res) => {
        this.episodes = res;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load episodes:', err);
        // fallback mock data
        this.episodes = MOCK_EPISODES;
        this.updatePagination();
      },
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEpisodes = this.episodes.slice(start, end);
    this.totalPages = Math.ceil(this.episodes.length / this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  editEpisode(id: number): void {
    this.router.navigate(['/admin/episodes/edit', id]);
  }

  deleteEpisode(id: number): void {
    if (confirm('Are you sure you want to delete this episode?')) {
      this.episodeService.deleteEpisode(id).subscribe(() => {
        this.episodes = this.episodes.filter((e) => e.id !== id);
        this.updatePagination();
      });
    }
  }
}
