import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../model/podcast.models';
import { PlaylistService } from '../../core/services/playlist.service';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicNavbarComponent } from '../../shared/components/public-navbar/public-navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PublicNavbarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent implements OnInit {
  playlists: Playlist[] = [];
  filteredPlaylists: Playlist[] = [];
  searchTerm: string = '';
  loading = false;

  // Tag mapping for different playlists based on their names or descriptions
  private tagMappings: { [key: string]: string[] } = {
    tech: ['Technology', 'Innovation', 'Future'],
    mindfulness: ['Health', 'Wellness', 'Mindfulness'],
    wellness: ['Health', 'Wellness', 'Mindfulness'],
    business: ['Business', 'Entrepreneurship', 'Leadership'],
    entrepreneur: ['Business', 'Entrepreneurship', 'Leadership'],
    creative: ['Creativity', 'Art', 'Design'],
    science: ['Science', 'Research', 'Discovery'],
    climate: ['Environment', 'Climate', 'Sustainability'],
    environment: ['Environment', 'Climate', 'Sustainability'],
  };

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loading = true;

    this.playlistService.getAllPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.map((playlist) => ({
          ...playlist,
          image: `https://picsum.photos/seed/${playlist.id}/600/300`,
        }));

        this.filteredPlaylists = this.playlists;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredPlaylists = this.playlists.filter(
      (playlist) =>
        playlist.name.toLowerCase().includes(term) ||
        playlist.description.toLowerCase().includes(term)
    );
  }

  getTagsForPlaylist(playlist: Playlist): string[] {
    const name = playlist.name.toLowerCase();
    const description = playlist.description.toLowerCase();

    for (const [key, tags] of Object.entries(this.tagMappings)) {
      if (name.includes(key) || description.includes(key)) {
        return tags;
      }
    }

    return ['Podcast', 'Episodes'];
  }
}
