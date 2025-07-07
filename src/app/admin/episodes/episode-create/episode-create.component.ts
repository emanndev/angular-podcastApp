import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../shared/utils/services/toast.service';
import { EpisodeService } from '../../../core/services/episode.service';

@Component({
  selector: 'app-episode-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.scss'],
})
export class EpisodeCreateComponent {
  episodeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private episodeService: EpisodeService
  ) {
    this.episodeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      audio_url: [
        '',
        [Validators.required, Validators.pattern(/^https?:\/\/.+/)],
      ],
    });
  }

onSubmit(): void {
  if (this.episodeForm.invalid) return;

  this.episodeService.createEpisode(this.episodeForm.value).subscribe({
    next: () => {
      this.toast.show('Episode created successfully!', 'success');
      this.router.navigate(['/admin/episodes']);
    },
    error: () => {
      this.toast.show('Failed to create episode', 'error');
    }
  });
}
}
