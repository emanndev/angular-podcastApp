import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private service: PlaylistService, private router: Router) {}

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
        this.loading = false;
        this.router.navigate(['/admin/playlists']);
      },
      error: () => (this.loading = false),
    });
  }
}
