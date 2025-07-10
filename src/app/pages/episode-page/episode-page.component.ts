import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EpisodeService } from '../../core/services/episode.service';
import { Episode } from '../../model/podcast.models';
import { environment } from '../../../environments/environment';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-episode-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBarComponent,
    PaginationComponent,
    PublicNavbarComponent,
    FooterComponent,
  ],
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss'],
})
export class EpisodeListPageComponent implements OnInit {
  allEpisodes: Episode[] = [];
  filteredEpisodes: Episode[] = [];
  loading = true;
  error = '';
  currentFilter = 'all';

  currentPage = 1;
  pageSize = 8;

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
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEpisodes.length / this.pageSize);
  }

  get paginatedEpisodes(): Episode[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEpisodes.slice(start, start + this.pageSize);
  }

  onSearch(term: string): void {
    this.currentPage = 1;
    this.filteredEpisodes = this.allEpisodes.filter(
      (ep) =>
        ep.title.toLowerCase().includes(term.toLowerCase()) ||
        ep.description.toLowerCase().includes(term.toLowerCase())
    );
  }

  setFilter(category: string): void {
    this.currentFilter = category;
    this.currentPage = 1;

    if (category === 'all') {
      this.filteredEpisodes = this.allEpisodes;
    } else {
      this.filteredEpisodes = this.allEpisodes.filter(
        (ep) =>
          this.getCategoryFromTitle(ep.title).toLowerCase() ===
          category.toLowerCase()
      );
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  playEpisode(episodeId: number): void {
    console.log('Playing episode:', episodeId);
  }

  getEpisodeImage(imgUrl: string): string {
    return imgUrl?.startsWith('http')
      ? imgUrl
      : `${environment.apiUrl}/storage/${imgUrl}`;
  }

  // Extract category from title or based on some keywords
  getCategoryFromTitle(title: string): string {
    const titleLower = title.toLowerCase();
    if (
      titleLower.includes('ai') ||
      titleLower.includes('tech') ||
      titleLower.includes('future')
    ) {
      return 'Technology';
    } else if (
      titleLower.includes('health') ||
      titleLower.includes('mental') ||
      titleLower.includes('wellness')
    ) {
      return 'Health';
    } else if (
      titleLower.includes('business') ||
      titleLower.includes('entrepreneur') ||
      titleLower.includes('startup')
    ) {
      return 'Business';
    } else if (
      titleLower.includes('lifestyle') ||
      titleLower.includes('living') ||
      titleLower.includes('culture') ||
      titleLower.includes('women') ||
      titleLower.includes('cars')
    ) {
      return 'Lifestyle';
    } else {
      return 'Technology';
    }
  }
}
