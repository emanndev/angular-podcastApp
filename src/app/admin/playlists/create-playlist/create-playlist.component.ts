import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/services/toast.service';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  episodes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: PlaylistService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      episode_ids: [[]],
    });

    this.service.getAllEpisodes().subscribe((data) => {
      this.episodes = data;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.service.createPlaylist(this.form.value).subscribe({
      next: () => {
        this.toast.show('Playlist created!', 'success');
        this.loading = false;
        this.router.navigate(['/admin/playlists']);
      },
      error: () => {
        this.toast.show('Failed to create playlist', 'error');
        this.loading = false;
      },
    });
  }
}
