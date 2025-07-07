import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../model/podcast.models';
import { PlaylistService } from '../../core/services/playlist.service';
import { MOCK_PLAYLISTS } from '../../shared/mock-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-playlists.component.html',
  styleUrls: ['./admin-playlists.component.scss'],
})
export class AdminPlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  loading = true;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.getAllPlaylists().subscribe({
      next: (res) => {
        this.playlists = res;
        this.loading = false;
      },
      error: () => {
        this.playlists = MOCK_PLAYLISTS;
        this.loading = false;
      },
    });
  }
}
