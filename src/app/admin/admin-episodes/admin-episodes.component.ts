import { Component, OnInit } from '@angular/core';
import { Episode } from '../../model/podcast.models';
import { MOCK_EPISODES } from '../../shared/mock-data';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    this.updatePagination();
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
}
