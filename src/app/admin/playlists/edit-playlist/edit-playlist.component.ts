import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../model/podcast.models';
import { ToastService } from '../../../shared/utils/services/toast.service';

@Component({
  selector: 'app-edit-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss'],
})
export class EditPlaylistComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  episodes: any[] = [];
  playlistId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.playlistId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();

    // Fetch episodes
    this.playlistService.getAllEpisodes().subscribe((episodes) => {
      this.episodes = episodes;
    });

    // Load existing playlist
    this.playlistService
      .getPlaylistById(this.playlistId)
      .subscribe((playlist: Playlist) => {
        this.form.patchValue({
          title: playlist.title,
          description: playlist.description,
          episode_ids: playlist.episodes.map((e) => e.id),
        });
      });
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      episode_ids: [[]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.playlistService
      .updatePlaylist(this.playlistId, this.form.value)
      .subscribe({
        next: () => {
          this.toast.show('Playlist updated!', 'success');
          this.loading = false;
          this.router.navigate(['/admin/playlists']);
        },
        error: () => {
          this.toast.show('Failed to update playlist', 'error');
          this.loading = false;
        },
      });
  }
}
