import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PodcastCardComponent } from '../../shared/components/podcast-card/podcast-card.component';
import { AudioPlayerBarComponent } from 'src/app/shared/components/audio-player-bar/audio-player-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    LoaderComponent,
    EmptyStateComponent,
    PodcastCardComponent,
    AudioPlayerBarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  episodes: Podcast[] = [];
  isLoading = true;

  constructor(private podcastService: PodcastService) {}

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.isLoading = true;
    this.podcastService.getLatestEpisodes(5).subscribe({
      next: (data) => {
        this.episodes = data;
        this.isLoading = false;
      },
      error: () => {
        this.episodes = [];
        this.isLoading = false;
      }
    });
  }

  onSearch(query: string) {
    this.isLoading = true;
    this.podcastService.searchEpisodes(query).subscribe({
      next: (results) => {
        this.episodes = results;
        this.isLoading = false;
      },
      error: () => {
        this.episodes = [];
        this.isLoading = false;
      }
    });
  }
}
