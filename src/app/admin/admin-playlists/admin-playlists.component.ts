import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../model/podcast.models';
import { PlaylistService } from '../../core/services/playlist.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlaylistFormComponent } from '../playlists/playlist-form/playlist-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToastService } from '../../shared/utils/services/toast.service';

@Component({
  selector: 'app-admin-playlists',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
  ],
  templateUrl: './admin-playlists.component.html',
  styleUrls: ['./admin-playlists.component.scss'],
})
export class AdminPlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  loading = true;

  constructor(
    private playlistService: PlaylistService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe((res) => {
      this.playlists = res;
      this.loading = false;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PlaylistFormComponent, {
      width: '600px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.playlistService.createPlaylist(formData).subscribe({
          next: () => {
            this.toast.show('Playlist created successfully', 'success');
            this.loadPlaylists();
          },
          error: () => {
            this.toast.show('Failed to create playlist', 'error');
          },
        });
      }
    });
  }

  openEditDialog(playlist: Playlist): void {
    const dialogRef = this.dialog.open(PlaylistFormComponent, {
      width: '600px',
      data: { playlist },
    });

    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.playlistService
          .updatePlaylist(playlist.id, formData)
          .subscribe(() => {
            this.toast.show('Playlist updated successfully', 'success');
            this.loadPlaylists();
          });
      }
    });
  }

  deletePlaylist(id: number): void {
    if (confirm('Are you sure you want to delete this playlist?')) {
      this.playlistService.deletePlaylist(id).subscribe(() => {
        this.toast.show('Playlist deleted successfully', 'success');
        this.playlists = this.playlists.filter((p) => p.id !== id);
      });
    }
  }
}
