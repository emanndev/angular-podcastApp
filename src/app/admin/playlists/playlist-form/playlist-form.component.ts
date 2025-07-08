import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Episode } from '../../../model/podcast.models';

@Component({
  selector: 'app-playlist-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss'],
})
export class PlaylistFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  episodes: Episode[] = [];

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private dialogRef: MatDialogRef<PlaylistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.playlist?.title || '', Validators.required],
      description: [this.data?.playlist?.description || ''],
      episode_ids: [
        this.data?.playlist?.episodes?.map((ep: any) => ep.id) || [],
      ],
    });

    this.playlistService.getAllEpisodes().subscribe((episodes) => {
      this.episodes = episodes;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
