import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Episode, PlaylistForm } from '../../../model/podcast.models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss'],
})
export class PlaylistFormComponent implements OnInit {
  form!: FormGroup;
  episodes: Episode[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlaylistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { playlist?: any; isEdit?: boolean },
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.playlist?.name || '', Validators.required],
      description: [this.data.playlist?.description || ''],
      episode_ids: [
        this.data.playlist?.episodes?.map((e: Episode) => e.id) || [],
        Validators.required,
      ],
    });

    this.loadEpisodes();
  }

  loadEpisodes(): void {
    this.loading = true;
    this.playlistService.getAllEpisodes().subscribe({
      next: (episodes) => {
        this.episodes = episodes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading episodes:', error);
        this.loading = false;
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      const playlistData: PlaylistForm = {
        name: this.form.value.name.trim(),
        description: this.form.value.description?.trim() || '',
        episode_ids: this.form.value.episode_ids,
      };

      this.dialogRef.close(playlistData);
    }
  }
}
