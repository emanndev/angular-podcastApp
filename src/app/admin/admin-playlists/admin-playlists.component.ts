import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../model/podcast.models';
import { PlaylistService } from '../../core/services/playlist.service';
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
    this.playlistService.getAllPlaylists().subscribe((res) => {
      console.log('Playlist result:', res);
      this.playlists = res;
      this.loading = false;
    });
  }
}
