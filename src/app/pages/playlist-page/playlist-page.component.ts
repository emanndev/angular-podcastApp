import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../model/podcast.models';
import { PlaylistService } from '../../core/services/playlist.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent implements OnInit {
  playlists: Playlist[] = [];
  filteredPlaylists: Playlist[] = [];
  searchTerm: string = '';
  loading = false;

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
}
